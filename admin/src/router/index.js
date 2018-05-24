import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'
import Tab_image from '@/components/module_image/Tab_image'       // 图片模块路由
import Tab_contract from '@/components/module_contract/Tab_contract'    // 合同模块路由
import Tab_problem from '@/components/module_problem/Tab_problem'    // 合同模块路由
import Login from '@/components/module_login/login'
import Sign from '@/components/module_login/sign'

Vue.use(Router); 

const vueRouter = new Router({
	routes: [
		{path: '/images',name: 'Tab_image',component: Tab_image},
		{path: '/contracts',name: 'Tab_contract',component: Tab_contract},
		{path: '/problems',name: 'Tab_problem',component: Tab_problem},
		{path: '/login', name: 'Login', component: Login},
		{path: '/sign', name: 'Sign', component: Sign},
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
