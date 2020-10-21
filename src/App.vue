<template>
    <v-app>
        <v-card
                color="grey lighten-4"
                flat
                tile
        >
            <v-toolbar dense>

                <v-toolbar-title>Weather App</v-toolbar-title>

                <v-spacer></v-spacer>


                <a href="https://github.com/dmssk" target="_blank" title="dev">
                    <v-btn icon>
                        <v-icon>mdi-github</v-icon>
                    </v-btn>
                </a>

            </v-toolbar>
        </v-card>

        <v-main class="mt-5 pa-5">
            <v-tabs>
                <v-tab>Item One</v-tab>
                <v-tab>Item Two</v-tab>
                <v-tab>Item Three</v-tab>
            </v-tabs>
            <v-form class="mt-5" @submit.prevent="searchCity">
                <v-text-field
                        v-model="city"
                        label="Find your sity"
                        solo
                ></v-text-field>
            </v-form>
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
            city: ''
        }),
        methods: {
            searchCity() {
                console.log(this.city)
            }
        }
    };
</script>

<style lang="scss">
    a {
        text-decoration: none;
    }

    .v-main {
        max-width: 600px;
        margin: 0 auto;
    }
</style>
