import request from '@/utils/request'

const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

// 查询标签列表
export function querySysTag(data) {
  return request({
    url: shareAuthPrefix + '/sysTag/querySysTag',
    method: 'post',
    data
  })
}

// 查看详情
export function getSysTag(sysTagId) {
  return request({
    url: shareAuthPrefix + '/sysTag/getSysTag',
    method: 'get',
    params: { sysTagId }
  })
}

// 启用/停用标签
export function sysTagStartStop(data) {
  return request({
    url: shareAuthPrefix + '/sysTag/sysTagStartStop',
    method: 'post',
    data
  })
}

// 新增标签
export function saveSysTag(data) {
  return request({
    url: shareAuthPrefix + '/sysTag/saveSysTag',
    method: 'post',
    data
  })
}

// 修改标签
export function updateSysTag(data) {
  return request({
    url: shareAuthPrefix + '/sysTag/updateSysTag',
    method: 'post',
    data
  })
}

// 删除标签
export function deleteSysTag(sysTagId) {
  return request({
    url: shareAuthPrefix + '/sysTag/deleteSysTag',
    method: 'get',
    params: {
      sysTagId
    }
  })
}
