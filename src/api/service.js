import axios from './http.js'
import qs from 'qs'

const SYSTEM_PREFIX = `/system`
//登录
export const login = params => {
  return axios.post(`${SYSTEM_PREFIX}/user/login`,qs.stringify(params)).then(res => {
    return res.data
  })
}
//获取菜单
export const getMenu = params => {
  return axios.get(`${SYSTEM_PREFIX}/menu/?${qs.stringify(params)}`).then(res => {
    return res.data
  })
}
//退出登录
export const logOut = params => {
  return axios.post(`${SYSTEM_PREFIX}/user/logout`,qs.stringify(params)).then(res => {
    return res.data
  })
}
//修改密码
export const modifyPassword = (params) => {
  return axios.post(`${SYSTEM_PREFIX}//user/modifyPwd`, qs.stringify(params)).then(res => {
    return res.data
  })
}
//分页查询用户列表
export const getUser = (params) => {
  return axios.get(`${SYSTEM_PREFIX}/user?${qs.stringify(params)}`).then((res) => {
    return res.data
  })
}