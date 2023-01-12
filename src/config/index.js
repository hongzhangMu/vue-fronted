/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-27 13:48:20
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-27 13:58:56
 */
const deepMerge = require('deepmerge')
const _config = require('./config')
const { setting } = require('./default')
const config = deepMerge(setting, _config)

module.exports = config
