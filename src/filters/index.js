import moment from 'moment'

//filter 可添加不可删除

//
export function format_construction_progress(val) {
  if (val == null || val === '') return '-'
  //0:提前  1正常  2滞后
  let ans = ['提前', '正常', '滞后']
  return ans[Number(val)]
}

export function format_for_invest_num(val) {
  // 注意 undefined 和 0 的布尔值都为false, 尤其是碰到金额转换，后端返回的金额为 0 时
  if (typeof val != 'number') {
    val = 0.0
  }
  if (val >= 10000) return (val / 10000).toFixed(1)
  return val.toFixed(1)
}

export function format_for_invest_unit(val) {
  if (val == null || val === '') return '万元'
  let unit = '万元'
  if (val >= 10000) unit = '亿元'
  return unit
}

//格式化时间 long转'1970-01-01 00:00:00'
export function formatTime(val) {
  if (val === null || val === '') {
    return '- -'
  }
  return moment(val).format('YYYY-MM-DD HH:mm:ss')
}

//进程状态
export function format_progress_status(val) {
  if (val == null || val === '') return '-'
  //0:提前  1正常  2滞后
  let ans = ['提前', '正常', '滞后']
  return ans[Number(val)]
}

//当前状态
export function format_current_state(val) {
  if (val == null) return '-'
  //目前状态:0在建,     1竣工   2停工   3未开工    4完工
  let ans = ['已开工', '竣工', '停工', '未开工', '完工']
  return ans[Number(val)]
}

//region name
export function format_region_name(val) {
  if (val == null || val === '') return '-'
  //          0           1           2         3           4
  let ans = ['公共教学区', '南繁科技城', '南山港', '深海科技城', '中转基地']
  return ans[Number(val)]
}

//预警状态
export function format_warning_process_state(val) {
  if (val == null || val === '') return '-'
  let ans = ['处理中', '已完成', '审核中']
  return ans[Number(val)]
}

// 项目类型:0房建项目,1市政项目
export function format_project_type(val) {
  if (val == null || val === '') return '-'
  let ans = ['房建项目', '市政项目']
  return ans[Number(val)]
}

//行业属性
export function format_industry_type(val) {
  if (val == null || val === '') return '-'
  let ans = ['产业/商业/住宅', '产业项目',
    '公共服务', '机关楼堂', '酒店', '商业/住宅',
    '市政道路', '市政设施', '市政水系', '市政修复', '住宅']
  return ans[Number(val)]
}

//投资方性质:0 政府投资,1 社会投资
export function format_investors_nature(val) {
  if (val == null || val === '') return '-'
  let ans = ['政府投资', '社会投资']
  return ans[Number(val)]
}

//预警内容类型
export function format_warning_content_type(val) {
  if (val == null || val === '') return '-'
  let ans = new Map()
  ans.set(15, 'PM10')
  ans.set(46, 'PM2.5')
  ans.set(16, '噪音')
  return ans.get(Number(val))
}

export function format_num_exist(val) {
  // 注意 undefined 和 0 的布尔值都为false, 尤其是碰到金额转换，后端返回的金额为 0 时
  if (val === null) {
    return 0
  }
  return val
}

//设备
export function parseDeviceNumData(data) {
  let result = {}
  data.forEach(obj => {
    const datum = obj[0]
    Object.keys(datum).forEach(e => result[e] = datum[e])
  })
  return result
}

export function formatValueToGang(val,nullShow='-') {
  return val != null ? val :nullShow
}

export function format_percentage(val, multiplyV = 1) {
  if (val == null || val === '') return '-'
  return (Number(val) * multiplyV).toFixed(1)
}

export function formatNum(val){
  if (val == null || isNaN(val)) val='0'
  return val
}
