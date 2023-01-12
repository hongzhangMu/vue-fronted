/*
 * @Descripttion: 任务
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 16:28:49
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-08 13:32:50
 */
import request from '@/utils/request'
const TASK = '/task-understanding/'

export default {
  // 获取所有任务
  taskall() {
    return request({
      url: TASK + 'task/all',
      method: 'get'
    })
  },
  taskfind(id) {
    return request({
      url: TASK + `task/${id}`,
      method: 'get'
    })
  },
  // 添加任务
  taskadd(data) {
    return request({
      url: TASK + `task`,
      method: 'post',
      data
    })
  },
  // 修改任务
  taskupdate(id, data) {
    return request({
      url: TASK + `task/${id}`,
      method: 'put',
      data
    })
  },
  // 删除任务
  taskdel(id) {
    return request({
      url: TASK + `task/${id}`,
      method: 'delete'
    })
  },
  // 获取任务下的任务认知
  task_cognition(id) {
    return request({
      url: TASK + `task-cognition/all-of-task/${id}`,
      method: 'get'
    })
  },
  // 调用数据探查接口
  stat_config(id) {
    return request({
      url: TASK + `stat-config/call/${id}`,
      method: 'post'
    })
  }
}
