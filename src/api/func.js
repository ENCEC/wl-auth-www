import request from '@/utils/request'

export function queryFunction(data) {
  return request({
    url: '/func/list',
    method: 'post',
    data: data
  })
}

export function getFunction(id) {
  return request({
    url: '/func/' + id,
    method: 'get'
  })
}

export function deleteFunction(id) {
  return request({
    url: '/func/delete/' + id,
    method: 'get'
  })
}

export function saveFunction(data) {
  return request({
    url: '/func/save',
    method: 'post',
    data: data
  })
}
