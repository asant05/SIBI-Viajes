import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Sitios from '../views/Sitios.vue'
import SitiosRec from '../views/SitiosRec.vue'
import SitiosEstilos from '../views/SitiosEstilos.vue'
import PagInicial from '../views/PagInicial.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
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
  },
  {
    path: '/SitiosEstilos',
    name: 'sitiosEstilos',
    component: SitiosEstilos
  },
  {
    path: '/',
    name: 'PagInicial',
    component: PagInicial
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
