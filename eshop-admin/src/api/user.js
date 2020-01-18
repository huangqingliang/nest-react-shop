import request from 'utils/request'
import { apiPrefix } from 'utils/config'

export function queryUserInfo() {
  return request({
    url: `${apiPrefix}/xxx`,
    data: { user: 1, name: 'qs' },
    method: 'get'
  })
}

export function logoutUser() {
  return request({
    url: `${apiPrefix}/xxx`,
    data: { user: 1, name: 'qs' },
    method: 'get'
  })
}
