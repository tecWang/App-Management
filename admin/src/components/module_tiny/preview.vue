<template>
    <div class="accordion" >
        <div class="card" v-for="item in cards" :key="item.t_id">
            <div onselectstart="return false;" class="card-header" id="headingTwo" 
            data-toggle="collapse" 
            :data-target="'#collapse' + item.t_id">
                <span class="tec-padding-right">
                    名称: {{item.tiny_name}}</span>
                <span class="float-right" 
                    v-html="item.tiny_lastDate_change"></span>
            </div>
            <div :id="'collapse' + item.t_id" class="collapse" data-parent="#accordion">
                <div class="card-body">
                    <ul class="list-group list-group-flush" :id="item.id">
                        <li class="list-group-item">ID: {{item.tiny_id}} <span class="float-right oi oi-brush tec-button"  @click="callModal(item.t_id, 'id')"></span></li>
                        <li class="list-group-item">名称: {{item.tiny_name}} <span class="float-right oi oi-brush tec-button"  @click="callModal(item.t_id, 'name')"></span></li>
                        <li class="list-group-item">到期时间: {{item.tiny_lastDate}} <span class="float-right oi oi-brush tec-button"  @click="callModal(item.t_id, 'date')"></span></li>
                        <li v-if="item.tiny_param1 != ''" 
                            class="list-group-item">{{item.tiny_param1}} <span class="float-right oi oi-brush tec-button"  @click="callModal(item.t_id, 'p1')"></span></li>
                        <li v-if="item.tiny_param2 != ''"
                            class="list-group-item">{{item.tiny_param2}} <span class="float-right oi oi-brush tec-button"  @click="callModal(item.id, 'p2')"></span></li>
                    </ul>
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
                                <input type="text" class="form-control" id="recipient-name" v-model="uploadData.changedValue">
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
export default {
    name: 'tiny_preview',
    data(){
        return {
            cards: [],
            uploadData: {
                changedValue: ""
            }
        }
    },
    beforeMount(){
        this.requestData();
    },
    methods: {
        requestData(){
            this.$http.get(this.$store.state.url.url_prefix + "TinyServlet").then(response => {
                this.cards = response.data.data;
                for(let i = 0; i < this.cards.length; i++){
                    let data = this.cards[i].tiny_lastDate;
                    this.cards[i].tiny_lastDate_change = this.isClose(data);
                }
            }, response => {
                console.log("error");
            });
        },
        // 检测到期时间是否在一个月内
        isClose(data){
            let time1 = new Date(data);
            let time2 = new Date();
            let dateSpan = time1 - time2;
            let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            if(iDays < 30){
                return `还剩下 <span style="color: red; font-weight:700;">${iDays}</span> 天到期`;
            }else {
                return `还剩下 <span>${iDays}</span> 天到期`
            }
        },
        // 唤起蒙版，并准备基本数据
        callModal(id, type){
            $('#exampleModal').modal('toggle');
            this.uploadData = {
                changeType: "alter",  // alter
                id: id,        // 2
                type: type,           // na
            }
        },
        // 上传数据
        sendCardMsg(){
            this.$http.post(this.$store.state.url.url_prefix + 'TinyServlet', {
                changeType: this.uploadData.changeType,
                id: this.uploadData.id,
                type: this.uploadData.type,
                data: this.uploadData.changedValue
            }, {emulateJSON: true}).then(response=>{
                let data = response.data;
                if(data.status == 1){
                    console.log(this);
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
            })
        }
    }
}
</script>

<style>
.time-close {
    color: red;
}
</style>
