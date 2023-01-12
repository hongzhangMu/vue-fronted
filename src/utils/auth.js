/*
 * @Descripttion: token
 * @version:
 * @Author: kdsec
 * @Date: 2021-10-08 10:11:16
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 11:15:03
 */
// import Cookies from 'js-cookie'

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization' // AuthorizationTaskSpecial

export function getToken() {
  let auth = localStorage.getItem(xsrfHeaderName)
  if (auth) {
    auth = JSON.parse(auth)
    if (new Date() < new Date(auth.expiresAt)) {
      return `Bearer ${auth.token}`
    }
  }
  return null
  // return Cookies.get(xsrfHeaderName)
}

export function setToken(token, expireAt) {
  localStorage.setItem(xsrfHeaderName, JSON.stringify({ token: token, expiresAt: expireAt }))
  // return Cookies.set(xsrfHeaderName, token, { expires: expireAt })
}

export function removeToken() {
  return localStorage.removeItem(xsrfHeaderName)
  // return Cookies.remove(xsrfHeaderName)
}
