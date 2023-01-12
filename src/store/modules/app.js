/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-07 13:05:35
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-07 13:08:30
 */
import Cookies from 'js-cookie'
import i18n from '@/i18n'
import { message } from 'ant-design-vue'

const state = {
  // 显示语言  默认中文
  lang: Cookies.get('lang') || 'zh'
}

const getters = {
  lang: state => state.lang
}
const mutations = {
  SET_LANG(state, data) {
    Cookies.set('lang', data)
    state.lang = data
  }
}

const actions = {
  // 改变语言
  changeLang({ state, commit }, lang) {
    if (state.lang === lang) {
      message.warning(i18n.t('system.lang.aleadyChange'))
      return
    }
    if (!i18n.availableLocales.includes(lang)) {
      message.warning(i18n.t('system.lang.notFond'))
    }
    window.i18n = i18n
    commit('SET_LANG', lang)
    i18n.locale = lang
    message.success(i18n.t('system.lang.success'))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
