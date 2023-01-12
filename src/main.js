/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:14:11
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-21 10:18:22
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// antd
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// 引入全局过滤器
import filters from './filters'
Vue.use(filters)

// permission control
import './permission'

// svg
import './icons'

// theme
import './theme/index.less'

// Moment
import 'moment/locale/zh-cn'
import Moment from 'moment'
Moment.locale('zh-cn')

// vue-particles
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

// i18n
import i18n from './i18n'

// mock
const { mockXHR } = require('../mock')
mockXHR()

// import jm from 'vue-jsmind'
// Vue.use(jm)
// if (window.jsMind) {
//   console.log('wind')
//   Vue.prototype.jsMind = window.jsMind
// }

import JsMind from '@/views/dashboard/JsMind/index.js'
Vue.use(JsMind)

import JsMindTree from '@/components/JsMind/JsMind.vue'
Vue.component('JsMindTree', JsMindTree)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import mitt from 'mitt'
const $mitt = mitt()

import { initYuriMsg } from '@/utils/yuri-msg'
initYuriMsg($mitt)
Vue.prototype.$mitt = $mitt

// 图片预览
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer)

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
