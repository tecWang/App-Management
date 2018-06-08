<template>
    <div>
        <tec-split></tec-split>
        <h5 style="color: red;">请先上传附件后再提交问题，否则可能会无法成功提交问题</h5>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputEmail4">问题名称</label>
                <input type="text" class="form-control" id="inputEmail4" v-model="p_name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="p_desc">问题描述</label>
                <input type="text" class="form-control" id="p_desc" v-model="p_desc">
            </div>
            <div class="form-group col-md-12">
                <label for="p_solve">解决办法</label>
                <input type="text" class="form-control" id="p_solve" v-model="p_solve">
            </div>
        </div>


        <h5 style="color: red;">建议上传横板office格式，竖版影响预览体验</h5>
        <tec-upload :range="'file'" @uploadSuccess="getReturnedData($event)"></tec-upload>
        
        <div style="text-align: center;">
            <button class="btn btn-primary" @click="uploadProblem">确定</button>
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
            p_desc: "",
            p_solve: "",
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
            this.p_id = data.p_id;
        },
        uploadProblem(){
            this.$http.post(this.$store.state.url.url_prefix + "ProblemServlet",{
                p_id: this.p_id,
                p_name: this.p_name,
                p_desc: this.p_desc,
                p_solve: this.p_solve,
                p_person: this.$store.state.auth.user,
                p_personID: this.$store.state.auth.userID
            },{emulateJSON: true}).then(response => {
                alert(response.data.msg);
                this.$router.push("/problems/preview");
            }, response => {
                console.log("error");
            });
        }
    }
}
</script>
