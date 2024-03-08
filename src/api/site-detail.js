import request from '@/utils/request'
//为了 防止重复
const SiteDetailApi = {
  //摄像头列表查询
  cameraList(params) {
    return request({ url: '/api/cameraList', method: 'post', params })
  },
  //投资信息查询
  investList(params) {
    return request({ url: '/api/investList', method: 'post', params })
  },
  //项目关键节点查询
  nodeList(params) {
    return request({ url: '/api/nodeList', method: 'post', params })
  },
  //项目今日进场人数
  todayComeNum(params) {
    return request({ url: '/api/todayComeNum', method: 'post', params })
  },
  //项目今日进场人数
  getEnvMaxValue(params) {
    return request({ url: '/api/getEnvMaxValue', method: 'post', params })
  },
  //项目今日进场人数
  warningLevelNum(params) {
    return request({ url: '/api/warningLevelNum', method: 'post', params })
  },
  //2022年9月22日14:12:42

  //各个类型设备详情
  deviceDetail(params) {
    return request({ url: '/api/deviceDetail', method: 'post', params })
  },
  //设备管理预警统计
  warningCountView(params) {
    return request({ url: '/api/warningCountView', method: 'post', params })
  },
  //环境峰值监测
  EvnTopValue(params) {
    return request({ url: '/api/EvnTopValue', method: 'post', params })
  },
  //预警问题分析-日
  analysisByDay(params) {
    return request({ url: '/api/analysisByDay', method: 'post', params })
  },
  //预警问题分析-月
  analysisByMonth(params) {
    return request({ url: '/api/analysisByMonth', method: 'post', params })
  },
  // 人员出勤
  getProjectSiteSituation(params) {
    return request({ url: '/api/getProjectSiteSituation', method: 'post', params })
  },
}

export default SiteDetailApi
