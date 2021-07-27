import axios from 'axios'
import { ElNotification, ElMessage } from 'element-plus'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import router from 'router'

// create an axios instance
const service = axios.create({
  // baseURL: '/api',
  responseType: 'json',
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.state.token) {
      config.headers.token = window.sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error, '请求拦截,resq报错') // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const responseType = response.config.responseType
    if (responseType === 'blob') {
      // 文件下载，直接返回
      return response
    }
    const res = response.data
    // res.access_token 获取tonken接口  && !res.access_token

    if (res.code === '020000') { // 请求参数校验不通过
      ElNotification({
        title: '错误',
        type: 'warning',
        message: res.data || res.msg || 'Error',
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || 'Error')
    }
    if (res.code === '20005') { // 无效的Token
      ElNotification({
        title: '错误',
        type: 'error',
        message: res.msg || 'Error',
        duration: 5 * 1000
      })
      router.push({ name: 'login' })
      return Promise.reject(res.msg || 'Error')
    }
    if (response.status !== 200 || res.code !== '00000') {
      ElNotification({
        title: '错误',
        type: 'error',
        message: res.data || res.msg || 'Error',
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || 'Error')
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data
    const status = error.response.status
    const code = error.response.data.code
    console.log('错误的status', status, '错误的code', code)
    if (status === 401 && code === '020001') { // 登录超时
      ElNotification({
        title: '登录超时，请重新登录!',
        type: 'error',
        message: res.data || res.msg || 'Error'
      })
      // removeToken()
      window.localStorage.clear()
      window.sessionStorage.clear()
      router.push({ name: 'login' })
      // if (path.startsWith('/login')) return
      // store.dispatch('user/logout')
    } else if (status === 403 && code === '20001') { // 未登录
      ElNotification({
        title: '未登录，请先登录!',
        type: 'error',
        message: res.data || res.msg || 'Error'
      })
      window.localStorage.clear()
      window.sessionStorage.clear()
      router.push({ name: 'login' })
    } else {
      ElNotification({
        title: '错误!',
        type: 'error',
        message: res.data || res.msg || 'Error'
      })
    }
    return Promise.reject(error)
  }
)
// export default service

export default class Request {
  static get (url, data = {}) {
    return service.get(url, data).then(res => {
      const code = res.code
      if (code === '00000') {
        return res.data
      }
    })
  }

  static post (url, data = {}) {
    return service.post(url, data).then(res => {
      const code = res.code
      if (code === '00000') {
        return res.data
      }
    })
  }

  static exportFile (url, data, fileName) {
    return new Promise((resolve, reject) => {
      service.post(url, data, {responseType: 'blob'}).then(
        response => {
          resolve(response.data)
          let blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          // console.log(blob)
          // let fileName = Date.parse(new Date()) + '.xlsx'
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            //释放内存
            window.URL.revokeObjectURL(link.href)
          }
        },
        err => {
          reject(err)
        }
      )
    }).catch(error => {console.log(error)})
  }

  static uploadFile (url, file, data, callback, config = {}) {
    const param = new FormData()
    param.append('file', file)
    if (data) {
      for (const key in data) {
        const value = data[key]
        if (value !== undefined) {
          param.append(key, value)
        }
      }
    }
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['Content-Type'] = 'multipart/form-data;charset=utf-8'
    config.onUploadProgress = function (progressEvent) {
      if (callback === undefined) {
        return
      }
      if (progressEvent.lengthComputable) {
        callback(progressEvent)
      }
    }

    return service.post(url, param, config).then(res => {
      const code = res.code
      if (code === '00000') {
        return res.data
      }
      throw new Error(res.msg)
    }).catch(error => {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 2000,
        showClose: true
      })
      throw new Error(error)
    })
  }
}
