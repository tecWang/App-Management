<template>
    <div class="card" style="width: 18rem;" >
        <img class="card-img-top" :src="'http://192.168.1.113:8080/yong/' + cardData.image_Path"  alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title" style="margin-bottom: 0;">{{cardData.image_Name}}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" onselectstart="return false;" @click="toggleModal(this)">{{cardData.image_Target_Link}}</li>
            <li class="list-group-item" onselectstart="return false;" @click="toggleStatus()" v-show="cardData.image_Is_Used == 1">已启用<span class="oi oi-check float-right tec-icon-right" title="icon name" aria-hidden="true"></span></li>
            <li class="list-group-item" onselectstart="return false;" @click="toggleStatus()" v-show="cardData.image_Is_Used != 1">未启用<span class="oi oi-x float-right tec-icon-false" title="icon name" aria-hidden="true"></span></li>
        </ul>
    </div>
</template>

<script>
import config from '../../assets/config.js';

export default {
    name: 'Card',
    props: {
        data: Object,
        url_prefix: config.url_prefix
    },
    data(){
        return {
            cardData: this.data
        }
    },
    methods: {
        // 开启mask遮罩
        toggleModal(dom){
            $('#exampleModal').modal('toggle');
            let id = this.$data.cardData.image_ID;
            sessionStorage.setItem("image_id", id);
        },
        // 切换APP首页轮播图是否显示
        toggleStatus(){
            if(this.cardData.image_Is_Used == 1){
                this.cardData.image_Is_Used = 0;
            }else{
                this.cardData.image_Is_Used = 1;
            }

            this.$http.post(this.url_prefix + "ImageServlet", {
                status: this.cardData.image_Is_Used,
                id: this.cardData.image_ID
            },{emulateJSON: true}
            ).then(response=>{
                console.log(response.data);
            }, response=>{
                console.log("error");
            });
        }
    }
}
</script>

<style>
.tec-icon-right{
    color: rgb(24, 231, 52);
}
.tec-icon-false{
    color: gray;
}
</style>
