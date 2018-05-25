import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'


import Tab_image from '@/components/module_image/Tab_image'       // 图片模块路由
import Image_Preview from '@/components/module_image/preview'       
import Image_Add from '@/components/module_image/add'       


import Tab_contract from '@/components/module_contract/Tab_contract'    // 合同模块路由
import Contract_Preview from '@/components/module_contract/preview'    // 合同模块路由
import Contract_Add from '@/components/module_contract/add'    // 合同模块路由


import Tab_problem from '@/components/module_problem/Tab_problem'    // 合同模块路由
import Problem_preview from '@/components/module_problem/preview'
import Problem_add from '@/components/module_problem/add'


import Login from '@/components/module_login/login'
import Sign from '@/components/module_login/sign'

Vue.use(Router); 

const vueRouter = new Router({
	routes: [
		{
			path: '/images',name: 'Tab_image',component: Tab_image,
			children: [
				{ path: '/images/preview', component: Image_Preview },
				{ path: '/images/add', component: Image_Add }
		]},{
			path: '/contracts',name: 'Tab_contract',component: Tab_contract,
			children: [
				{ path: '/contracts/preview', component: Contract_Preview },
				{ path: '/contracts/add', component: Contract_Add }
			]},
		{
			path: '/problems',name: 'Tab_problem',component: Tab_problem,
			children: [
				{ path: '/problems/preview', component: Problem_preview},
				{ path: '/problems/add', component: Problem_add}
		]},{
			path: '/login', name: 'Login', component: Login},
		{
			path: '/sign', name: 'Sign', component: Sign
		},
	]
});  

vueRouter.beforeEach(function (to, from, next) {
	const auth = store.state.auth;
	if(!auth.IsLogin){
		if (to.path == '/login') {
			next();
		} else if (to.path != '/login') {
			next('/login');
		}
	}else {
		if (to.path == '/login'){
			next('/images');
		}
		next();
	}
}); 

export default vueRouter;
