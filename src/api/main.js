/*
 * @Descripttion: 首页
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 16:24:05
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 16:33:32
 */
import request from '@/utils/request'
const STATISTICS = '/main-page/'

export default {
  // 获取首页统计数据
  statistics() {
    return request({
      url: STATISTICS + 'statistics',
      method: 'get'
    })
  }
}
