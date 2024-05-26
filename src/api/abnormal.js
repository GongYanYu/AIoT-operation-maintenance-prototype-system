import request from '@/utils/request'


const AbnormalApi = {
  abnormalInfo(params) {
    return request({ url: '/abnormal/abnormalInfo', method: 'post', params })
  },
  safetyProblem(params) {
    return request({ url: '/abnormal/safetyProblem', method: 'post', params })
  },
  securityWarningTrends(params) {
    return request({ url: '/abnormal/securityWarningTrends', method: 'post', params })
  },
  getPredictData(params) {
    return request({ url: '/abnormal/getPredictData', method: 'post', params })
  },
}

export default AbnormalApi
