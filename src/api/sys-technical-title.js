import request from '@/utils/request'

const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

export function queryByTechnicalTitleName(data) {
  return request({
    url: shareAuthPrefix + '/sysTechnicalTitle/queryByTechnicalTitleName',
    method: 'post',
    data
  })
}

// 修改职称状态
export function updateStatus(params) {
  return request({
    url: shareAuthPrefix + '/sysTechnicalTitle/updateStatus',
    method: 'get',
    params
  })
}

export function saveSysTechnicalTitle(data) {
  return request({
    url: shareAuthPrefix + '/sysTechnicalTitle/saveSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function updateSysTechnicalTitle(data) {
  return request({
    url: shareAuthPrefix + '/sysTechnicalTitle/updateSysTechnicalTitle',
    method: 'post',
    data
  })
}

export function deleteSysTechnicalTitle(technicalTitleId) {
  return request({
    url: shareAuthPrefix + '/sysTechnicalTitle/deleteSysTechnicalTitle',
    method: 'delete',
    params: {
      technicalTitleId
    }
  })
}
