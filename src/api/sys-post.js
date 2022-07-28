import request from '@/utils/request'

export function querySysPost(data) {
  return request({
    url: '/SysPost/querySysPost',
    method: 'get',
    data
    
  })
}

export function sysPostStartStop(data) {
  return request({
    url: '/SysPost/sysPostStartStop',
    method: 'put',
    data
  })
}

export function saveSysPost(data) {
  return request({
    url: '/SysPost/saveSysPost',
    method: 'post',
    data
  })
}

export function updateSysPost(data) {
  return request({
    url: '/SysPost/updateSysPost',
    method: 'post',
    data
  })
}

export function deleteSysPost(sysPostId) {
  return request({
    url: '/SysPost/deleteSysPost',
    method: 'get',
    params: {
      sysPostId
    }
  })
}
