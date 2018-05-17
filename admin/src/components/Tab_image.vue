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
                    <form  action="http://localhost:8080/yong/UploadServlet"  
                            method="post" enctype="multipart/form-data">  
                            <!-- <input type="file" name="txt_file" id="txt_file" multiple class="file-loading" /> -->
                            <input type="submit" name="name"> <input type="file" name="file1">  
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Split from "./split.vue";
import Card from "./card.vue";
import Template from "../assets/template.js";

export default {
  name: 'Tab_image',
  data: function(){
        return {
            cards: []
        }
  },
  mounted: function(){
    
        this.$http.get('http://192.168.1.113:8080/yong/UploadServlet').then(response => {
             this.cards = response.data.data;
             console.log(this.cards);
            // get body data
            // this.someData = response.body;

        }, response => {
            console.log("error");
        });
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
