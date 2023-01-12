/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2022-06-15 08:55:51
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-15 09:40:26
 */
import request from '@/utils/request'

export default {
  upload_file(file) {
    const params = new FormData()
    params.append('file', file)
    return request({
      url: 'http://192.168.124.108:8222/api/file/upload',
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8'
      }
    })
  }
}
