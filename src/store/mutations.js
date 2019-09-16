const mutations = {
  setUserInfo(state, payload) {
    console.log(payload)
    state['user_name'] = payload.user_name
    state['user_token'] = payload.user_token
    state['user_id'] = payload.user_id
    state['user_companyId'] = payload.user_companyId
    state['user_loginName'] = payload.user_loginName
  },
  cleanUserInfo(state) {
    state['user_name'] = ''
    state['user_token'] = ''
    state['user_companyId'] = ''
    state['user_id'] = ''
    state['user_loginName'] = ''
  },
  setCurrentPath(state, payload) {
    state.currentPath = payload
  },
  setA(state,num) {
    state.a = state.a + num
  }
}
export default mutations