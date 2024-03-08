import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'
import '@/fonts/index.scss'

import App from './App'
import store from './store'
import router from './router'
import './permission' // permission control
//引入echarts样式
import '@/utils/echarts/macarons.js'
import { getApiBaseUrl } from '@/utils/get-base-config'
import LOG from './utils/self-log'
import * as echarts from 'echarts'
//3d模型
import "echarts-gl"
Vue.prototype.$echarts = echarts

Vue.use(Element)
Vue.config.productionTip = true
Vue.prototype.LOG = LOG
Vue.prototype.API_BASE_URL = getApiBaseUrl()
//滚动插件 https://www.npmjs.com/package/@david-j/vue-j-scroll
// import VueScroll from '@david-j/vue-j-scroll';
// Vue.use(VueScroll);
// 引入vue-video-player
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

// rem等比适配配置文件
// 基准大小px
const baseSize = 14
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小（“Math.min(scale, 1)” 指最高放大比例为1，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 1) + 'px'
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize =function() {
  setRem()
}
//是否是平板
Vue.prototype.$isPanelEquipment = function() {
  if (navigator.userAgent == null) {
    return false
  }
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)

  return flag != null
}

import * as filters from './filters' // global filters
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  created() {
    ////临时打开日志
    window.ISLOG = false
  },
  render: h => h(App)
})
