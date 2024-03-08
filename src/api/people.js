import request from '@/utils/request'
//为了 防止重复
const PeopleApi = {
  //工程项目人员概览
  personView(params) {
    return request({ url: '/api/personView', method: 'post', params })
  },
  //项目薪资发放概览
  projectPayCount(params) {
    return request({ url: '/api/projectPayCount', method: 'post', params })
  },
  //项目核酸监测情况
  nucleicAnalysis(params) {
    return request({ url: '/api/nucleicAnalysis', method: 'post', params })
  },
  //工地人员出勤
  attendenceCount(params) {
    return request({ url: '/api/attendenceCount', method: 'post', params })
  },
  //管理人员出勤
  managerAttendenceAnalysis(params) {
    return request({ url: '/api/managerAttendenceAnalysis', method: 'post', params })
  },
  //管理人员出勤列表弹窗
  managerList(params) {
    return request({ url: '/api/managerList', method: 'post', params })
  },
  //薪资发方放项目列表弹窗
  projectPayList(params) {
    return request({ url: '/api/projectPayList', method: 'post', params })
  },
  //项目工人年龄段分析
  ageAnalysis(params) {
    return request({ url: '/api/ageAnalysis', method: 'post', params })
  },
  //项目防疫概览
  nucleicView(params) {
    return request({ url: '/api/nucleicView', method: 'post', params })
  },
  //人员总览-项目人员概览
  attendenceView(params) {
    return request({ url: '/api/attendenceView', method: 'post', params })
  },
}

export default PeopleApi
