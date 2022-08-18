// import { asyncRoutes, constantRoutes } from '@/router'
import { queryResource } from '@/api/user'
import store from '@/store'
import Layout from '@/layout'
const _import = require('@/router/_import') // 获取组件的方法

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRoutes(routes, level = 1) {
  const res = []
  // TODO:小图标
  const icon = level === 1 ? 'icon_staff' : ''// 图标
  routes.forEach(routeItem => {
    let tmp = {}
    // 父级菜单没有子菜单
    if (level === 1 && !(routeItem.childrenResourceList && routeItem.childrenResourceList.length)) {
      // console.log('【 routeItem 】-31', routeItem)
      tmp = {
        path: '/',
        component: Layout,
        redirect: routeItem.resourceUrl,
        children: [
          {
            path: routeItem.resourceUrl,
            component: _import(routeItem.component),
            name: '', // routeItem.resourceTitle,
            meta: {
              title: routeItem.resourceTitle,
              icon,
              affix: true
            }
          }
        ]
      }
    } else {
      // 父级菜单有子菜单
      tmp = {
        // ...routeItem,
        path: routeItem.resourceUrl,
        name: routeItem.resourceTitle,
        meta: { title: routeItem.resourceTitle, icon },
        children: routeItem.childrenResourceList
      }
      // 加载路由页面
      if (routeItem.component) {
        if (routeItem.component === 'Layout') { // Layout组件特殊处理
          tmp.component = Layout
        } else {
          tmp.component = _import(routeItem.component)
        }
      }
      // 子菜单
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, level + 1)
      }
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // state.routes = constantRoutes.concat(routes)
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      queryResource({
        clientId: process.env.VUE_APP_CLIENT_ID,
        uemUserId: store.getters.userId
      }).then(res => {
        const routes = res.data
        const accessedRoutes = filterAsyncRoutes(routes)
        console.log('【 ==== accessedRoutes ===== 】-117', accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
