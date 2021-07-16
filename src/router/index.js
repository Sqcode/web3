import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import NOTE_EDIT from 'views/note/edit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
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
    name: 'goods',
    component: () => import('views/goods'),
    meta: {
      title: 'Goods'
    }
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('views/menu'),
    meta: {
      title: 'Menu'
    }
  },
  {
    path: '/note',
    name: 'note',
    component: () => import('views/note'),
    meta: {
      title: 'Note'
    },
    // children: [
    //   {
    //     path: 'edit/:id',
    //     name: 'edit',
    //     component: NOTE_EDIT
    //   }
    // ]
  },
  {
    path: '/note/edit/:id',
    name: 'note_edit',
    component: NOTE_EDIT,
    meta: {
      title: 'Note edit'
    }
  },
  {
    path: '/resource',
    name: 'resource',
    component: () => import('views/resource'),
    meta: {
      title: 'Resource'
    }
  },
  {
    path: '/about',
    name: 'about',
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
