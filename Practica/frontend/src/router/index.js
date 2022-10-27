import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sitios from '../views/Sitios.vue'
import SitiosRec from '../views/SitiosRec.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Sitios',
    name: 'sitios',
    component: Sitios
  },
  {
    path: '/SitiosRec',
    name: 'sitiosRec',
    component: SitiosRec
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
