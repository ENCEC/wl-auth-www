/*
 * @Author: Hongzf
 * @Date: 2022-07-25 13:53:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 13:40:06
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

// 根据id查询角色以及绑定的权限信息
export function queryRoleAndResource(query) {
  return request({
    url: '/sysRole/queryRoleAndResource',
    method: 'get',
    params: query
  });
}
// 新增
export function saveSysRole(data) {
  return request({
    url: '/sysRole/saveSysRole',
    method: 'post',
    data
  });
}
// 修改
export function updateSysRole(data) {
  return request({
    url: '/sysRole/updateSysRole',
    method: 'post',
    data
  });
}

// 启用/禁用
export function updateRoleStatus(data) {
  return request({
    url: '/sysRole/updateRoleStatus',
    method: 'post',
    data
  });
}
// 删除角色
export function deleteRole(query) {
  return request({
    url: '/sysRole/deleteRole',
    method: 'get',
    params: query
  });
}
