import header from './src/header.vue'

header.install = function(Vue) {
  Vue.component(header.name,header)
}

export default header