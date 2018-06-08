import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'

import login from '@/components/module_login/login'
import sign from '@/components/module_login/sign'
import before from '@/components/module_login/beforeSign'
import module_sale from '@/components/module_sale/module_sale'
import sale_preview from '@/components/module_sale/sale_preview'

Vue.use(Router)

const vueRouter = new Router({
	routes: [
		{ path: '/before', name: 'before', component: before },
		{ path: '/sign', name: 'sign', component: sign },
		{ path: '/login', name: 'login', component: login },
		{ path: '/sales', name: 'module_sale', component: module_sale,
			children: [
				{ path: '/sales/preview', component: sale_preview}
			]
		},
	]
})

vueRouter.beforeEach(function (to, from, next) {
	const auth = store.state.auth;
	// 如果用户没有登录且没有本地缓存
	if (!auth.user && !localStorage.getItem("user")) {
		if (to.path == '/login' || to.path == '/before') {
		next();
		} else if (to.path == '/sign' && auth.agreeSign) {
		next();
		} else {
		next('/login');
		}
		// 如果用户已经登录(靠登录界面 或 本地缓存)
	} else if (localStorage.getItem("user") || auth.user) {
		// 利用本地信息进行登录
		store.commit('login', {
		userName: localStorage.getItem("user"),
		userID: localStorage.getItem("userID")
		});
		if (to.path == '/login' || to.path == '/sign' || to.path == '/before') {
		console.log('在已经登录的情况下发生的重定向跳转');
		next('/sales/preview');
		} else {
		console.log('在已经登录的情况下发生的正常跳转');
		next();
		}
	} else {
		console.log("意料之外的路由跳转方式被触发");
		next();
	}
}); 

export default vueRouter
