import Vue from 'vue'
import Router from 'vue-router'
import Title from '@/components/Title'
import Tab_image from '@/components/Tab_image'
import Tab_func2 from '@/components/Tab_func2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
