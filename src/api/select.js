/*
 * @Author: Hongzf
 * @Date: 2022-08-01 19:02:14
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-08-04 13:33:37
 * @Description: 下拉框接口
 */

import request from '@/utils/request';
// 部门-下拉
export function queryDepartmentBySelect(data) {
  return request({
    url: '/uemUserManage/queryDepartmentBySelect',
    method: 'post',
    data
  });
}
// 项目-下拉
export function queryProjectNameBySelect(data) {
  return request({
    url: '/uemUserManage/queryProjectNameBySelect',
    method: 'post',
    data
  });
}
// 岗位-下拉
export function queryStaffDutyBySelect(data) {
  return request({
    url: '/uemUserManage/queryStaffDutyBySelect',
    method: 'post',
    data
  });
}
// 职称-下拉
export function queryTechnicalNameBySelect(data) {
  return request({
    url: '/uemUserManage/queryTechnicalNameBySelect',
    method: 'post',
    data
  });
}
// 用户列表
export function queryUser(data) {
  return request({
    // url: '/uemUserManage/queryUemUser',
    url: '/uemUserManage/queryStaffByPage',
    method: 'post',
    data
  });
}
