import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import nestedRouter from './modules/nested'
// import tableRouter from './modules/table'
// import hotRouter from './modules/hot'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    // hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // hotRouter,
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'user' }, // tools
    children: [
      // 系统管理-用户管理
      {
        path: 'user-manage',
        component: () => import('@/views/user-manage/index'),
        name: 'UserManage',
        meta: { title: '用户管理' }
      },
      // 系统管理-菜单管理
      {
        path: 'menu-manage',
        component: () => import('@/views/menu-manage/index'),
        name: 'MenuManage',
        meta: { title: '菜单管理' }
      },
      // 系统管理-角色管理
      {
        path: 'role-manage',
        component: () => import('@/views/role-manage/index'),
        name: 'RoleManage',
        meta: { title: '角色管理' }
      },
      // {
      //   path: 'hello',
      //   component: () => import('@/views/hello-world/index'),
      //   name: 'Hello',
      //   meta: { title: '世界' }
      // },
      {
        path: 'post-manage',
        component: () => import('@/views/post-manage/index'),
        name: 'PostManage',
        meta: { title: '岗位管理' }
      },
      {
        path: 'list',
        component: () => import('@/views/demo-page/index'),
        name: 'List',
        meta: { title: '表格' }
      },
      // {
      //   path: 'form',
      //   component: () => import('@/views/demo-page/create'),
      //   name: 'Form',
      //   meta: { title: 'demoForm' }
      // },
      {
        path: 'myvue',
        component: () => import('@/views/myVue'),
        name: 'myVue',
        meta: { title: '联想控件练习' }
      },
      {
        path: 'uploadFile',
        component: () => import('@/views/uploadImage'),
        name: 'uploadFile',
        meta: { title: '图片上传示例' }
      },
      {
        path: 'export',
        component: () => import('@/views/export'),
        name: 'export',
        meta: { title: '导入导出示例' }
      }
      // {
      //   path: 'tabindex',
      //   component: () => import('@/views/demo-page/tabindex'),
      //   name: 'TabIndex',
      //   meta: { title: '焦点切换' }
      // }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support 路由模式更改
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
