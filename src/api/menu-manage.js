/*
 * @Author: Hongzf
 * @Date: 2022-07-26 14:46:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 12:26:27
 * @Description: 系统管理-菜单管理
 */

import request from '@/utils/request';
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
// 带条件分页查询菜单信息
export function queryResourceByPage(data) {
  return request({
    url: prefix + '/queryResourceByPage',
    method: 'post',
    data
  });
}
// 查询父级菜单信息
export function queryParentResource(data) {
  return request({
    url: prefix + '/queryParentResource',
    method: 'post',
    data
  });
}
// 根据id查询菜单信息
export function queryResourceById(query) {
  return request({
    url: prefix + '/queryResourceById',
    method: 'get',
    params: query
  });
}
// 新增菜单
export function saveResource(data) {
  return request({
    url: prefix + '/saveResource',
    method: 'post',
    data
  });
}
// 编辑菜单信息
export function updateResource(data) {
  return request({
    url: prefix + '/updateResource',
    method: 'post',
    data
  });
}
// 逻辑删除菜单信息
export function deleteResourceById(query) {
  return request({
    url: prefix + '/deleteResourceById',
    method: 'get',
    params: query
  });
}
// 更改状态
export function updateResourceStatus(data) {
  return request({
    url: prefix + '/updateResourceStatus',
    method: 'post',
    data
  });
}
