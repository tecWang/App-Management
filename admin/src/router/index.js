import Vue from 'vue'
import Router from 'vue-router'

import Tab_image from '@/components/module_image/Tab_image'       // 图片模块路由
import Tab_func2 from '@/components/module_contract/Tab_func2'    // 合同模块路由


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/link1',
      name: 'Tab_image',
      component: Tab_image
    },
    {
      path: '/link2',
      name: 'Tab_func2',
      component: Tab_func2
    }
  ]
})
