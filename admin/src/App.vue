<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
		<a class="navbar-brand" href="#/images">管理后台</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#"> <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#/images">图片管理</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#/contracts">合同管理</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#/problems">问题数据库</a>
				</li>
			</ul>
		</div>
	</nav>
    <tec-split></tec-split>
    <router-view/>
  </div>
</template>

<script>
import Split from "./components/module_image/split.vue"

export default {
  name: 'App',
  components: {
    "tec-split": Split
  }
}
</script>

<style>
	.visible {
		visibility: visible;
	}
	.invisible {
		visibility: hidden;
	}
	body, html { 
		min-height:101%;
	}
</style>

