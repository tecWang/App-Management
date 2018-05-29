<template>
    <div class="container-fluid">
        <div class="row border-top border-left border-right tec-item-problem">
            <span class="col-md-1 border-right" style="text-align: center;">问题ID</span>
            <span class="col-md-4 col-12 border-right" style="text-align: center;">问题标题</span>
            <span class="col-md-3 border-right" style="text-align: center;">最后修改时间</span>
            <span class="col-md-3 border-right" style="text-align: center;">问题最初发起人</span>
            <span class="col-md-1 tec-problem-preview" style="text-align: center;">功能</span>
        </div>
        <div v-if="errorMessage != ''" class="row tec-item-problem border-left border-right border-top" >
            <span class="col-md-12" style="text-align: center">{{errorMessage}}</span>
        </div>
        <item-problem v-else v-for="item in lists" :itemData="item" :key="item.problem_ID" @toggleModal="showModal"></item-problem>
        
        <!-- 模态框 -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <item-pdf></item-pdf>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import item_problem from "./item.vue"
import tecPdf from "../module_plugins/pdf.vue"

export default {
    name: 'Problem_preview',
    data(){
        return {
            lists: [],
            errorMessage: "",   
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
        },
        showModal(){
            
        },
    },  
    components: {
        "item-problem": item_problem,
        "item-pdf": tecPdf
    }
}
</script>

<style>
.tec-item-problem:last-of-type {
    border-bottom: 1px solid #dee2e6!important;
}
.tec-item-problem:nth-last-of-type(2){
    border-bottom: 1px solid #dee2e6!important;
}
.tec-item-problem {
    line-height: 3rem;
}
</style>