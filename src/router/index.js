import Vue  from 'vue'
import Router from 'vue-router'
import { RouterMap } from './menu.js'

Vue.use(Router)

const VueRouter = new Router({
  routes:RouterMap,
  mode:'history', //去掉网址上的#
  // base:'/base/', // 在路由地址钱加上一个基础的地址 
  // //后面两个为router-link的两个class类   可以自己去设定它的样式
  // linkActiveClass:'inkActive', //如果router-link的path部分相同  就有此class
  // linkExactActiveClass:'linkExactActive',//如果router-link的path全部相同  就有此class
  // fallback:true,//是否为单页应用 false为是
})
export default VueRouter