<template>
	<v-app>
		<v-card
						color="grey lighten-4"
						flat
						tile
		>
			<v-toolbar dense>
				<v-app-bar-nav-icon></v-app-bar-nav-icon>

				<v-toolbar-title>Title</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>

				<v-btn icon>
					<v-icon>mdi-heart</v-icon>
				</v-btn>

				<v-btn icon>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</v-toolbar>
		</v-card>

		<v-main class="mt-5 px-5">
      <v-weather-card/>
		</v-main>
	</v-app>
</template>

<script>

  import VWeatherCard from "./components/VWeatherCard";

  export default {
    name: 'App',

    components: {
      VWeatherCard
    },

    data: () => ({
      //
    }),
  };
</script>
