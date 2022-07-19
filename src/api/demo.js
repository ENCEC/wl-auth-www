import request from '@/utils/request'

export function getTableData(query) {
  return request({
    url: '/vue-element-admin/mock/demo',
    method: 'get',
    params: query
  })
}

export function getAllTable() {
  return request({
    url: '/vue-element-admin/demo/table',
    method: 'get'
  })
}

export function getDict() {
  return request({
    url: '/vue-element-admin/mock/dict',
    method: 'post'
  })
}

export function getAssociate(query) {
  return request({
    url: '/teacher/queryPage',
    method: 'post',
    params: query
  })
}

export function test(query) {
  return request({
    url: '/domainlayer/expression/test',
    method: 'post',
    data: query
  })
}

export function getCwgs(query) {
  return request({
    url: '/vue-element-admin/mock/cwgs',
    method: 'get',
    params: query
  })
}

export function queryStudent(data){
  return request({
    url: '/student/queryPage',
    method: 'post',
    params: data
  })
}

