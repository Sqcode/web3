import axios from 'axios'
// import { Message, Notification } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: '/api',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['Admin-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   // config.headers['Admin-Token'] = getToken()
    //   config.headers['Authorization'] = `Bearer ${getToken()}`
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error, '请求拦截,resq报错') // for debug
    // if (error.request.status === 501) {
    //   Notification({
    //     message: '登录超时 !',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   removeToken()
    //   window.localStorage.clear()
    //   window.sessionStorage.clear()
    //   let formPath = router.history.current.path
    //   if (formPath === '/login') return
    //   store.dispatch('user/logout')
    // }
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 关闭消息弹框,防止出现一串消息弹框
    // Message.closeAll()
    // Notification.closeAll()
    console.log(response)
    const res = response.data
    // res.access_token 获取tonken接口
    // if (response.status !== 200 || (res.code !== '000000' && !res.access_token)) {
    //   Notification({
    //     message: res.data || res.mesg || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(res.mesg || 'Error')
    // } else if (res.code === '020000') {
    //   Notification({
    //     message: res.data || res.mesg || 'Error',
    //     type: 'warning',
    //     duration: 5 * 1000
    //   })
    //   return Promise.reject(res.mesg || 'Error')
    // } else {
      return res
    // }
  },
  error => {
    // Message.closeAll()
    // Notification.closeAll()
    // const res = error.response.data
    console.log(error.response, 'resps返回')
    const errMsg = error.toString()
    console.log(errMsg)
    // const code = errMsg.substr(errMsg.indexOf('code') + 5)
    // console.log(code, '错误的code')
    // if (error.response.status === 501 || code === '501') {
    //   Notification({
    //     message: '登录超时 !',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   removeToken()
    //   window.localStorage.clear()
    //   window.sessionStorage.clear()
    //   let formPath = router.history.current.path
    //   if (formPath === '/login') return
    //   store.dispatch('user/logout')
    // } else if (res.code === '040003' || res.code === '040075') {
    //   Notification({
    //     message: res.mesg || '账户或密码错误 !',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    // }
    return Promise.reject(error)
  }
)

export default service
