import request from '@/utils/request'

export function queryUemProject(data) {
  return request({
    url: '/uemProject/queryUemProject',
    method: 'post',
    data

  })
}

// 人员联想控件
export function queryUemUserName(data) {
  return request({
    url: '/uemProject/queryUemUserName',
    method: 'post',
    data
  })
}

export function queryViewDetailById(ViewDetailID) {
  return request({
    url: '/uemProject/queryViewDetailById',
    method: 'get',
    params: {
      ViewDetailID
    }
  })
}

export function addUemProject(data) {
  return request({
    url: '/uemProject/addUemProject',
    method: 'post',
    data
  })
}

export function updateUemProject(data) {
  return request({
    url: '/uemProject/updateUemProject',
    method: 'post',
    data
  })
}

export function deleteSysPost(uemProjectById) {
  return request({
    url: '/uemProject/deleteUemProject',
    method: 'get',
    params: {
      uemProjectById
    }
  })
}
