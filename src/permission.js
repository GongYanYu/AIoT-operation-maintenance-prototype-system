import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getHavePermission } from '@/utils/get-base-config'

const whiteList = ['/error', '/POIObjectDetail2', '/POITodayWarningList']

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  if (getHavePermission() || whiteList.findIndex(e => to.path && to.path.startsWith(e)) !== -1) {
    next()
  } else {
    next('/error')
  }
  NProgress.done()
})

router.afterEach((to, from) => {
  NProgress.done()
})
