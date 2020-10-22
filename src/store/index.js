import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let ID = 0;
const apiKey = '911e2e8e5f29e41f5b9b1aed0aa2b816';

export default new Vuex.Store({
    state: {
        routes: [],
        forecasts: [],
        cityNotFound: false
    },
    actions: {
        async fetchCity({commit}, city = 'Zhytomyr') {
            const res = await fetch(
              `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
            );
            const forecast = await res.json();

            if(forecast.cod === '404') {
                commit('cityNotFound')
            } else {
                commit('updateForecasts', forecast)
            }
        }
    },
    mutations: {
        updateForecasts(state, forecast) {
            state.forecasts.push(forecast)
            state.cityNotFound = false;
        },
        cityNotFound(state) {
            state.cityNotFound = true;
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
        }
    }


})
