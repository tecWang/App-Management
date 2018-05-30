<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="margin-bottom: 0; border-radius: none;">
                <li class="breadcrumb-item active"><a href="#/problems/preview">问题预览</a></li>
                <li class="breadcrumb-item"><a href="#/problems/add">新增问题</a></li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>


<script>    
export default {
    name: 'Tab_problem',
}
</script>