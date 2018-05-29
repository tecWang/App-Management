<template>
    <div>
        <tec-split></tec-split>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">问题名称</span>
            </div>
            <input type="text" class="form-control" placeholder="插件无法正常调用...">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">记录人</span>
            </div>
            <input type="text" class="form-control" placeholder="tecwang">
        </div>

        <tec-upload :range="'file'"></tec-upload>
        
        <div style="text-align: center;">
            <button class="btn" @click="uploadProblem">确定</button>
        </div>
    </div>
</template>


<script>
import Split from "../split.vue";
import upload from "../module_plugins/upload.vue"

export default {
    name: 'Problem_add',
    components: {
        "tec-split": Split,
        "tec-upload": upload
    },
    methods: {
        uploadProblem(){

        }
    }
}
</script>
