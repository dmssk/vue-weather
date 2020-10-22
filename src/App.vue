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
        <v-tabs class="mt-5 px-5">
            <v-tab v-for="route in getRoutes" :key="route.id">
                <router-link :to="route.path">{{route.name}}</router-link>
            </v-tab>
        </v-tabs>

        <v-main class="mt-5 pa-5">


            <router-view/>


        </v-main>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {}
        },
        computed: mapGetters(['getRoutes'])
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
