import request from '@/utils/request'
const prefix = process.env.VUE_APP_SHARE_AUTH_PREFIX
export function queryUemProject(data) {
  return request({
    url: prefix + '/uemProject/queryUemProject',
    method: 'post',
    data

  })
}

// 人员联想控件
export function queryUemUserName(data) {
  return request({
    url: prefix + '/uemProject/queryUemUserName',
    method: 'post',
    data
  })
}

export function queryViewDetailById(ViewDetailID) {
  return request({
    url: prefix + '/uemProject/queryViewDetailById',
    method: 'get',
    params: {
      ViewDetailID
    }
  })
}

export function addUemProject(data) {
  return request({
    url: prefix + '/uemProject/addUemProject',
    method: 'post',
    data
  })
}

export function updateUemProject(data) {
  return request({
    url: prefix + '/uemProject/updateUemProject',
    method: 'post',
    data
  })
}

export function deleteUemProject(uemProjectById) {
  return request({
    url: prefix + '/uemProject/deleteUemProject',
    method: 'get',
    params: {
      uemProjectById
    }
  })
}
