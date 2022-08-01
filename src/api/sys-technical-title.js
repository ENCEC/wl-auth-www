import request from '@/utils/request'

export function queryByTechnicalTitleName(data) {
  return request({
    url: '/sysTechnicalTitle/queryByTechnicalTitleName',
    method: 'post',
    data
  })
}

// 修改职称状态
export function updateStatus(params) {
  return request({
    url: '/sysTechnicalTitle/updateStatus',
    method: 'get',
    params
  })
}

export function saveSysTechnicalTitle(data) {
  return request({
    url: '/sysTechnicalTitle/saveSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function updateSysTechnicalTitle({ technicalTitleId, technicalName, seniority, postName }) {
  return request({
    url: '/sysTechnicalTitle/updateSysTechnicalTitle',
    method: 'post',
    data: {
      technicalTitleId, technicalName, seniority, postName
    }
  })
}

export function deleteSysTechnicalTitle(technicalTitleId) {
  return request({
    url: '/sysTechnicalTitle/deleteSysTechnicalTitle',
    method: 'delete',
    params: {
      technicalTitleId
    }
  })
}
