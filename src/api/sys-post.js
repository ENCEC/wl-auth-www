import request from '@/utils/request'
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
export function querySysPost(data) {
  return request({
    url: prefix + '/sysPost/querySysPost',
    method: 'post',
    data

  })
}

export function sysPostStartStop(data) {
  return request({
    url: prefix + '/sysPost/sysPostStartStop',
    method: 'post',
    data
  })
}

export function saveSysPost(data) {
  return request({
    url: prefix + '/sysPost/saveSysPost',
    method: 'post',
    data
  })
}

export function updateSysPost(data) {
  return request({
    url: prefix + '/sysPost/updateSysPost',
    method: 'post',
    data
  })
}

export function deleteSysPost(sysPostId) {
  return request({
    url: prefix + '/sysPost/deleteSysPost',
    method: 'get',
    params: {
      sysPostId
    }
  })
}
