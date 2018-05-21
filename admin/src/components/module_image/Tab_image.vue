<template>
    <div class="row">
        <div class="col-2">
            <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-image-list" data-toggle="list" href="#list-image" role="tab" aria-controls="home">图片修改</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">图片上传</a>
            </div>
        </div>
        <div class="col-10">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-image" role="tabpanel" aria-labelledby="list-home-list">
                    <!-- card容器，用来插入大量数据 -->
                    <div class="card-columns" id="cardContainer" >
                        <div v-for="card in cards" :key="card.id">
                            <tec-card :data="card"></tec-card>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    <form  :action="url_prefix + 'UploadServlet'"  
                            method="post" enctype="multipart/form-data">  
                            <input type="submit" name="name"> <input type="file" name="file1">  
                    </form>
                </div>
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
import Split from "./split.vue";
import Card from "./card.vue";
import Template from "../../assets/template.js";

import config from '../../assets/config';

export default {
  name: 'Tab_image',
  data: function(){
        return {
            cards: [],
            changedLink: "",
            url_prefix: config.url_prefix
        }
  },
  mounted: function(){
        // 渲染图片模块首页的cards
        // this.$http.get(this.url_prefix + "UploadServlet").then(response => {
        //      this.cards = response.data.data;
        // }, response => {
        //     console.log("error");
        // });
  },
  methods: {
        // 修改图片地址指向  
        sendCardMsg: function(){
            this.$http.post(this.url_prefix + 'ImageChangeServlet', 
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
    "tec-split": Split,
    "tec-card": Card
  }
}
</script>

<style>
    .card {cursor: pointer;}
</style>
