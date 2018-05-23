<template>
    <div class="row">
        <div class="col-2">
            <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-image-list" data-toggle="list" href="#list-image" role="tab" aria-controls="home">合同预览</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">合同录入</a>
            </div>
        </div>
        <div class="col-10">
            <div class="tab-content" id="nav-tabContent" >
                <div class="tab-pane fade show active" id="list-image" role="tabpanel" aria-labelledby="list-home-list">
                    <div class="accordion" >
                        <div v-for="card in cards" :key="card.contract_ID">
                            <tec-contract :conData="card" v-on:show-model="changeContract"></tec-contract>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">合同号</span>
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
                            <span class="input-group-text" id="inputGroup-sizing-default">合同开始时间</span>
                        </div>
                        <input type="text" class="form-control" name="c_bdate" v-model="c_bdate">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">合同结束时间</span>
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
                    <button @click="insertContract">插入</button>
                </div>
            </div>
        </div>

        <!-- 模态框 -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改合同信息</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">填入新的内容:</label>
                                <input type="text" class="form-control" id="recipient-name" v-model="changedValue">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <div id="stateBtn" class="alert alert-success invisible" role="alert" style="padding: .375rem .75rem; margin-bottom: 0; width: 100%; ">
                            修改成功
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="sendCardMsg">确认修改</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>


<script>
import Con_card from "./con_card.vue";
import config from "../../assets/config.js";

export default {
    name: 'Tab_func2',
    components: {
        "tec-contract": Con_card
    },
    data: function(){
        return {
            cards: [],
            url_prefix: config.url_prefix,
            changedValue: "",
            uploadData: {},
            c_id: "",
            c_name: "",
            c_bdate: "",
            c_edate: "",
            c_a: "",
            c_b: "",
            c_val: "",
        }
    },
    mounted: function(){
        // 初始化合同数据
        this.$http.get(this.url_prefix + "ContractServlet").then(response => {
             this.cards = response.data.data;
        }, response => {
            console.log("error");
        });

        this.$on('show', function(){
            alert('show');
        });
    },
    methods: {
        // 插入一条合同信息
        insertContract(){
            this.$http.post(this.url_prefix + "ContractServlet", {
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
        // 修改合同信息
        changeContract($event){
            $('#exampleModal').modal('toggle');

            this.uploadData = {
                changeType: $event.changeType,  // alter
                id: $event.id,                  // 2
                type: $event.type,              // na
            }
        },
        sendCardMsg(){
            this.$http.post( this.url_prefix + 'ContractServlet', {
                changeType: this.uploadData.changeType,
                id: this.uploadData.id,
                type: this.uploadData.type,
                data: this.changedValue
            }, {emulateJSON: true}).then(response=>{
                let data = response.data;
                if(data.status == 1){
                    // console.log(this);
                    $('#stateBtn').addClass('visible');
                    $('#stateBtn').removeClass('invisible');
                    setTimeout(() => {
                        $('#exampleModal').modal('toggle');
                    }, 500);
                }
            }, response => {
                $('#stateBtn').addClass('visible');
                $('#stateBtn').removeClass('invisible');
                $('#stateBtn').addClass('alert-danger');
                $('#stateBtn').removeClass('alert-success');
                $('#stateBtn').html("修改失败！");
                console.log("Change image data error");
            })
        }
    }
}
</script>
