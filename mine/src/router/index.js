import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/module_login/login'
import sign from '@/components/module_login/sign'
import before from '@/components/module_login/beforeSign'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/before', name: 'before', component: before},
    { path: '/sign', name: 'sign', component: sign},
    { path: '/login', name: 'login', component: login},
  ]
})
