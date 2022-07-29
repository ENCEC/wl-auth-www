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
      // 系统管理-岗位管理
      {
        path: 'sys-post',
        component: () => import('@/views/sys-post/index'),
        name: 'SysPost',
        meta: { title: '岗位管理' }
      },
      // 系统管理-岗位职称
      {
        path: 'sys-technical-title',
        component: () => import('@/views/sys-technical-title/index'),
        name: 'SysTechnicalTitle',
        meta: { title: '岗位职称' }
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
      // 系统管理-项目管理
      {
        path: 'sys-project',
        component: () => import('@/views/sys-project/index'),
        name: 'SysProject',
        meta: { title: '项目管理' }
      },
      // 系统管理-权限管理
      {
        path: 'right-manage',
        component: () => import('@/views/right-manage/index'),
        name: 'RightManage',
        meta: { title: '权限管理' }
      }
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
