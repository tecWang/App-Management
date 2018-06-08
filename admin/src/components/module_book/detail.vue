<template>
    <div class="row justify-content-md-center">
        <div class="col-md-12">
            <pdf-book :pdfSrc="filePath"></pdf-book>
        </div>
    </div>
</template>

<script>
import pdfBook from "../module_plugins/pdf"
export default {
    name: 'book_detail',
    data(){
        return {
            filePath: ""
        }
    },  
    components: {
        "pdf-book": pdfBook
    },
    mounted(){
        // 第一次跳转过来
        if(this.$route.params.filePath){
            this.filePath = this.$store.state.url.url_prefix + this.$route.params.filePath;
            sessionStorage.setItem("book", this.filePath);
        }else{
        // 刷新之后直接从本地读取
            this.filePath = sessionStorage.getItem("book");
        }
        console.log(this.filePath);
    }
}
</script>
