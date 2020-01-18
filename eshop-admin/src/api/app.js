import request from 'utils/request'
import { apiPrefix } from 'utils/config'

export function queryRouteList() {
  return request({
    url: `${apiPrefix}/xxx`,
    data: { user: 1, name: 'qs' },
    method: 'get'
  })
}
