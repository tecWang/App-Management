<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="border-radius: none;">
                <li class="breadcrumb-item active"><a href="#/projects/preview">项目预览</a></li>
                <li class="breadcrumb-item"><a href="#/projects/add">新增项目</a></li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>
<script>


export default {
    name: 'tab_project',
}
</script>
