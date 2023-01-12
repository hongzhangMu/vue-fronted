/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-10-20 13:58:29
 * @LastEditors: kdsec
 * @LastEditTime: 2021-10-21 10:22:02
 */
const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    // id: '@id',
    // title: '@sentence(10, 20)',
    // 'status|1': ['published', 'draft', 'deleted'],
    // author: 'name',
    // display_time: '@datetime',
    // pageviews: '@integer(300, 5000)'

    // string
    'str1|1-3': 'brccq', // brccq出现 1-3 次
    'str2|4': 'brccq', // brccq出现 4 次
    // number
    'number1|1-100.1-10': 1, // 整数 1-100，小数 1-10 位
    'number2|123.1-10': 1, // 整数 123，小数 1-10 位
    'number3|123.3': 1, // 整数 123，小数 3 位
    'number4|123.10': 1.123, // 整数 123，小数 10 位（123 + 7位）
    // boolean
    'boolean1|1': true, // true 出现概率 1/2
    'boolean2|2-5': true, // true 出现概率 （2 /（2+5））
    // Object
    'obj1|1-3': {
      name: 'name',
      contnet: 'content',
      desc: 'desc',
      remark: 'remark'
    }, // 取 1-3 个属性-值
    'obj2|2': {
      name: 'name',
      contnet: 'content',
      desc: 'desc',
      remark: 'remark'
    }, // 取 2 个属性-值
    // Array
    'arr1|1': [1, 2, 3], // 选 1 个值返回
    'arr2|2-3': [1, 2, 3], // 重复 2-3 次返回为数组
    'arr3|5': [1], // 重复 5 次返回为数组
    // Function
    'fun': function() { return { fun: 'fun' } }
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        message: 'ok',
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
