import request from '@/utils/request'
//为了 防止重复
const ConstructionApi = {
  //工程项目安全施工概览
  safeOverview(params) {
    return request({ url: '/api/safeOverview', method: 'post', params })
  },
  //安全事件预警趋势（半年）
  getSafeHalfYear(params) {
    return request({ url: '/api/getSafeHalfYear', method: 'post', params })
  },
  //安全施工预警项目
  getEvnsecurityProject(params) {
    return request({ url: '/api/getEvnsecurityProject', method: 'post', params })
  },
  //项目安全施工预警列表弹窗
  getEvnDateList(params) {
    return request({ url: '/api/getEvnDateList', method: 'post', params })
  },
  //安全施工概览弹窗
  safeViewList(params) {
    return request({ url: '/api/safeViewList', method: 'post', params })
  },
  //超标预警项目列表
  getWarningProject(params) {
    return request({ url: '/api/getWarningProject', method: 'post', params })
  },
  //环境预警项目处理状态列表弹窗
  getEvnStatusList(params) {
    return request({ url: '/api/getEvnStatusList', method: 'post', params })
  },
}

export default ConstructionApi
