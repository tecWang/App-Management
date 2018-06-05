import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'

// 图片管理模块路由
import Tab_image from '@/components/module_image/Tab_image'       // 图片模块路由
import Image_Preview from '@/components/module_image/preview'       
import Image_Add from '@/components/module_image/add'       

// 合同模块路由
import Tab_contract from '@/components/module_contract/Tab_contract'  
import Contract_Preview from '@/components/module_contract/preview'    
import Contract_Add from '@/components/module_contract/add'    

// 零碎信息记录模块
import Tab_tiny from  "@/components/module_tiny/Tab_tiny"
import Tiny_Preview from "@/components/module_tiny/preview"
import Tiny_Add from "@/components/module_tiny/add"

// 项目管理模块路由
import Tab_Project from '@/components/module_project/Tab_project'
import Project_Preview from '@/components/module_project/preview'
import Project_Add from '@/components/module_project/add'
import Project_detail from '@/components/module_project/detail'

// 问题数据库模块路由
import Tab_problem from '@/components/module_problem/Tab_problem'    
import Problem_preview from '@/components/module_problem/preview'
import Problem_add from '@/components/module_problem/add'
import Problem_detail from '@/components/module_problem/detail'

// 注册登录模块
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
		]},
		{
			path: '/contracts',name: 'Tab_contract',component: Tab_contract,
			children: [
				{ path: '/contracts/preview', component: Contract_Preview },
				{ path: '/contracts/add', component: Contract_Add }
		]},
		{
			path: '/projects', name: 'Tab_Project', component: Tab_Project,
			children: [
				{ path: '/projects/preview', name: 'Project_Preview', component: Project_Preview },
				{ path: '/projects/add', name: 'Project_Add',component: Project_Add },
				{ path: '/projects/detail', name: 'Project_detail', component: Project_detail }]
		},{
			path: '/tinys', name: 'Tab_tiny', component: Tab_tiny,
			children: [
				{ path: '/tinys/preview', component: Tiny_Preview},
				{ path: '/tinys/add', component: Tiny_Add}
			]
		},
		{
			path: '/problems',name: 'Tab_problem',component: Tab_problem,
			children: [
				{ path: '/problems/preview', component: Problem_preview},
				{ path: '/problems/add', component: Problem_add},
				{ path: '/problems/detail', component: Problem_detail}
		]},{
			path: '/login', name: 'Login', component: Login
		},{
			path: '/sign', name: 'Sign', component: Sign
		}
	]
});  

vueRouter.beforeEach(function (to, from, next) {
	const auth = store.state.auth;
	if(!auth.IsLogin){
		if (to.path == '/login' || to.path == '/sign') {
			next();
		} else {
			next('/login');
		}
	}else if(auth.IsLogin){
		if (to.path == '/login' || to.path == '/sign'){
			next('/contracts/preview');
		}
		next();
	}
}); 

export default vueRouter;
