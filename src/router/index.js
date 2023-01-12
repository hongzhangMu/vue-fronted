/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:14:11
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-06 11:01:34
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { camelCase } from 'lodash'

Vue.use(VueRouter)

// 页面不存在时跳到404页面，放在最后
const errorRouter = {
  path: '*',
  redirect: '/404',
  name: 'notFound',
  hidden: true
}

const requiredModules = require.context('./modules', false, /\.js$/)
const routers = {}

requiredModules.keys().forEach((fileName) => {
  if (fileName === './index.js') return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
  routers[moduleName] = requiredModules(fileName).default || requiredModules(fileName)
})

let routes = []
Object.values(routers).forEach((router) => {
  routes.push(...router)
})

// 合并errorRouter
routes = routes.concat([errorRouter])

const router = new VueRouter({
  routes
})

export default router
