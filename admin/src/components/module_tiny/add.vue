<template>
    <form>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputName">名称</label>
                <input type="text" class="form-control" id="inputName" v-model="upload.itemName">
            </div>
            <div class="form-group col-md-6">
                <label for="inputID">ID</label>
                <input type="text" class="form-control" id="inputID" v-model.lazy="upload.item_id">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputdate">到期时间</label>
                <input type="text" class="form-control" id="inputdate" v-model.lazy="upload.lastDate">
                
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputName1">备注1</label>
                <input type="text" class="form-control" id="inputName1" v-model="upload.param1">
            </div>
            <div class="form-group col-md-12">
                <label for="inputName2">备注2</label>
                <input type="text" class="form-control" id="inputName2" v-model="upload.param2">
            </div>
        </div>


        <div style="text-align: center;">
            <div class="btn btn-primary" @click="addItem">确定</div>
        </div>


        <!-- 没有作用，只是为了占位 -->
        <div class="form-row">
            <div class="form-group col-md-12">
                <input type="text" hidden >
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: "tiny_add",
    data(){
        return {
            upload: {
                itemName: "",
                item_id: "",
                lastDate: "",
                param1: "",
                param2: ""
            }
        }
    },
    methods: {
        addItem(){
            this.$http.post(this.$store.state.url.url_prefix + "TinyServlet", {
                changeType: "insert",
                itemName: this.upload.itemName,
                item_id: this.upload.item_id,
                lastDate: this.upload.lastDate,
                param1: this.upload.param1,
                param2: this.upload.param2
            }, {emulateJSON: true}).then(res => {
                alert(res.data.msg);
            }, res => {
                console.log("error");
            });
        }
    }
}
</script>
