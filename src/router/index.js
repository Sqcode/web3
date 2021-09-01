import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import Main from 'views/Main.vue'
import Login from 'views/Login.vue'
import NOTE_EDIT from 'views/note/edit.vue'
import SYS_USER_EDIT from 'views/sysUser/edit.vue'
import MENU_EDIT from 'views/menu/edit.vue'
import USER_EDIT from 'views/user/edit.vue'
import USER_PROFILE_EDIT from 'views/userProfile/edit.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    // redirect: { name: 'welcome' },
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('views/Welcome.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('views/About.vue'),
        meta: {
          title: '关于我们'
        }
      },
    ]
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
    meta: {
      title: '主页'
    },
    children: [
    ]
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  // base: process.env.NODE_ENV === 'production' ? '/sqc/' : '',
  // history: createWebHistory(process.env.BASE_URL),
  routes
})
// createWebHashHistory() --> this.$route.path
// createWebHistory(process.env.BASE_URL) --> this.$router.path
export default router
