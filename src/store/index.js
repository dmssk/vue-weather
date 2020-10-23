import Vue from 'vue';
import Vuex from 'vuex';
import fetchCity from "./modules/fetchCity";
import getUserLocation from "./modules/getUserLocation";

Vue.use(Vuex);

let ID = 0;

export default new Vuex.Store({
    state: {
        routes: [],
        forecasts: [],
        cityNotFound: false,
        userLocation: {
            address: {
                city: 'Default'
            }
        }
    },
    mutations: {
        updateForecasts(state, forecast) {
            state.forecasts.push(forecast);
            state.cityNotFound = false;
        },
        cityNotFound(state) {
            state.cityNotFound = true;
        },
        addUserLocation(state, coords) {
            state.userLocation = coords;
        },
        addRoute(state, payload) {
            const {route} = payload;
            state.routes.push({
                path: route,
                name: route,
                id: ID++
            });
        }
    },
    getters: {
        getRoutes(state) {
            return state.routes
        },
        getForecasts(state) {
            return state.forecasts
        },
        cityNotFound(state) {
            return state.cityNotFound
        },
        getUserCity(state) {
            return state.userLocation.address.city
        }
    },
    modules: {
        fetchCity,
        getUserLocation
    }


})
