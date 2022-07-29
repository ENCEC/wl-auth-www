/*
 * @Author: Hongzf
 * @Date: 2022-07-25 13:53:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-26 17:18:27
 * @Description: 系统管理-用户管理
 */
import request from '@/utils/request';
// 用户管理列表
export function queryUemUser(data) {
  return request({
    url: '/uemUserManage/queryUemUser',
    method: 'post',
    data
  });
}
// 获取用户信息
export function getUemUser(query) {
  return request({
    url: '/uemUserManage/getUemUser',
    method: 'get',
    params: query
  });
}
// 管理员新增用户
export function saveUemUser(data) {
  return request({
    url: '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
// 修改用户信息
export function editUemUser(data) {
  return request({
    url: '/uemUserManage/editUemUser',
    method: 'post',
    data
  });
}

// 启用/禁用用户
export function uemUserStartStop(data) {
  return request({
    url: '/uemUserManage/uemUserStartStop',
    method: 'post',
    data
  });
}
// 删除用户信息
export function deleteUemUser(data) {
  return request({
    url: '/uemUserManage/deleteUemUser',
    method: 'post',
    data
  });
}
// 管理员重置用户密码
export function resetUemUserPassword(data) {
  return request({
    url: '/uemUserManage/resetUemUserPassword',
    method: 'post',
    data
  });
}
