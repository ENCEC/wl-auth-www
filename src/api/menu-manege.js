/*
 * @Author: Hongzf
 * @Date: 2022-07-26 14:46:15
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-26 16:03:03
 * @Description: 系统管理-菜单管理
 */

import request from '@/utils/request';
// 带条件分页查询菜单信息
export function queryResourceByPage(query) {
  console.log('【 data 】-12', query)
  return request({
    url: '/sysResource/queryResourceByPage',
    method: 'get',
    params: query
  });
}
// 根据id查询菜单信息
export function queryResourceById(data) {
  console.log('【 data 】-12', data)
  return request({
    url: '/queryResourceById',
    method: 'get',
    data
  });
}
// 新增菜单
export function saveResource(data) {
  return request({
    url: '/sysResource/saveResource',
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
export function deleteResourceById(data) {
  return request({
    url: '/deleteResourceById',
    method: 'get',
    data
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
