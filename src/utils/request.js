/*
 * @Descripttion: 请求拦截
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 14:15:24
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-08 14:35:08
 */
import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { message } from 'ant-design-vue'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return new Promise((reject) => {
      reject(error)
    })
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.message || 'Error')
      // token过期
      if (res.code === 401) {
        store.dispatch('user/resetToken').then(() => {
          // location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    message.error(error.message)
    return new Promise((reject) => {
      reject(error)
    })
  }
)

export default service
