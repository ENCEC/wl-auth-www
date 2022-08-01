import request from '@/utils/request'

export function queryUemProject(data) {
  return request({
    url: '/uemProject/queryUemProject',
    method: 'post',
    data

  })
}

// 查看项目详情
export function ViewDetailUemProject(data) {
  return request({
    url: '/uemProject/ViewDetailUemProject',
    method: 'post',
    data
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
