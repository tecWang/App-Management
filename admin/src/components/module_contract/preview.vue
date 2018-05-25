<template>
    <div class="accordion" >
        <div v-for="card in cards" :key="card.contract_ID">
            <tec-contract :conData="card" v-on:show-model="changeContract"></tec-contract>
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

export default {
    name: 'Contract_Preview',
    components: {
        "tec-contract": Con_card
    },
    data: function(){
        return {
            cards: [],
            changedValue: "",
            uploadData: {},
        }
    },
    mounted: function(){
        // 初始化合同数据
        this.$http.get(this.$store.state.url.url_prefix + "ContractServlet").then(response => {
             this.cards = response.data.data;
        }, response => {
            console.log("error");
        });

        this.$on('show', function(){
            alert('show');
        });
    },
    methods: {
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
            this.$http.post(this.$store.state.url.url_prefix + 'ContractServlet', {
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
