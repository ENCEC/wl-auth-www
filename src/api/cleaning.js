import request from '@/utils/request'

export function getExpressionFunction() {
  return request({
    url: '/func/options',
    method: 'get'
  })
}

export function getDwTableList() {
  return request({
    url: '/sourcelayer/dw/table/options/full',
    method: 'get'
  })
}

export function getDwTableRelationList() {
  return request({
    url: '/domainlayer/relation/options',
    method: 'get'
  })
}

export function getCleaningOptions() {
  return request({
    url: '/cleaning/options',
    method: 'get'
  })
}

export function deleteCleaningModelItem(id) {
  return request({
    url: '/cleaning/item/delete/' + id,
    method: 'get'
  })
}

export function getCleaningModel(id) {
  return request({
    url: '/cleaning/detail/' + id,
    method: 'get'
  })
}

export function getCleaningModelItems(id) {
  return request({
    url: '/cleaning/items/' + id,
    method: 'get'
  })
}

export function deleteCleaningModel(id) {
  return request({
    url: '/cleaning/delete/' + id,
    method: 'get'
  })
}

export function queryCleaningModel(data) {
  return request({
    url: '/cleaning/list',
    method: 'post',
    data: data
  })
}

export function saveCleaningModel(data) {
  return request({
    url: '/cleaning/save',
    method: 'post',
    data: data
  })
}
