import request from '@/utils/request'


const HomeApi = {
  getAbnormalInfo(params) {
    return request({ url: '/home/getAbnormalInfo', method: 'post', params })
  },
  getAIoTInfo(params) {
    return request({ url: '/home/getAIoTInfo', method: 'post', params })
  },
  getNodeList() {
    return request({ url: '/home/getNodeList', method: 'post' })
  },
  getEdgeList() {
    return request({ url: '/home/getEdgeList', method: 'post' })
  },
  getNodeResources() {
    return request({ url: '/home/getNodeResources', method: 'post' })
  },
  abnormalQuantityStatistics() {
    return request({ url: '/home/abnormalQuantityStatistics', method: 'post' })
  },
  comprehensiveEquipmentIssues() {
    return request({ url: '/home/comprehensiveEquipmentIssues', method: 'post' })
  },
  highFrequencyWarningIssues() {
    return request({ url: '/home/highFrequencyWarningIssues', method: 'post' })
  },
  bigDataMonitoring() {
    return request({ url: '/home/bigDataMonitoring', method: 'post' })
  },
}

export default HomeApi
