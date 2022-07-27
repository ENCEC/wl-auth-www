import request from '@/utils/request'

export function queryByTechnicalTitleName(params) {
  return request({
    url: '/SysTechnicalTitle/queryByTechnicalTitleName',
    method: 'get',
    params: {
      ...params
    }
  })
}

// 修改职称状态
export function updateStatus(params) {
  return request({
    url: '/SysTechnicalTitle/updateStatus',
    method: 'get',
    params: {
      ...params
    }
  })
}

export function saveSysTechnicalTitle(data) {
  return request({
    url: '/SysTechnicalTitle/addSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function updateSysTechnicalTitle(data) {
  return request({
    url: '/SysTechnicalTitle/updateSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function deleteSysTechnicalTitle(id) {
  return request({
    url: '/SysTechnicalTitle/deleteSysTechnicalTitle',
    method: 'delete',
    params: {
      id
    }
  })
}
