import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/goods'

const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '我的主页'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
    meta: {
      title: 'Goods'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
