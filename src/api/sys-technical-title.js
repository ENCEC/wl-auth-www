import request from '@/utils/request'
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
export function queryByTechnicalTitleName(data) {
  return request({
    url: prefix + '/sysTechnicalTitle/queryByTechnicalTitleName',
    method: 'post',
    data
  })
}

// 修改职称状态
export function updateStatus(params) {
  return request({
    url: prefix + '/sysTechnicalTitle/updateStatus',
    method: 'get',
    params
  })
}

export function saveSysTechnicalTitle(data) {
  return request({
    url: prefix + '/sysTechnicalTitle/saveSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function updateSysTechnicalTitle({ technicalTitleId, technicalName, seniority, postName }) {
  return request({
    url: prefix + '/sysTechnicalTitle/updateSysTechnicalTitle',
    method: 'post',
    data: {
      technicalTitleId, technicalName, seniority, postName
    }
  })
}

export function deleteSysTechnicalTitle(technicalTitleId) {
  return request({
    url: prefix + '/sysTechnicalTitle/deleteSysTechnicalTitle',
    method: 'delete',
    params: {
      technicalTitleId
    }
  })
}
