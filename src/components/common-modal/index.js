import modal from './src/modal.vue'

modal.install = function(Vue) {
  Vue.component(modal.name,modal)
}

export default modal