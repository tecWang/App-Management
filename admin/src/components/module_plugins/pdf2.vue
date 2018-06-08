<template>
    <div class="mt-3 mb-3">
        <div class="row">
            <div style="text-align:left;" class="col-md-6">
                <button class="btn" @click="prePage">上一页</button>
                <span 
                    style="padding: 1rem;">
                    <input type="text" v-model="currentPage" style="display: inline-block;width: 2rem;text-align: center;">
                    / {{pageCount}}
                </span>
                <button class="btn" @click="nextPage">下一页</button>
            </div>
            <div style="text-align: right;;" class="col-md-6">
                <button class="btn" @click="rotate += 90">&#x27F3;</button>
                <button class="btn" @click="rotate -= 90">&#x27F2;</button>
                <button class="btn" @click="$refs.pdf.print()">打印</button>
            </div>
        </div>
        <pdf    :src="fileSrc"
                ref="pdf"
                :rotate = "rotate"
                :page = "currentPage"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event" ></pdf>
        
    </div>
</template>

<script>
import pdf from "vue-pdf"

export default {
    name: "pdf2",
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
        }
    },
    components: {
        "pdf": pdf
    }

}
</script>
