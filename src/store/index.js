import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import * as actions from './actions.js'
import VuexLastingPlugin  from './plugins.js'

Vue.use(Vuex)
console.log(document.cookie)
export default new Vuex.Store({
  plugins: [VuexLastingPlugin({
    watch: ['a']
  })],
  // modules:{},
  state:{
    a:'wlf'
  },
  mutations,
  actions,
})