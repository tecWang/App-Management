<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="border-radius: none;">
                <li class="breadcrumb-item active"><a href="#/images/preview">图片修改</a></li>
                <li class="breadcrumb-item"><a href="#/images/add">图片上传</a></li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>


export default {
  name: 'Tab_image',
  
}
</script>

<style>
    .card {cursor: pointer;}
</style>
