import request from '@/utils/request'

export function getErrorLog(taskId) {
  return request({
    url: '/task/error/' + taskId,
    method: 'get'
  })
}

export function queryTaskList(data) {
  return request({
    url: '/task/list',
    method: 'post',
    data: data
  })
}

export function getTask(id) {
  return request({
    url: '/task/detail/' + id,
    method: 'get'
  })
}

export function saveTask(data) {
  return request({
    url: '/task/save',
    method: 'post',
    data: data
  })
}

export function deleteTask(id) {
  return request({
    url: '/task/delete/' + id,
    method: 'get'
  })
}

export function pauseTask(id) {
  return request({
    url: '/task/pause/' + id,
    method: 'get'
  })
}

export function executeTask(id) {
  return request({
    url: '/task/execute/' + id,
    method: 'get'
  })
}

export function cancelTask(id) {
  return request({
    url: '/task/cancel/' + id,
    method: 'get'
  })
}
