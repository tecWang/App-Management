<template>
  	<div id="app" class="container-fluid">
    	<nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="$store.state.auth.showNav">
			<!-- 返回主页 -->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<a class="navbar-brand" href="#/contracts/preview">管理后台</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<!-- 模块名称 -->
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#"> <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/contracts/preview">合同管理</a>
					</li>
					<li class="nav-item" v-if="$store.state.auth.user == '王佳文'">
						<a class="nav-link" href="#/books/preview">图书阅读</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/projects/preview">项目管理</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/tinys/preview">零碎信息记录</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/problems/preview">问题数据库</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/images/preview">图片管理</a>
					</li>
				</ul>
				<!-- 登录注册 -->
				<span 	class="navbar-text tec-item-active" 
						@click="logout" id="loggou"
						data-toggle="tooltip" data-placement="bottom" 
                    	title="注销"
						>{{$store.state.auth.user}}</span>
			</div>
		</nav>
		<nav class="navbar navbar-expand-lg navbar-light bg-light" v-else>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<!-- 登录注册 -->
				<span class="navbar-text">
					<a class="nav-link" href="#/login">登录</a>
				</span>
				<span class="navbar-text">
					<a class="nav-link" href="#/before">注册</a>
				</span>
			</div>
		</nav>
		<tec-split></tec-split>
		<router-view/>
  </div>
</template>

<script>
import Split from "./components/split.vue"
import store from "./vuex/index.js"

export default {
  name: 'App',
  store,
  methods: {
	  	logout(){
			$("#loggou").tooltip("hide");
			this.$store.commit("logout");
			localStorage.removeItem("user");
			localStorage.removeItem("userID");
			this.$router.push("/login");
		}
  },
  mounted(){
		$('#loggou').tooltip();
  },
  components: {
    "tec-split": Split
  }
}
</script>

<style>
	body, html { 
		min-height:101%;
	}
</style>

