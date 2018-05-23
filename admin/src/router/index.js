import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'
import Tab_image from '@/components/module_image/Tab_image'       // 图片模块路由
import Tab_contract from '@/components/module_contract/Tab_contract'    // 合同模块路由
import Tab_problem from '@/components/module_problem/Tab_problem'    // 合同模块路由
import Login from '@/components/module_login/login'

Vue.use(Router); 

const vueRouter = new Router({
	routes: [
		{path: '/images',name: 'Tab_image',component: Tab_image},
		{path: '/contracts',name: 'Tab_contract',component: Tab_contract},
		{path: '/problems',name: 'Tab_problem',component: Tab_problem},
		{path: '/login', name: 'Login', component: Login},
	]
});  

vueRouter.beforeEach(function (to, from, next) {
	const auth = store.state.auth;
	console.log(auth);
	console.log(to.path);
	if (auth.IsLogin) {
		next();
	}else {
		next({path: '/problems'});
	}
}); 

export default vueRouter;
