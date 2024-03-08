import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'baseMap',
      label: 'baseMap',
      component: () => import('@/views/base-map/index')
    },
  ]
})

