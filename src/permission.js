import Vue from 'vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// 进度条配置
NProgress.configure({
  // easing: 'ease', // 动画方式
  // speed: 500, // 递增进度条的速度
  showSpinner: false // 是否显示加载ico
  // trickleSpeed: 200, // 自动递增间隔
  // minimum: 0.3 // 初始化时的最小百分比
})

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 测试页面权限 start
  if (to.path.indexOf('hot-table') > 0) {
    await Vue.prototype.$permissions.loadPermissions(to.path);
    const redirectUrl = Vue.prototype.$permissions.redirectUrls[to.path];
    if (redirectUrl) {
      Vue.prototype.$message(`目标页面(${to.path})无权限，重定向到首页 (${redirectUrl})`);
      next(redirectUrl);
      return;
    }
  }
  NProgress.start() // 开始进度条NProgress.start()和 next();的顺序对换？
  console.log('【 开始进度条 】-30')
  next();
  // end

  // start progress bar

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // // 在即将进入新的页面组件前，关闭掉进度条
      console.log('【 在即将进入新的页面组件前，关闭掉进度条 】-42')
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          // debugger
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
