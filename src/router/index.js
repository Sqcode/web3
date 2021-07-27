import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import NOTE_EDIT from 'views/note/edit.vue'
import SYS_USER_EDIT from 'views/sysUser/edit.vue'
import MENU_EDIT from 'views/menu/edit.vue'
import Login from 'views/login.vue'

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
    redirect: { name: 'login' },
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('views/Welcome.vue'),
        meta: {
          title: 'Welcome'
        }
      },
      // {
      //   path: '/goods',
      //   name: 'goods',
      //   component: () => import('views/goods'),
      //   meta: {
      //     title: 'Goods'
      //   }
      // },
      {
        path: '/sys_user',
        name: 'sys_user',
        component: () => import('views/sysUser'),
        meta: {
          title: 'SysUser'
        }
      },
      {
        path: '/sys_user/edit/:id',
        name: 'sys_user_edit',
        component: SYS_USER_EDIT,
        meta: {
          title: 'SysUser'
        }
      },
      {
        path: '/dept',
        name: 'dept',
        component: () => import('views/dept'),
        meta: {
          title: 'Dept'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('views/user'),
        meta: {
          title: 'User'
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
        path: '/menu/edit/:id',
        name: 'menu_edit',
        component: MENU_EDIT,
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
        }
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
