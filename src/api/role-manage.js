/*
 * @Author: Hongzf
 * @Date: 2022-07-25 13:53:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 10:24:36
 * @Description: 系统管理-角色管理
 */
import request from '@/utils/request';
// 带条件分页查询角色信息
export function queryRoleByPage(data) {
  return request({
    url: '/sysRole/queryRoleByPage',
    method: 'post',
    data
  });
}
// 权限-获取所有权限
export function queryAllResource(data) {
  return request({
    url: '/sysRole/queryAllResource',
    method: 'post',
    data
  });
}
// 根据id查询角色以及绑定的权限信息
export function queryRoleAndResource(query) {
  return request({
    url: '/sysRole/queryRoleAndResource',
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
export function updateSysRole(data) {
  return request({
    url: '/sysRole/updateSysRole',
    method: 'post',
    data
  });
}
// 删除角色
export function deleteRole(data) {
  return request({
    url: '/sysRole/deleteRole',
    method: 'post',
    data
  });
}
