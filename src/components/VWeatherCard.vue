<template>
	<div class="v-weather-card">
		<v-card class="mx-auto" v-if="!cityNotFound && getForecasts.length">
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title class="headline">
						{{ $route.params.city || getCurrentCityName}}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{formatTime(getCurrentCityInfo.list[0].dt).dayName}},
						{{getCurrentCityInfo.list[0].dt_txt}},
						{{getCurrentCityInfo.list[0].weather[0].description}}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-row align="center">
					<v-col
							class="display-3"
							cols="6"
					>
						{{getCurrentCityInfo.list[0].main.temp.toFixed(0)}}&deg;C
					</v-col>
					<v-col cols="6">
						<v-img
								:src="`http://openweathermap.org/img/wn/${getCurrentCityInfo.list[0].weather[0].icon}@2x.png`"
								width="100"
								:alt="getCurrentCityInfo.list[0].weather[0].main"
								:title="getCurrentCityInfo.list[0].weather[0].main"
						></v-img>
					</v-col>
				</v-row>
			</v-card-text>

			<v-list-item>
				<v-list-item-icon>
					<v-icon
							:title="getCurrentCityInfo.list[0].wind.deg + ' degree'"
							:style="`transform: rotate(${getCurrentCityInfo.list[0].wind.deg}deg)`"
					>mdi-send
					</v-icon>
				</v-list-item-icon>

				<v-list-item-subtitle>{{getCurrentCityInfo.list[0].wind.speed}} km/h</v-list-item-subtitle>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-cloud-download</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>{{getCurrentCityInfo.list[0].main.humidity}}%</v-list-item-subtitle>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-cloud</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>{{getCurrentCityInfo.list[0].clouds.all}}%</v-list-item-subtitle>
			</v-list-item>

			<v-list class="transparent">
				<v-list-item
						v-for="item in getDailyForecast"
						:key="item.dt"
				>
					<v-list-item-title>{{ formatTime(item.dt).dayName }}</v-list-item-title>

					<v-list-item-icon>
						<img
								:src="`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`"
								:alt="item.weather[0].main"
								:title="item.weather[0].main"
						>
					</v-list-item-icon>

					<v-list-item-subtitle class="text-right">
						{{ item.temp }}
					</v-list-item-subtitle>
				</v-list-item>
			</v-list>

		</v-card>
		<div v-else-if="getForecasts.length || cityNotFound">
			<h3>Error. City not found</h3>
		</div>
		<div v-else>
			<h3>Find your city!</h3>
		</div>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['getForecasts', 'cityNotFound']),
            isPinned() {
                if(!this.$route.params.city) return false;
                let cities = [];
                this.getForecasts.forEach(f => cities.push(f.city.name));
                cities = cities.map(c => c.toLowerCase());
                return cities.includes(this.$route.params.city.toLowerCase());
            },
            getCurrentCityInfo() {
                if (!this.getForecasts.length) {
                    return {}
                }
                if (this.isPinned) {
                    return this.getForecasts.filter(f => f.city.name.toLowerCase() === this.$route.params.city.toLowerCase())[0];
                } else {
                    return this.getForecasts[this.getForecasts.length - 1]
                }
            },
            getDailyForecast() {
                return this.getCurrentCityInfo.list.filter(f => f.dt_txt.includes('12:00:00'))
            },
            getCurrentCityName() {
                return this.getCurrentCityInfo.city.name
            }
        },
        methods: {
            formatTime(time) {
                let date = new Date(time * 1000);
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return {
                    dayName: days[date.getDay()],
                }
            },
        }
    }
</script>

<style scoped lang="scss">
	.v-weather-card {
		width: 600px;
		max-width: 100%;
	}
</style>
