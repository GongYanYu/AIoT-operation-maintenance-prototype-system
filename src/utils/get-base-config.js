export function getApiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.VUE_APP_BASE_API
    // return 'http://10.7.205.231:8099/bsapi'
    // return 'https://jgpt.yazhou-bay.com/bsapi'
  } else {
    //正式部署的请求跟路径
    return 'https://jgpt.yazhou-bay.com/bsapi'
    // return 'http://10.7.205.231:8099/bsapi'
  }
}

//判断是否有权限
export function getHavePermission() {
  if (process.env.NODE_ENV === 'development'&&true) {
    return true
  }else {
    return true
  }
}


