/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-12-08 16:49:23
 * @LastEditors: kdsec
 * @LastEditTime: 2021-12-08 16:52:11
 */
import jsMind from './JsMind.vue'
jsMind.install = Vue => {
  Vue.component(jsMind.name, jsMind)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(jsMind.name, jsMind)
}

export default jsMind
