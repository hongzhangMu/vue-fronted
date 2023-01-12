/*
 * @Author: kdsec
 * @Date: 2021-08-27 09:00:12
 * @Descripttion: 日期过滤器
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-27 09:06:41
 */
import { formatDate } from '@/utils/time'

/**
 * @Author: kdsec
 * @Date: 2021-08-27 09:00:12
 * @LastEditors: kdsec
 * @Descripttion: 将日期格式化
 * @param {Date} date 要格式化的日期
 * @param {String} fmt 格式化字符串  年:y, 月:M, 日:d, 时:h, 分:m, 秒:s
 * @return {String} 格式化之后的日期字符串
 */
export function formatDateAsFmt(date, fmt) {
  if (!(date instanceof Date)) {
    return 'system.typeError'
  }
  return formatDate(fmt, date)
}
