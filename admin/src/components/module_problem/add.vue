<template>
    <div>
        <tec-split></tec-split>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">问题名称</span>
            </div>
            <input type="text" class="form-control" v-model="p_name" placeholder="插件无法正常调用...">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">记录人</span>
            </div>
            <input type="text" class="form-control" v-model="p_person" placeholder="tecwang">
        </div>

        <tec-upload :range="'file'" @uploadSuccess="getReturnedData($event)"></tec-upload>
        
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
    data(){
        return {
            p_id: "",
            p_name: "",
            p_person: ""
        }
    },
    components: {
        "tec-split": Split,
        "tec-upload": upload
    },
    methods: {
        getReturnedData(data){
            console.log(data);
            this.p_id = data.p_id;
        },
        uploadProblem(){
            this.$http.post(this.$store.state.url.url_prefix + "ProblemServlet",{
                p_id: this.p_id,
                p_name: this.p_name,
                p_person: this.p_person
            },{emulateJSON: true}).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
            });
        }
    }
}
</script>
