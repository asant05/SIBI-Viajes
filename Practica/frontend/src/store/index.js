import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sitio: {
      nombre: '',
      provincia:'',
      comunidad:'',
      monumentos: '',
      naturaleza: '',
      fiesta: '',
      comida: '',
      queVer: '',
    },
    comunidad: '',
    provincia: '',
    costaInterior:'',
    ruralUrbano: '',
    descansoTurismo: '',
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
