<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="border-radius: none;">
                <li class="breadcrumb-item active"><a href="#/contracts/preview">合同预览</a></li>
                <li class="breadcrumb-item"><a href="#/contracts/add">合同录入</a></li>
            </ol>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Tab_func2',
    
}
</script>
