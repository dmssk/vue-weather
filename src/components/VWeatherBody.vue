<template>
    <div>
        {{ $route.params.city }}
        <v-form class="mt-5" @submit.prevent="searchCity">
            <v-text-field
                    v-model="city"
                    label="Find your sity"
                    solo
            ></v-text-field>
        </v-form>
        <v-weather-card/>
    </div>
</template>

<script>
    import VWeatherCard from "./../components/VWeatherCard";

    export default {
        name: "VWeatherBody",
        data() {
            return {
                city: ''
            }
        },
        components: {
            VWeatherCard
        },
        methods: {
            searchCity() {
                this.$store.commit('addRoute', {
                    route: this.city
                });
                this.$router.addRoutes([{name: this.city, path: '/' + this.city}])
                console.log(this.$router)
            }
        }
    }
</script>

<style scoped>

</style>