<template>
    <div class="mt-3 mb-3">
        <div class="row">
            <pdf class="col-md-6"
                :src="fileSrc"
                ref="pdf"
                :rotate = "rotate"
                :page = "currentPage * 1"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event" ></pdf>
            <div class="col-md-6 row align-items-center">
                <div style="text-align:left; margin-top: 0;" class="col-md-8">
                    <button class="btn" @click="prePage">上一页</button>
                    <span 
                        style="padding: 1rem;" >
                        <input type="text" v-model="currentPage" style="display: inline-block;width: 2rem;text-align: center;">
                        / {{pageCount}}
                    </span>
                    <button class="btn" @click="nextPage">下一页</button>
                </div>
                <div style="text-align: right;" class="col-md-4">
                    <button class="btn" @click="$refs.pdf.print()">打印</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pdf from "vue-pdf"

export default {
    name: "pdf-book",
    props: {
        pdfSrc: String
    },
    data(){
        return {
            fileSrc: "",
            pageCount: 0,
            currentPage: 1,
            rotate: 0,
        }
    },
    // 让 props实时绑定到 pdf组件的 fileSrc属性上   
    watch: {
        pdfSrc(val) {
            this.fileSrc = val;//新增result的watch，监听变更并同步到myResult上
        }
    },
    beforeMount(){
        this.fileSrc = this.pdfSrc;
    },
    methods: {
        nextPage(){
            if(this.currentPage < this.pageCount)
                this.currentPage += 1
        },
        prePage(){
            if(this.currentPage > 1)
                this.currentPage -= 1    
        },
        changeCurrentPage(){
            this.currentPage = 1;
        }
    },
    components: {
        "pdf": pdf
    }
}
</script>
