import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import Goods from 'views/goods'
import Note from 'views/note'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
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
    path: '/note',
    name: 'Note',
    component: Note,
    meta: {
      title: 'note'
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
  // history: createWebHashHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
