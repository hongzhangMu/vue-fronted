/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 10:04:06
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-30 14:36:18
 */
// 读取所有以js结尾的文件
const filtersFile = require.context('./', false, /\.js$/)

// 要加载的过滤器文件
const filtersModules = []
filtersFile.keys().forEach(filename => {
  // 不加载index.js
  if (filename !== './index.js') {
    filtersModules.push(filtersFile(filename))
  }
})

export default {
  install(Vue) {
    // 加载过滤器
    filtersModules.forEach(item => {
      Object.keys(item).forEach(key => {
        Vue.filter(key, item[key])
      })
    })
  }
}
