<template>
    <div>
        <!-- card容器，用来插入大量数据 -->
        <div class="card-columns" id="cardContainer" >
            <div v-for="card in cards" :key="card.id">
                <tec-card :data="card"></tec-card>
            </div>
        </div>
        <!-- 模态框 -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">修改图片链接</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">填入新的链接:</label>
                                <input type="text" class="form-control" id="recipient-name" v-model="changedLink">
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
import Card from "./card.vue";
import Template from "../../assets/template.js";


export default {
    name: 'Image_Preview',
    data: function(){
        return {
            cards: [],
            changedLink: ""
        }
    },
    mounted: function(){
            // 渲染图片模块首页的cards
            this.$http.get(this.$store.state.url.url_prefix + "UploadServlet").then(response => {
                this.cards = response.data.data;
            }, response => {
                console.log("error");
            });
    },
    methods: {
            // 修改图片地址指向  
            sendCardMsg: function(){
                console.log(this.$store.state);
                this.$http.post(this.$store.state.url.url_prefix + 'ImageServlet', 
                {
                    id: sessionStorage.getItem('image_id'),
                    newLink: this.changedLink
                }, {emulateJSON: true})
                .then(response=>{
                    let data = response.data;
                    if(data.status == 1){
                        // console.log(this);
                        $('#stateBtn').addClass('visible');
                        $('#stateBtn').removeClass('invisible');
                        setTimeout(() => {
                            $('#exampleModal').modal('toggle');
                        }, 500);
                    }
                }, response=> {
                    $('#stateBtn').addClass('visible');
                    $('#stateBtn').removeClass('invisible');
                    $('#stateBtn').addClass('alert-danger');
                    $('#stateBtn').removeClass('alert-success');
                    $('#stateBtn').html("修改失败！");
                    console.log("Change image data error");
                });
            }
    },
    components: {
        "tec-card": Card
    }
}
</script>
