import request from '@/utils/request'

export function getDwTableOptions() {
  return request({
    url: '/sourcelayer/dw/table/options',
    method: 'get'
  })
}

export function getDwTableList(data) {
  return request({
    url: '/sourcelayer/dw/table/query',
    method: 'post',
    data: data
  })
}

export function getDwTable(id) {
  return request({
    url: '/sourcelayer/dw/table/' + id,
    method: 'get'
  })
}

export function saveDwTable(data) {
  return request({
    url: '/sourcelayer/dw/table/save',
    method: 'post',
    data: data
  })
}

export function getOperationalRelationOptions() {
  return request({
    url: '/domainlayer/operational/relation/options',
    method: 'get'
  })
}

export function queryOperationalRelation(data) {
  return request({
    url: '/domainlayer/operational/relation/query',
    method: 'post',
    data: data
  })
}

export function validateOperationalRelationName(data) {
  return request({
    url: '/domainlayer/relation/name/unique',
    method: 'post',
    data: data
  })
}

export function saveOperationalRelation(data) {
  return request({
    url: '/domainlayer/operational/relation/save',
    method: 'post',
    data: data
  })
}

export function queryDomainRelation(data) {
  return request({
    url: '/domainlayer/domain/relation/query',
    method: 'post',
    data: data
  })
}

export function saveDomainRelation(data) {
  return request({
    url: '/domainlayer/domain/relation/save',
    method: 'post',
    data: data
  })
}

export function deleteDwTableRelation(id) {
  return request({
    url: '/domainlayer/dw/table/relation/' + id,
    method: 'get'
  })
}
