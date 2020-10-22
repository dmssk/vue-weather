import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/VWeatherBody.vue'
import Card from '../components/VWeatherCard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/:city',
    component: Card
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
