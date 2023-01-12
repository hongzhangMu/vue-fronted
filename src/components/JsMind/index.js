/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-12-08 16:49:23
 * @LastEditors: kdsec
 * @LastEditTime: 2022-05-26 14:42:16
 */
import JsMindTree from './JsMind.vue'
JsMindTree.install = Vue => {
  Vue.component(JsMindTree.name, JsMindTree)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(JsMindTree.name, JsMindTree)
}

export default JsMindTree
