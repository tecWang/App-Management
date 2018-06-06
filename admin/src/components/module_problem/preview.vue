<template>
    <div class="container-fluid">
        <div class="row border-top border-left border-right tec-item-problem">
            <span class="col-md-1 border-right" style="text-align: center;">问题ID</span>
            <span class="col-md-4 col-12 border-right" style="text-align: center;">问题标题</span>
            <span class="col-md-3 border-right" style="text-align: center;">最后修改时间</span>
            <span class="col-md-3 border-right" style="text-align: center;">问题发起人</span>
            <span class="col-md-1" style="text-align: center;">功能</span>
        </div>


        <div v-if="errorMessage != ''" class="row tec-item-problem border-left border-right border-top" >
            <span class="col-md-12" style="text-align: center">{{errorMessage}}</span>
        </div>
        <div v-else v-for="item in lists"  :key="item.problem_ID">
            <item-problem  :data-path="item.problem_Content" 
                            :itemData="item"
                            @toggleModal="showModal($event)"
                            ></item-problem>
            <div :id="'collapse' + item.problem_ID" class="collapse row justify-content-md-center" data-parent="#accordion">
                <div class="col-md-8">
                    <pdf2 :pdfSrc="item.problem_Content"></pdf2>
                </div>
            </div>
        </div>
        
        <!-- 模态框, 备用方案 -->
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body"> -->
                        <!-- <div v-if="remoteSrc == ''"></div>
                        <item-pdf v-else :pdfSrc="remoteSrc"></item-pdf> -->
                    <!-- </div>
                </div>
            </div>
        </div>  -->
    </div>
</template>

<script>
import item_problem from "./item.vue"
import tecPdf from "../module_plugins/pdf.vue"
import pdf2 from "../module_plugins/pdf2.vue"

export default {
    name: 'Problem_preview',
    data(){
        return {
            lists: [],
            errorMessage: "",
            fileSrcList: []
        }
    },
    mounted(){
        this.getData();
    },
    methods: {
        getData(){
            this.$http.get(this.$store.state.url.url_prefix + "ProblemServlet").then(response=>{
                this.lists = response.data.data;
                for(let i = 0; i < this.lists.length; i++){
                    this.lists[i].problem_Content = this.$store.state.url.url_prefix + this.lists[i].problem_Content;
                }
            }, response=>{
                this.errorMessage = "error";
            });
        },
        showModal(obj){
            $('#collapse' + obj.id).collapse('toggle')
        },
        
    },  
    components: {
        "item-problem": item_problem,
        "item-pdf": tecPdf,
        "pdf2": pdf2,
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