/*
 * @Author: Hongzf
 * @Date: 2022-08-04 15:38:58
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-04 15:58:24
 * @Description:
 */
import request from '@/utils/request'
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
// 登录接口
export function login(data) {
  return request({
    url: '/share-auth-center/validateUser',
    method: 'post',
    data
  })
}
// 获取登录用户信息
export function getLoginUserInfo(query) {
  return request({
    url: prefix + '/user/getLoginUserInfo',
    method: 'get',
    params: query
  });
}
// 修改用户信息
export function updateUemUserInfo(data) {
  return request({
    url: prefix + '/user/updateUemUserInfo',
    method: 'post',
    data
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: prefix + '/user/updatePassword',
    method: 'post',
    data
  })
}
// 登出
export function logout() {
  return request({
    url: '/share-auth-center/logout',
    method: 'post'
  })
}
