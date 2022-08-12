/*
 * @Author: Hongzf
 * @Date: 2022-07-29 13:25:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-09 16:42:59
 * @Description:
 */
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/share-auth-center/validateUser',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/share-auth/user/getLoginUserInfo',
    // url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
export function logout() {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: '/share-auth-center/logout',
    method: 'post'
  })
}
