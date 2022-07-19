import request from '@/utils/request'

export function getDataSourceList() {
  return request({
    url: '/datasource/list',
    method: 'get'
  })
}

export function saveDataSource(data) {
  return request({
    url: '/datasource/save',
    method: 'post',
    data: data
  })
}

export function deleteDataSource(id) {
  return request({
    url: '/datasource/delete/' + id,
    method: 'get'
  })
}
