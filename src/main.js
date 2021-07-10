import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './styles/base.scss';
// import VueQuillEditor from 'vue-quill-editor'
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

// import filters from './filters/timeFormat'
// import { format } from 'date-fns'
// import * as filters from './filters/timeFormat'
// Object.keys(filters).forEach(key => {
//   Vue.filters(key, filters[key])
// })

// 全局注册过滤器。VUE3 去掉了噶、
// Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

createApp(App).use(store).use(router).use(ElementPlus, { locale }).mount('#app')
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'cn.su'
  }
  next()
})
