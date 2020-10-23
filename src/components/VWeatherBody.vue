<template>
    <div>
        <v-form class="mt-5" @submit.prevent="searchCity" ref="form">
            <v-text-field
                    v-model="city"
                    label="Find your sity"
                    solo
                    :rules="rules"
                    required
            ></v-text-field>
        </v-form>
        <v-btn block v-if="city" @click="pinCity">
            pin city
        </v-btn>
        <v-weather-card/>
    </div>
</template>

<script>
    import VWeatherCard from "./../components/VWeatherCard";
    import {mapGetters} from "vuex"
    export default {
        name: "VWeatherBody",
        data() {
            return {
                valid: false,
                city: '',
                rules: [
                    v => !!v || 'City is required',
                ]
            }
        },
        computed: {
            ...mapGetters(['getRoutes', 'getUserCity', 'getForecasts']),
            userLocation() {
                return this.getUserCity
            }
        },
        watch: {
            userLocation(loc) {
                this.city = loc;
                this.searchCity();
            }
        },
        components: {
            VWeatherCard
        },
        methods: {
            validate () {
                this.$refs.form.validate()
            },
            searchCity() {
                this.validate();
                if(this.city) {
                    this.$store.dispatch('fetchCity', this.city);
                }
            },
            pinCity() {
                if (this.getRoutes.includes(this.city)) {
                    return
                }
                this.$store.commit('addRoute', {
                    route: this.getForecasts[this.getForecasts.length - 1].city.name
                });
                this.$router.addRoutes([{name: this.city, path: '/' + this.city}])
            }
        }
    }
</script>
