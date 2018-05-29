<template>
    <div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">合同编号</span>
            </div>
            <input type="text" class="form-control" name="c_id" v-model="c_id">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">合同名称</span>
            </div>
            <input type="text" class="form-control" name="c_name" v-model="c_name">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">开始时间</span>
            </div>
            <input type="text" class="form-control" name="c_bdate" v-model="c_bdate">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">到期时间</span>
            </div>
            <input type="text" class="form-control" name="c_edate" v-model="c_edate">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">合同甲方</span>
            </div>
            <input type="text" class="form-control" name="c_a" v-model="c_a">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">合同乙方</span>
            </div>
            <input type="text" class="form-control" name="c_b" v-model="c_b">
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">合同价格</span>
            </div>
            <input type="text" class="form-control" name="c_val" v-model="c_val">
        </div>
        <div style="text-align: center; line-height: 2rem;">
            <button class="btn" @click="insertContract">插入</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contract_Add',
    data(){
        return {
            c_id: "",
            c_name: "",
            c_bdate: "",
            c_edate: "",
            c_a: "",
            c_b: "",
            c_val: "",
        }
    },
    methods: {
        // 插入一条合同信息
        insertContract(){
            this.$http.post(this.$store.state.url.url_prefix + "ContractServlet", {
                changeType: "insert",
                c_id: this.c_id,
                c_name: this.c_name,
                c_bdate: this.c_bdate,
                c_edate: this.c_edate,
                c_a: this.c_a,
                c_b: this.c_b,
                c_val: this.c_val
            }, {emulateJSON: true}).then(response => {
                if(response.data.status == 1){
                    this.c_id = "";
                    this.c_name = "";
                    this.c_bdate = "";
                    this.c_edate = "";
                    this.c_a = "";
                    this.c_b = "";
                    this.c_val = "";
                    alert("success");
                }else if(response.data.status == 0){
                    alert("error");
                }
            }, response => {
                alert("error");
            });
        },
    }
}
</script>

