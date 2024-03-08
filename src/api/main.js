import request from '@/utils/request'
//为了 防止重复
const MainApi = {
  //已开工项目进度
  kgxjd(params) {
    return request({ url: '/api/kgxjd', method: 'post', params })
  },
  //工程项目总览
  gdgl(params) {
    return request({ url: '/api/gdgl', method: 'post', params })
  },
  //项目进度查询
  xmjdcx(params) {
    return request({ url: '/api/xmjdcx', method: 'post', params })
  },
  //人员生产监控
  ryscjk(params) {
    return request({ url: '/api/ryscjk', method: 'post', params })
  },
  //工程项目问题总览
  wtzl(params) {
    return request({ url: '/api/wtzl', method: 'post', params })
  },
  //工程预警信息
  gcyj(params) {
    return request({ url: '/api/gcyj', method: 'post', params })
  },
  //热词
  rc(params) {
    return request({ url: '/api/rc', method: 'post', params })
  },
  //物联感知问题明细
  wlwtList(params) {
    return request({ url: '/api/wlwtList', method: 'post', params })
  },
  //物联感知问题 tab统计数据
  wlgzNum(params) {
    return request({ url: '/api/wlgzNum', method: 'post', params })
  },
  //工程项目信息列表
  projectList(params) {
    return request({ url: '/api/projectList', method: 'post', params })
  },
  //人员详情列表
  employeeList(params) {
    return request({ url: '/api/employeeList', method: 'post', params })
  },
  //摄像头统计
  cameraCountList(params) {
    return request({ url: '/api/cameraCountList', method: 'post', params })
  },
  //预警处置流程列表
  yjlcList(params) {
    return request({ url: '/api/yjlcList', method: 'post', params })
  },
  //22-09-22
  //项目人员与生产监控-人员
  peopleView(params) {
    return request({ url: '/api/peopleView', method: 'post', params })
  },
  //项目人员与生产监控-车辆
  carView(params) {
    return request({ url: '/api/carView', method: 'post', params })
  },
  //项目人员与生产监控-设备
  deviceView(params) {
    return request({ url: '/api/deviceView', method: 'post', params })
  },
  //首页项目详情弹窗
  projectDteail(params) {
    return request({ url: '/api/projectDteail', method: 'post', params })
  },
  //首页abc弹窗  物联感知问题弹窗
  warningLevelList(params) {
    return request({ url: '/api/warningLevelList', method: 'post', params })
  },
  //首页abc弹窗  人工巡检问题弹窗
  dayCheckList(params) {
    return request({ url: '/api/dayCheckList', method: 'post', params })
  },
}

export default MainApi
