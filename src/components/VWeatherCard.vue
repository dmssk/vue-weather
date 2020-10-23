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

			<VCardListItem
				:icon="{
					name: 'mdi-send',
					title: getCurrentCityInfo.list[0].wind.deg + ' degree',
					style: `transform: rotate(${getCurrentCityInfo.list[0].wind.deg}deg)`
				}"
				:title="getCurrentCityInfo.list[0].wind.speed + ' km/h'"
			/>

			<VCardListItem
				:icon="{
					name: 'mdi-cloud-download',
				}"
				:title="getCurrentCityInfo.list[0].main.humidity + ' %'"
			/>
			<VCardListItem
				:icon="{
					name: 'mdi-cloud',
				}"
				:title="getCurrentCityInfo.list[0].clouds.all + ' %'"
			/>
			<VCardListItem
				:icon="{
					name: 'mdi-arrow-collapse-all',
				}"
				:title="getCurrentCityInfo.list[0].main.pressure + ''"
			/>

			<v-list>
				<v-list-group
						v-for="item in getDailyForecast"
						:key="item.id"
						no-action
				>
					<template v-slot:activator>
						<v-list-item-content>
							<v-list-item-title v-text="formatTime(item[0].dt).dayName"></v-list-item-title>
						</v-list-item-content>
					</template>

					<v-list>
					<v-list-item
						v-for="child in item"
						:key="child.id"
						class="justify-space-between"
					>
						<span>{{ formatTime(child.dt).hours }}</span>

						<v-list-item-icon>
							<img
								:src="`http://openweathermap.org/img/wn/${child.weather[0].icon}.png`"
								:alt="child.weather[0].main"
								:title="child.weather[0].main"
							>
						</v-list-item-icon>

						<div class="d-flex">
							<v-icon>mdi-cloud-download</v-icon>
							<span class="ml-3">{{child.main.humidity}}%</span>
						</div>
						<div class="d-flex">
							<v-icon
								:title="child.wind.deg + ' degree'"
								:style="`transform: rotate(${child.wind.deg}deg)`"
							>mdi-send
							</v-icon>
							<span class="ml-3">{{child.wind.speed}} km/h</span>
						</div>

						<span class="text-right">
							{{ child.main.temp_min.toFixed(0) }}&deg;
						</span>
					</v-list-item>
					</v-list>
				</v-list-group>
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
	import VCardListItem from "./VCardListItem";

    export default {
		components: {
			VCardListItem
		},
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
                return this.split(this.getCurrentCityInfo.list, 8)
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
                    hours: date.getHours() + ':00',
                }
            },
			split(array, n) {
				let [...arr] = array;
				var res = [];
				while (arr.length) {
					res.push(arr.splice(0, n));
				}
				return res;
			}
        }
    }
</script>

<style scoped lang="scss">
	.v-weather-card {
		width: 600px;
		max-width: 100%;
	}
</style>
