<template>
    <div class="accordion" >
        <tec-pro-card :cardData="card" v-for="card in cards" :key="card.project_ID"></tec-pro-card>
    </div>
</template>

<script>
import pro_card from "./item.vue"

export default {
    name: 'project_preview',
    components: {
        'tec-pro-card': pro_card
    },
    data(){
        return {
            cards: []
        }
    },
    mounted(){
        this.$http.get(this.$store.state.url.url_prefix + 'ProjectServlet').then(response => {
            this.cards = response.data.data;
        }, response => {
            console.log("error");
        });
    },
    methods: {

    }
}
</script>

