<template>
	<div>
		<v-card
						class="mx-auto"
		>
			<v-list-item two-line>
				<v-list-item-content>
					<v-list-item-title class="headline">
						San Francisco
					</v-list-item-title>
					<v-list-item-subtitle>
						{{formatTime(today.dt).dayName}}, {{today.dt_txt}}, {{today.weather[0].description}}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-row align="center">
					<v-col
									class="display-3"
									cols="6"
					>
						{{today.main.temp.toFixed(0)}}&deg;C
					</v-col>
					<v-col cols="6">
						<v-img
										:src="`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`"
										width="100"
						></v-img>
					</v-col>
				</v-row>
			</v-card-text>

			<v-list-item>
					<v-list-item-icon>
						<v-icon
										:title="today.wind.deg + ' degree'"
										:style="`transform: rotate(${today.wind.deg}deg)`"
						>mdi-send</v-icon>
					</v-list-item-icon>

				<v-list-item-subtitle>{{today.wind.speed}} km/h</v-list-item-subtitle>
			</v-list-item>

			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-cloud-download</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>{{today.main.humidity}}%</v-list-item-subtitle>
			</v-list-item>
			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-cloud</v-icon>
				</v-list-item-icon>
				<v-list-item-subtitle>{{today.clouds.all}}%</v-list-item-subtitle>
			</v-list-item>

			<v-list class="transparent">
				<v-list-item
								v-for="item in forecast2"
								:key="item.dt"
				>
					<v-list-item-title>{{ formatTime(item.dt).dayName }}</v-list-item-title>

					<v-list-item-icon>
						<img :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`">
					</v-list-item-icon>

					<v-list-item-subtitle class="text-right">
						{{ item.temp }}
					</v-list-item-subtitle>
				</v-list-item>
			</v-list>

		</v-card>

	</div>
</template>

<script>
  import {forecast} from './testForecast'

  export default {
    data() {
      return {
        time: 0,
        forecast2: forecast.list.filter(f => f.dt_txt.includes('12:00:00')),
        today: forecast.list[0],
      }
    },
    computed: {
      computeForecasts() {
        const correctDays = forecast.list.filter(f => f.dt_txt.includes('12:00:00'));

        return correctDays;
      }
    },
    methods: {
      formatTime(time) {
        let date = new Date(time * 1000);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return {
          dayName: days[date.getDay()],
        }
      }
    }
    // async mounted() {
    //   const res = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=911e2e8e5f29e41f5b9b1aed0aa2b816');
    //   const forecast2 = await res.json();
    //   this.forecast2 = forecast2;
    // }
  }
</script>

<style scoped>

</style>
