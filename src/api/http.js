import Vue from 'vue'
import axios from 'axios'
import router from '@/router/index.js'

const service = axios.create({
  timeout:4000
})
// axios.defaults.timeout = 4000
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
service.defaults.withCredentials = true

service.interceptors.response.use(function(response) {
  const responseStatus = response.status
  if(responseStatus == 200) {
    return Promise.resolve(response)
  }else {
    return Promise.reject(error)
  }
},function(error) {
  const responseCode = error.response.status
  switch (responseCode) {
    // 401：未登录
    case 401:
      // 跳转登录页
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      break
    // 403: token过期
    case 403:
      // 弹出错误信息
      Message({
        type: 'error',
        message: '登录信息过期，请重新登录'
      })
      // 清除token
      localStorage.removeItem('token')
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }, 1000)
      break
    // 404请求不存在
    case 404:
      Message({
        message: '网络请求不存在',
        type: 'error'
      })
      break
    // 其他错误，直接抛出错误提示
    default:
      Message({
        message: error.response.data.message,
        type: 'error'
      })
  }
  return Promise.reject(error)
})

export default service