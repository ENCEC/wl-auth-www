import request from '@/utils/request'

export function page(params) {
  return request({
    url: '/SysPost/Page',
    method: 'get',
    params: {

    }
  })
}

export function prohibit(params) {
  return request({
    url: '/SysPost/Prohibit',
    method: 'put',
    params: {

    }
  })
}

export function addSysPost(data) {
  return request({
    url: '/SysPost/addSysPost',
    method: 'post',
    data
  })
}

export function updateSysPost(data) {
  return request({
    url: '/SysPost/updateSysPost',
    method: 'put',
    data
  })
}

export function deleteSysPost(id) {
  return request({
    url: '/SysPost/deleteSysPost',
    method: 'delete',
    params: {
      id
    }
  })
}
