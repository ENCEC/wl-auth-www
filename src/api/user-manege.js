/*
 * @Author: Hongzf
 * @Date: 2022-07-25 13:53:17
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-07-25 17:17:57
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
// 管理员新增用户
export function saveUemUser(data) {
  return request({
    url: '/uemUserManage/saveUemUser',
    method: 'post',
    data
  });
}
