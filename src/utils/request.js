import axios from 'axios'
import { ElNotification, ElMessage } from 'element-plus'
import store from '@/store'
// import { getToken } from '@/utils/auth'
import router from 'router'

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
    if (store.state.token) {
      config.headers['token'] = window.sessionStorage.getItem("token")
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
    const res = response.data
    // res.access_token 获取tonken接口  && !res.access_token
    if (response.status !== 200) {
      ElNotification({
        title: '错误',
        type: 'error',
        message: res.data || res.msg || 'Error',
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || 'Error')
    } else if (res.code === '020000') {
      ElNotification({
        title: '错误',
        type: 'warning',
        message: res.data || res.msg || 'Error',
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || 'Error')
    } else if (res.code === '020005') {
      ElNotification({
        title: '错误',
        type: 'error',
        message: res.msg || 'Error',
        duration: 5 * 1000
      })
      router.push({name: 'login'});
      return Promise.reject(res.msg || 'Error')
    }
    else {
      return res
    }
  },
  error => {
    const res = error.response.data
    const status = error.response.status
    const code = error.response.data.code
    console.log('错误的status', status, '错误的code', code)
    if (status === 401 && code === '020001') {
      ElNotification({
        title: '登录超时，请重新登录!',
        type: 'error',
        message: res.data || res.msg || 'Error'
      })
      // removeToken()
      window.localStorage.clear()
      window.sessionStorage.clear()
      router.push({name: 'login'});
      // if (path.startsWith('/login')) return
      // store.dispatch('user/logout')
    } else if (status === 403 && code === '20001') {
      ElNotification({
        title: '未登录，请先登录!',
        type: 'error',
        message: res.data || res.msg || 'Error'
      })
      window.localStorage.clear()
      window.sessionStorage.clear()
      router.push({name: 'login'});
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
  static get(url, data = {}) {
    return service.get(url, data).then(res => {
      let code = res.code;
      if (code === '00000') {
        // ElMessage({
        //   type: 'success',
        //   message: '操作成功！',
        // })
        return res.data;
      }
    })
  }

  static post(url, data = {}) {
    return service.post(url, data).then(res => {
      let code = res.code;
      if (code === '00000') {
        // ElMessage({
        //   type: 'success',
        //   message: '操作成功！',
        // })
        return res.data;
      }
    })
  }

  static exportFile(url, data = {}) {
    return new Promise((resolve, reject) => {
      service.post(url, data, {
        timeout: 60 * 1000,
        responseType: 'blob'
      }).then(res => {
        let data = res.data;
        if (!data) {
          reject(res.statusText);
          return;
        }

        const r = new FileReader();
        r.onload = function () {
          try {
            const resData = JSON.parse(this.result);
            console.log('resData', resData);
            if (resData.code === '-1') {
              let msg = resData.msg;
              ElMessage.closeAll();
              ElMessage({
                message: msg,
                type: 'error',
                duration: 2000,
                showClose: true
              });
              reject(new Error(msg));
            }
          } catch (error) {
            resolve(data);
          }
        };
        r.readAsText(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  static uploadFile(url, file,callback, data = {},config = {}) {
    const param = new FormData();
    param.append("file", file);
    if (!SystemUtil.isEmpty(data)) {
      for (const key in data) {
        let value = data[key];
        if (value !== undefined) {
          param.append(key, value);
        }
      }
    }

    if (!config.headers) {
      config.headers = {};
    }
    config.headers['Content-Type'] = 'multipart/form-data;charset=utf-8';
    config.onUploadProgress = function (progressEvent) {
      if (callback=== undefined) {
        return;
      }
      if (progressEvent.lengthComputable) {
        callback(progressEvent);
      }
    };

    return service.post(url, param, config).then(res => {
      let status = res.status;
      if (status !== 200) {
        throw new Error(res.statusText);
      }

      res = res.data;
      let code = res.code;
      if (code === '000000') {
        return res.data;
      }
      throw new Error(res.msg);
    }).catch(error => {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 2000,
        showClose: true
      });
      throw new Error(error);
    });
  }
}
