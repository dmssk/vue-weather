import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let ID = 0;

export default new Vuex.Store({
    state: {
        routes: [

        ],
        forecasts: {}

    },
    actions: {
        fetchCity() {

        }
    },
    mutations: {
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
        }
    }


})
