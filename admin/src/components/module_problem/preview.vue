<template>
    <div class="container-fluid">
        <item-problem v-if="errorMessage == ''" v-for="item in lists" :itemData="item" :key="item.problem_ID"></item-problem>
        <div v-else>{{errorMessage}}</div>
    </div>
</template>

<script>
import item_problem from "./item.vue"

export default {
    name: 'Problem_preview',
    data(){
        return {
            lists: [],
            errorMessage: ""
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            this.$http.get(this.$store.state.url.url_prefix + "ProblemServlet").then(response=>{
                this.lists = response.data.data;
            }, response=>{
                this.errorMessage = "error";
            });
        }
    },  
    components: {
        "item-problem": item_problem
    }
}
</script>

<style>
.tec-item-problem:last-of-type {
    border-bottom: 1px solid #dee2e6!important;
}
.tec-item-problem {
    line-height: 3rem;
}
</style>