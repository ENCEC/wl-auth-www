import request from '@/utils/request'

export function querySysPost(data) {
  return request({
    url: '/sysPost/querySysPost',
    method: 'post',
    data
    
  })
}

export function sysPostStartStop(data) {
  return request({
    url: '/sysPost/sysPostStartStop',
    method: 'post',
    data
  })
}

export function saveSysPost(data) {
  return request({
    url: '/sysPost/saveSysPost',
    method: 'post',
    data
  })
}

export function updateSysPost(data) {
  return request({
    url: '/sysPost/updateSysPost',
    method: 'post',
    data
  })
}

export function deleteSysPost(sysPostId) {
  return request({
    url: '/sysPost/deleteSysPost',
    method: 'get',
    params: {
      sysPostId
    }
  })
}
