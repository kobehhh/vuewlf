// Plugin
function getObjDeepValue (obj, keysArr) {
  let val = obj
  keysArr.forEach(key => {
    val = val[key]
  })
  return val
}

function setObjDeepValue (obj, keysArr, value) {
  let key = keysArr.shift()
  if (keysArr.length) {
    setObjDeepValue(obj[key], keysArr, value)
  } else {
    obj[key] = value
  }
}

function logger (msg) {
  console.log(`%c vuex-lasting-plugin %c ${msg} %c`, 'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
}
 const VuexLastingPlugin = function ({
  watch = '*',
  debug = true,
  autoInit = true,
  storage = localStorage,
  storageKey = 'VuexLastingData'
}) {
  return store => {
    if (autoInit) {
      const localState = JSON.parse(storage && storage.getItem(storageKey))
      const storeState = store.state
      if (localState) {
        Object.keys(localState).forEach(key => {
          if (key.includes('deep_')) {
            let keysArr = key.replace('deep_', '').split('.')
            setObjDeepValue(storeState, keysArr, localState[key])
            delete localState[key]
          }
        })
        store.replaceState({ ...storeState, ...localState })
        logger('States were init from localStorage.')
      }
    }

    store.subscribe((mutation, state) => {
      let watchedDatas = {}
      if (watch === '*') {
        watchedDatas = state
      } else {
        watch.forEach(data => {
          if (data.split('.').length > 1) {
            watchedDatas[`deep_${data}`] = getObjDeepValue(state, data.split('.'))
          } else {
            watchedDatas[data] = state[data]
          }
        })
      }
      if (debug) {
        logger('The states below were stored.')
        console.log(watchedDatas)
      }
      storage && storage.setItem(storageKey, JSON.stringify(watchedDatas))
    })
  }
}
export default VuexLastingPlugin