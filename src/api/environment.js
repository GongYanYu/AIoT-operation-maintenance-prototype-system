import request from '@/utils/request'
//为了 防止重复
const EnvironmentApi = {
  //工程项目环境监测检测概览
  getEvnData(params) {
    return request({ url: '/api/getEvnData', method: 'post', params })
  },
  //投资信息查询
  getEvnOverList(params) {
    return request({ url: '/api/getEvnOverList', method: 'post', params })
  },
  //环境预警趋势分析(半年)
  getEvnHalfYear(params) {
    return request({ url: '/api/getEvnHalfYear', method: 'post', params })
  },
  //环境监测预警分析
  getEvnAnalysis(params) {
    return request({ url: '/api/getEvnAnalysis', method: 'post', params })
  },
  //环境预警数量
  getEvnCount(params) {
    return request({ url: '/api/getEvnCount', method: 'post', params })
  },
  //超标预警项目列表
  getWarningProject(params) {
    return request({ url: '/api/getWarningProject', method: 'post', params })
  },
  //环境监测超标项目预警弹窗
  getEvnRecordList(params) {
    return request({ url: '/api/getEvnRecordList', method: 'post', params })
  },
  //环境预警项目处理状态列表弹窗
  getEvnStatusList(params) {
    return request({ url: '/api/getEvnStatusList', method: 'post', params })
  },
  //环境监测今日最高预警值和项目信息
  getTodayMaxPm(params) {
    return request({ url: '/api/getTodayMaxPm', method: 'post', params })
  },
}

export default EnvironmentApi
