<template>
    <div class="container-fluid">
        <div class="row border-top border-left border-right tec-item-problem">
            <span class="col-md-1 border-right" style="text-align: center;">图书ID</span>
            <span class="col-md-4 col-12 border-right" style="text-align: center;">图书名称</span>
            <span class="col-md-3 border-right" style="text-align: center;">图书作者</span>
            <span class="col-md-3 border-right" style="text-align: center;">图书大小</span>
            <span class="col-md-1" style="text-align: center;">功能</span>
        </div>


        <div v-if="errorMessage != ''" class="row tec-item-problem border-left border-right border-top" >
            <span class="col-md-12" style="text-align: center">{{errorMessage}}</span>
        </div>
        <div v-else v-for="item in lists" :key="item.book_ID">
            <div data-attr="title" 
                class="row border-top border-left border-right tec-item-problem">
                <span class="col-md-1 border-right" style="text-align: center;">
                    {{item.book_ID | replaceBlankValue}}
                </span>
                <span 
                    :id="item.book_Path" 
                    onselectstart="return false;" class="col-md-4 col-12 border-right tec-item-active" style="text-align: center;"
                    @click="readBook($event)" >
                    {{item.book_Name | replaceBlankValue}}
                </span>
                <span class="col-md-3 border-right" style="text-align: center;">
                    {{item.book_Author | replaceBlankValue}}
                </span>
                <span class="col-md-3 border-right" style="text-align: center;">
                    {{item.book_Size | replaceBlankValue}}
                </span>
                <span class="col-sm-1 tec-item-active" style="text-align: center;" 
                    onselectstart="return false;">{{item.book_Tip}}</span>
            </div>
        </div>
    </div>
</template>

<script>
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
            this.$http.get(this.$store.state.url.url_prefix + "BookServlet").then(response=>{
                this.lists = response.data.data;
                for(let i = 0; i < this.lists.length; i++){
                    this.lists[i].problem_Content = this.$store.state.url.url_prefix + this.lists[i].problem_Content;
                }
            }, response=>{
                this.errorMessage = "error";
            });
        },
        readBook(e){
            this.$router.push({
                name: 'Book_detail',
                params: { 
                    filePath: e.target.id
                }                
            });
        }
    },
    filters: {
        replaceBlankValue(value){
            if(value == ""){
                return "-"
            }else {
                return value;
            }
        }
    },
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