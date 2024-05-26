import request from '@/utils/request'


const StatusApi = {
  getStatus(params) {
    return request({ url: '/status/getStatus', method: 'post', params })
  },
  updateStatus(params) {
    return request({ url: '/status/updateStatus', method: 'post', params })
  },
  getNodeFlowData(params) {
    return request({ url: '/status/getNodeFlowData', method: 'post', params })
  },
}

export default StatusApi
