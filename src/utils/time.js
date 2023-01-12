/*
 * @Descripttion:对时间的处理函数
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-27 09:05:10
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-27 09:05:18
 */
/**
 * @Descripttion: 按照格式格式化日期，返回格式化之后的字符串
 * @name: kdsec
 * @param fmg:String 格式化字符串
 * @param date: Date类型 要格式化的日期
 * @return: 格式化好了的日期字符串
 */
export function formatDate(fmt, date) {
  let ret
  const opt = {
    'y+': date.getFullYear().toString(),        // 年
    'M+': (date.getMonth() + 1).toString(),     // 月
    'd+': date.getDate().toString(),            // 日
    'h+': date.getHours().toString(),           // 时
    'm+': date.getMinutes().toString(),         // 分
    's+': date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}
