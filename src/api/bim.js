import axios from 'axios'

let BaseUrl = 'https://jgpt.yazhou-bay.com/SYJW_WEB'

if (process.env.NODE_ENV === 'development') {
  console.warn(['测试bim已打开！！！！'])
  BaseUrl = 'http://116.242.4.181:8083/SteelStructureProduction_Web'
}

export const IframeBaseUrl = BaseUrl + '/epc/bimView/externalSchedulePlan.html?biz='

function format_current_state(val) {
  if (val == null) return '-'
  //目前状态:0在建,     1竣工   2停工   3未开工    4完工
  let ans = ['在建', '竣工', '停工', '未开工', '完工']
  return ans[Number(val)]
}

function requestHttp(data) {
  data.url = BaseUrl + data.url
  return axios({
    headers: { 'Content-type': 'application/json' },
    timeout: 300000,
    ...data
  })
}

//1.1	获取项目信息
export function getShowIframeUrlByProject(project) {
  // console.log(JSON.stringify(project))
  return requestHttp({
    url: '/Services/Business_Http_Server.svc/GetPrjDataOfMapByState',
    method: 'get',
    params: {
      searchKey: project.project_name,
      state: format_current_state(project.current_state),
      pageIndex: 0,
      pageSize: 999
    }
  })
}

//2.1	根据1.1接口的项目ID获取进度PlanGID
export function getPlanGIDByCBizRangeId(FDeptID) {
  return requestHttp({
    url: '/Services/Schedule_Server.svc/GetPlanGIDByCBizRangeId',
    method: 'post',
    //c_bizRangeId
    data:{
      c_bizRangeId:FDeptID
    }
  })
}

//2.2	根据2.1接口的PlanGID获取进度数据
export function getSchedulePlanDataOfOldGantt(planGID) {
  return requestHttp({
    url: '/Services/Schedule_Server.svc/getSchedulePlanDataOfOldGantt',
    method: 'post',
    //c_bizRangeId
    data:{ planGID }
  })
}
