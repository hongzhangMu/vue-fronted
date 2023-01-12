/*
 * @Descripttion: 全局路由守卫和登录判断
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-23 08:58:10
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 12:18:55
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

// NProgress封装的进度条
NProgress.configure({ showSpinner: false })

// const whiteList = ['/dashboard', '/login', '/redirect', '/404']
/**
 * 先判断是否登录，是都有token
 * 若已登录，判断目标地址是否为登录页面
 *    是登录页面则重定向到首页，避免重复登录
 *    不是登录页面则直接跳转
 * 未登录，判断目标地址是否在白名单里
 *    是在白名单里则直接跳转
 *    不在白名单里则重定向到登录页面
 */

router.beforeEach(async(to, from, next) => {
  console.log('to: ', to)
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    // 存在token，要跳转至登录页面重定向到首页，避免重复登录
    if (to.path === '/login') {
      store.dispatch('user/resetToken')
      // message.info('您已经登录！')
      next({ path: '/' })
      // 关闭进度条
      NProgress.done()
    }
    // const hasRoles = store.getters.roles && store.getters.roles.length > 0
    const hasMenuData = store.getters.menuData && store.getters.menuData.length > 0
    if (hasMenuData) {
      next()
    } else {
      try {
        const { roles } = await store.dispatch('user/getInfo')
        // 本用户特有权限的路由
        const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.options.routes.forEach(e => {
          if (e.path === '/') {
            e.children = accessRoutes && accessRoutes[0] && accessRoutes[0].children
            store.commit('setting/setMenuData', e.children)
          }
        })

        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('user/resetToken')
        // message.error(error || 'Has Error')
        // 出错则重定向到登录页，拼接to.path，登录后跳转至该页面
        // next({ path: `/login?redirect=${to.fullPath}` })
        next({ path: '/' })
        // 关闭进度条
        NProgress.done()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
      // const checkRoute = function(routes) {
      //   const res = []
      //   routes.forEach(item => {
      //     if (!item.meta || !item.meta.roles) {
      //       if (item.children) {
      //         item.children = checkRoute(item.children)
      //       }
      //       res.push(item)
      //     }
      //   })
      //   return res
      // }
      // router.options.routes.forEach(e => {
      //   if (e.path === '/') {
      //     e.children =  checkRoute(e.children)
      //     store.commit('setting/setMenuData', e.children)
      //   }
      // })
      // next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

