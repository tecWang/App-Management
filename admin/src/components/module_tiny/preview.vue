<template>
    <div class="accordion" >
        <div onselectstart="return false;" class="card-header"
            v-for="item in cards" :key="item.t_id">
            <span :id="item.t_id" class="tec-item-active">
                名称:{{item.tiny_name}}</span>
            <span :id="item.t_id" class="tec-item-active">
                ID:{{item.tiny_id}}</span>
            <span class="float-right" v-html="item.tiny_lastDate">
            
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tiny_preview',
    data(){
        return {
            cards: []
        }
    },
    beforeMount(){
        this.$http.get(this.$store.state.url.url_prefix + "TinyServlet").then(response => {
            this.cards = response.data.data;
            for(let i = 0; i < this.cards.length; i++){
                this.cards.tiny_lastDate = this.isClose(this.cards.tiny_lastDate);
            }
        }, response => {
            console.log("error");
        });
    },
    methods: {
        isClose(data){
            let time1 = new Date(data);
            let time2 = new Date();
            let dateSpan = time1 - time2;
            let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            console.log(iDays);
            return `<span style="color: red">${iDays}</span>`;
        }
    }
}
</script>

<style>
.time-close {
    color: red;
}
</style>
