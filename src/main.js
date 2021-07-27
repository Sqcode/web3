import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils/util'
import ElementPlus from 'element-plus'
import { ElNotification } from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import './styles/base.scss'
import 'element-plus/lib/theme-chalk/index.css'

// import filters from './filters/timeFormat'
// import { format } from 'date-fns'
// import * as filters from './filters/timeFormat'
// Object.keys(filters).forEach(key => {
//   Vue.filters(key, filters[key])
// })

// 全局注册过滤器。VUE3 去掉了噶、
// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const app = createApp(App)
app.config.globalProperties.$utils = utils
app.config.globalProperties.$goBack = goBack
app.config.globalProperties.$www = 'https://su1888.cn/'
app.use(store).use(router).use(ElementPlus, { locale }).mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'cn.su'
  }
  if ('/welcome' === to.path) {
    if (!store.state.token) {
      ElNotification.error({
        title: '错误',
        message: '请先登录'
      });
      router.push({name: 'login'})
    }
  }
  next()
})

function goBack () {
  router.back(-1)
}
