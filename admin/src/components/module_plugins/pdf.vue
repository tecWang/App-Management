<template>
    <div>
        <p style="text-align: right;">
            <button class="btn" @click="rotate += 90">&#x27F3;</button>
            <button class="btn" @click="rotate -= 90">&#x27F2;</button>
            <button class="btn" @click="$refs.pdf.print()">打印</button>
        </p>
        <pdf    src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"
                ref="pdf"
                :rotate = "rotate"
                :page = "currentPage"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event"  ></pdf>
        <p style="text-align: center;">
            <button class="btn" @click="prePage">上一页</button>
            <span style="padding: 1rem;">{{currentPage}} / {{pageCount}}</span>
            <button class="btn" @click="nextPage">下一页</button>
        </p>
    </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
    name: 'tecPdf', // 名字不能和导入的模块名称一样，否则会递归溢出
    data(){
        return {
            pageCount: 0,
            currentPage: 1,
            rotate: 0
        }
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
