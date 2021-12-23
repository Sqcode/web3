import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from 'views/Home.vue'
import NOTE_EDIT from 'views/note/edit.vue'
import SYS_USER_EDIT from 'views/sysUser/edit.vue'
import MENU_EDIT from 'views/menu/edit.vue'
import USER_EDIT from 'views/user/edit.vue'
import USER_PROFILE_EDIT from 'views/userProfile/edit.vue'
import Login from 'views/Login.vue'

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
    redirect: { name: 'welcome' },
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('views/Welcome.vue'),
        meta: {
          title: '欢迎页'
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
          title: '管理员'
        }
      },
      {
        path: '/sys_user/edit/:id',
        name: 'sys_user_edit',
        component: SYS_USER_EDIT,
        meta: {
          title: '管理员'
        }
      },
      {
        path: '/dept',
        name: 'dept',
        component: () => import('views/dept'),
        meta: {
          title: '部门'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('views/role'),
        meta: {
          title: '角色'
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('views/user'),
        meta: {
          title: '通讯录'
        }
      },
      {
        path: '/user/edit/:id',
        name: 'user_edit',
        component: USER_EDIT,
        meta: {
          title: '通讯录'
        }
      },
      {
        path: '/userProfile',
        name: 'userProfile',
        component: () => import('views/userProfile'),
        meta: {
          title: '微信用户'
        }
      },
      {
        path: '/userProfile/edit/:id',
        name: 'userProfile_edit',
        component: USER_PROFILE_EDIT,
        meta: {
          title: '微信用户'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('views/menu'),
        meta: {
          title: '菜单'
        }
      },
      {
        path: '/menu/edit/:id',
        name: 'menu_edit',
        component: MENU_EDIT,
        meta: {
          title: '菜单'
        }
      },
      {
        path: '/note',
        name: 'note',
        component: () => import('views/note'),
        meta: {
          title: '笔记'
        }
      },
      {
        path: '/note/edit/:id',
        name: 'note_edit',
        component: NOTE_EDIT,
        meta: {
          title: '笔记'
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('views/resource'),
        meta: {
          title: '资源'
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
  // base: process.env.NODE_ENV === 'production' ? '/sqc/' : '',
  // history: createWebHistory(process.env.BASE_URL),
  routes
})
// createWebHashHistory() --> this.$route.path
// createWebHistory(process.env.BASE_URL) --> this.$router.path
export default router
