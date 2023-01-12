/*
 * @Descripttion: userApi
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-23 09:22:24
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-08 14:51:33
 */
import request from '@/utils/request'
const user = '/user/login'
export default {
  login(data) {
    return request({
      url: user,
      method: 'post',
      data
    })
  }
}
