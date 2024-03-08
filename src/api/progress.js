import request from '@/utils/request'
//为了 防止重复
const ProgressApi = {
  //项目施工进度概览
  progressView(params) {
    return request({ url: '/api/progressView', method: 'post', params })
  },
  //施工进度长期未更新项目
  projectUpdateCount(params) {
    return request({ url: '/api/projectUpdateCount', method: 'post', params })
  },
  //施工进度未更新项目弹窗 项目类型:0房建项目,1市政项目
  projectUpdateList(params) {
    return request({ url: '/api/projectUpdateList', method: 'post', params })
  },
  //项目施工状态
  progressStatusList(params) {
    return request({ url: '/api/progressStatusList', method: 'post', params })
  },
  //项目投资概览
  investView(params) {
    return request({ url: '/api/investView', method: 'post', params })
  },
  //项目投资方性质
  investTypeView(params) {
    return request({ url: '/api/investTypeView', method: 'post', params })
  },
  //项目投资进度
  investProgress(params) {
    return request({ url: '/api/investProgress', method: 'post', params })
  },
  //项目进度偏差分析
  progressReduce(params) {
    return request({ url: '/api/progressReduce', method: 'post', params })
  },
  //项目进度详情弹窗
  projectProgressList(params) {
    return request({ url: '/api/projectProgressList', method: 'post', params })
  },
}

export default ProgressApi
