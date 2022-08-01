/*
 * @Author: Hongzf
 * @Date: 2022-07-26 14:46:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-01 12:26:27
 * @Description: 系统管理-菜单管理
 */

import request from '@/utils/request';
// 带条件分页查询菜单信息
export function queryResourceByPage(data) {
  return request({
    url: '/queryResourceByPage',
    method: 'post',
    data
  });
}
// 查询父级菜单信息
export function queryParentResource(data) {
  return request({
    url: '/queryParentResource',
    method: 'post',
    data
  });
}
// 根据id查询菜单信息
export function queryResourceById(query) {
  return request({
    url: '/queryResourceById',
    method: 'get',
    params: query
  });
}
// 新增菜单
export function saveResource(data) {
  return request({
    url: '/saveResource',
    method: 'post',
    data
  });
}
// 编辑菜单信息
export function updateResource(data) {
  return request({
    url: '/updateResource',
    method: 'post',
    data
  });
}
// 逻辑删除菜单信息
export function deleteResourceById(query) {
  return request({
    url: '/deleteResourceById',
    method: 'get',
    params: query
  });
}
// 更改状态
export function updateResourceStatus(data) {
  return request({
    url: '/updateResourceStatus',
    method: 'post',
    data
  });
}
