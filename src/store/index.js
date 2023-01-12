/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:14:11
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-20 11:18:09
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // ^ 匹配输入字符串的开始位置；以 . 和任意字符(字母、数字、下划线)结尾；$1 匹配第一个括号
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: [
    createPersistedState({
      // 默认存储在localStorage
      storage: window.localStorage,
      // 本地存储数据的键名
      key: 'user',
      // 指定需要存储的模块，如果是模块下具体的数据需要加上模块名称，如user.token
      paths: ['user']
    })
  ]
})

export default store
