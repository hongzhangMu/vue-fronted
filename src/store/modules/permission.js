/*
 * @Descripttion: 角色--路由 匹配
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-26 14:51:01
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-31 16:37:44
 */
import constantRoutes from '@/router/modules/constantRoutes'
import asyncRoutes from '@/router/modules/asyncRoutes'

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 所有路由
  addRoutes: [] // 该角色特有的路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // admin 拥有所有权限
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 其他角色 过滤自己有权限的路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 特有路由 拼接 公共路由
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
