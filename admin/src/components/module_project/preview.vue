<template>
    <div class="accordion" >
        <div v-for="card in cards" :key="card.project_ID">
            <tec-pro-card :cardData="card"></tec-pro-card>
        </div>
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
            console.log(response.data);
            this.cards = response.data.data;
        }, response => {
            console.log("error");
        });
    },
    methods: {

    }
}
</script>

