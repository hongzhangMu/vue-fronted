/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-23 09:08:29
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-23 09:30:55
 */
import defaultSettings from '@/settings'
const title = defaultSettings.title || 'vue-admin-project'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
