/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 16:41:58
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 09:56:57
 */
import request from '@/utils/request'
const SEARCH = '/clue-exploration/'

export default {
  // 获取所有数据源
  datasource_available_all() {
    return request({
      url: SEARCH + 'available-datasource',
      method: 'get'
    })
  },
  // 关注
  clueFollow(data) {
    return request({
      url: SEARCH + 'follow',
      method: 'post',
      data
    })
  },
  // 直接设置线索分析状态
  set_analysis_status_directly(data) {
    return request({
      url: SEARCH + 'set-analysis-status-directly',
      method: 'post',
      data
    })
  },
  // 直接上报
  followSubmit(data) {
    return request({
      url: SEARCH + 'follow-submit',
      method: 'post',
      data
    })
  },
  // 线索上报
  case_clue_submit(case_id, clue_id) {
    return request({
      url: SEARCH + 'submit',
      method: 'post',
      data: {
        case_id: case_id,
        clue_id: clue_id
      }
    })
  },
  // 不再关注
  unfellow(params) {
    return request({
      url: SEARCH + 'feedback/unwanted',
      method: 'put',
      data: params
    })
  },
  // 为检索结果添加自定义标签
  add_custom_tags(data) {
    return request({
      url: SEARCH + 'add-custom-tags',
      method: 'post',
      data
    })
  }
}
