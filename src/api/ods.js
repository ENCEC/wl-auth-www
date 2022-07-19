import request from '@/utils/request'

export function getDataSourceOptions() {
  return request({
    url: '/datasource/options',
    method: 'get'
  })
}

export function getSchema(datasourceId) {
  return request({
    url: '/datasource/schema/' + datasourceId,
    method: 'get'
  })
}

export function jdbcTest(data) {
  return request({
    url: '/datasource/jdbc/test',
    method: 'post',
    data: data
  })
}

export function getSourceTableOptions() {
  return request({
    url: '/sourcelayer/source/table/options',
    method: 'get'
  })
}

export function getSourceTableSchema(sourceTableId) {
  return request({
    url: '/sourcelayer/source/table/schema/' + sourceTableId,
    method: 'get'
  })
}

export function getSourceTableList(datasourceId) {
  return request({
    url: '/sourcelayer/source/table/' + datasourceId,
    method: 'get'
  })
}

export function saveSourceTable(data) {
  return request({
    url: '/sourcelayer/source/table/save',
    method: 'post',
    data: data
  })
}
