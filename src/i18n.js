/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-06 17:39:28
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-07 16:35:08
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

// 不可以从store当中获取当前语言，因为加载i18n的时候，store还没有创建
const lang = Cookies.get('lang') || 'zh'

export default new VueI18n({
  locale: lang,
  fallbackLocale: 'zh',
  silentFallbackWarn: true,
  silentTranslationWarn: true, // 去除国际化警告
  messages: {
    'zh': require('@/y/zh.json'),
    'en': require('@/y/en.json')
  }
})
