/*
 * @Descripttion: SvgIcon
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:24:31
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-30 18:15:27
 */
import Vue from 'vue'

// 引入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'
// 全局注册
Vue.component('SvgIcon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
