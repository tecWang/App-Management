<template>
  <div id="app" class="container-fluid">
    	<nav class="navbar navbar-expand-lg navbar-light bg-light" 
			v-if="$store.state.auth.showNav">
			<!-- 返回主页 -->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<a class="navbar-brand" href="#/sales/preview">竞拍</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<!-- 模块名称 -->
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#"> <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#/sales/preview">Name</a>
					</li>
				</ul>
				<!-- 登录注册 -->
				<span 	class="navbar-text tec-item-active" 
						@click="logout" id="logout"
						data-toggle="tooltip" data-placement="bottom" 
						title="注销"
						>{{$store.state.auth.user}}</span>
			</div>
		</nav>
		<nav class="navbar navbar-expand-lg navbar-light bg-light" 
			v-else>
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
			$('#logout').tooltip('hide')
			this.$store.commit("logout");

			localStorage.removeItem("user");
			localStorage.removeItem("userID");
			localStorage.removeItem("checkState");
			localStorage.removeItem("role");
			
			this.$router.push("/login");
	  }
  },
  mounted(){
	$('#logout').tooltip()
  },
  components: {
    "tec-split": Split
  }
}
</script>

<style lang="">
	body, html { 
		min-height:101%;
	}
</style>
