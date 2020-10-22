<template>
    <v-app>
        <v-card color="grey lighten-4" flat tile>
            <v-toolbar dense>
                <v-toolbar-title>
                    <router-link to="/">Weather App</router-link>
                </v-toolbar-title>

                <v-spacer></v-spacer>
                <a href="https://github.com/dmssk" target="_blank" title="dev">
                    <v-btn icon>
                        <v-icon>mdi-github</v-icon>
                    </v-btn>
                </a>
            </v-toolbar>
        </v-card>
        <v-tabs class="mt-5 px-5" v-if="getRoutes.length">
            <v-tab v-for="route in getRoutes" :key="route.id" :to="route.path">
               {{route.name}}
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
        computed: {
            ...mapGetters(['getRoutes']),
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
