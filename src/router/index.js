import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     title: 'Home'
  //   }
  // },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('views/goods'),
    meta: {
      title: 'Goods'
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('views/menu'),
    meta: {
      title: 'Menu'
    }
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('views/note'),
    meta: {
      title: 'Note'
    }
  },
  {
    path: '/resource',
    name: 'Resource',
    component: () => import('views/resource'),
    meta: {
      title: 'Resource'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('views/About.vue'),
    meta: {
      title: '关于'
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})
// createWebHashHistory() --> this.$route.path
// createWebHistory(process.env.BASE_URL) --> this.$router.path
export default router
