import request from '@/utils/request'

const shareAuthPrefix = process.env.VUE_APP_SHARE_AUTH_PREFIX

export function queryUemProject(data) {
  return request({
    url: shareAuthPrefix + '/uemProject/queryUemProject',
    method: 'post',
    data

  })
}

// 人员联想控件
export function queryUemUserName(data) {
  return request({
    url: shareAuthPrefix + '/uemProject/queryUemUserName',
    method: 'post',
    data
  })
}

export function queryViewDetailById(ViewDetailID) {
  return request({
    url: shareAuthPrefix + '/uemProject/queryViewDetailById',
    method: 'get',
    params: {
      ViewDetailID
    }
  })
}

export function addUemProject(data) {
  return request({
    url: shareAuthPrefix + '/uemProject/addUemProject',
    method: 'post',
    data
  })
}

export function updateUemProject(data) {
  return request({
    url: shareAuthPrefix + '/uemProject/updateUemProject',
    method: 'post',
    data
  })
}

export function deleteUemProject(uemProjectById) {
  return request({
    url: shareAuthPrefix + '/uemProject/deleteUemProject',
    method: 'get',
    params: {
      uemProjectById
    }
  })
}
