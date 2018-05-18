<template>
    <div class="card" style="width: 18rem;" >
        <img class="card-img-top" :src="'http://192.168.1.113:8080/yong/' + cardData.image_Path"  alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title" style="margin-bottom: 0;">{{cardData.image_Name}}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" @click="toggleModal(this)">{{cardData.image_Target_Link}}</li>
            <li class="list-group-item" v-show="cardData.image_Is_Used == 1">已启用</li>
            <li class="list-group-item" v-show="cardData.image_Is_Used != 1">未启用</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        data: Object
    },
    data(){
        return {
            cardData: this.data
        }
    },
    methods: {
        toggleModal(dom){
            $('#exampleModal').modal('toggle');
            let id = this.$data.cardData.image_ID;
            sessionStorage.setItem("image_id", id);
        }
    }
}
</script>

