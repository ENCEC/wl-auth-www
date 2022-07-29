/*
 * @Author: Hongzf
 * @Date: 2022-07-28 15:49:22
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-29 16:15:05
 * @Description: 系统管理-权限管理
 */

import request from '@/utils/request';
// 用户-清除一个用户的所有角色
export function unbindAllRoleOfUser(data) {
  return request({
    url: '/uemUserManage/unbindAllRoleOfUser',
    method: 'post',
    data
  });
}
// 角色-获取角色列表（所有）
export function queryAllValidRole(data) {
  return request({
    url: '/sysRole/queryAllValidRole',
    method: 'get',
    data
  });
}
// 角色-获取角色列表（根据用户ID）
export function queryRoleListByUser(data) {
  return request({
    url: '/uemUserManage/queryRoleListByUser',
    method: 'post',
    data
  });
}
// 权限-获取资源列表(所有)
export function queryAllValidResource(data) {
  return request({
    url: '/sysResource/queryAllValidResource',
    method: 'get',
    data
  });
}
// 权限-获取资源列表(根据角色ID)
export function queryResourceByRole(data) {
  return request({
    url: '/sysResource/queryResourceByRole',
    method: 'post',
    data
  });
}

// 赋予用户角色
export function bindUserAndRole(data) {
  return request({
    url: '/uemUserManage/bindUserAndRole',
    method: 'post',
    data
  });
}
