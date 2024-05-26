export function getApiBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return process.env.VUE_APP_BASE_API
  } else {
    //正式部署的请求跟路径
    return 'http://localhost:8080'
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


