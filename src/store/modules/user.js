/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 13:36:15
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 11:27:30
 */
import { getToken, setToken, removeToken } from '@/utils/auth'
import router from '@/router'

import userApi from '@/api/user'
const state = {
  token: getToken(),
  userid: null,
  username: null,
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  userInfo: {},
  roles: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  // 登录
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // 异步请求login
      userApi.login({ username, password }).then(async(res) => {
        const data = res.data.data
        data.roles = ['admin']

        const accessRoutes = await dispatch('permission/generateRoutes', data.roles, { root: true })
        // layout下的路由
        router.options.routes.forEach(e => {
          if (e.path === '/') {
            e.children = accessRoutes && accessRoutes[0] && accessRoutes[0].children
            commit('setting/setMenuData', e.children, { root: true })
          }
        })
        commit('SET_TOKEN', data.access_token)
        // token提前5分钟失效，预留操作空间
        const expireAt = new Date((new Date()).getTime() + (data.expires_in - 300) * 1000)
        setToken(data.access_token, expireAt)
        commit('SET_USERINFO', data)
        commit('SET_ROLES',  data.roles)
        commit('SET_NAME',  userInfo.username)
        // 重新加载页面，以获取该用户所能看到的菜单、路由
        // location.reload()
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      const data = {
        access_token: state.token,
        username: state.username,
        roles: state.roles
      }
      commit('SET_NAME', data.username)
      commit('SET_ROLES', data.roles)
      resolve(data)
    })
  },
  // 登出
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('username')
      localStorage.removeItem('roles')
      removeToken()
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      localStorage.removeItem('username')
      localStorage.removeItem('roles')
      removeToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
