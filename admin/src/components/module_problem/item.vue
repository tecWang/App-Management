<template>
    <div data-attr="title" class="row border-top border-left border-right tec-item-problem">
        <span class="col-md-1 border-right" style="text-align: center;">
            {{item.problem_ID | replaceBlankValue}}
        </span>
        <span class="col-md-4 col-12 border-right" style="text-align: center;">
            {{item.problem_Name | replaceBlankValue}}
        </span>
        <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Last_Modify | replaceBlankValue}}
        </span>
        <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Owner | replaceBlankValue}}
            </span>
        <span id="file_path" @click="callPreviewTool" style="text-align: center;" class="col-sm-1 tec-problem-preview" :data-path="item.problem_Content">预览</span>
    </div>
</template>

<script>
export default {
    name: 'item_problem',
    props: {
        itemData: Object
    },
    data(){
        return {
            item: this.itemData     // 问题条目数据
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
    methods: {
        callPreviewTool(){
            $('#exampleModal').modal('toggle');
            this.$emit('toggleModal');
            // window.location.href = '#/problems/pdf';     //在同当前窗口中打开窗口
            // sessionStorage.setItem("path": path);
            // let path = $('#file_path').data('path');
            // window.open = '#/problems/pdf';     //在同当前窗口中打开窗口
        }
    }
}
</script>


<style>
.tec-problem-preview{
    cursor: pointer;
}
.tec-problem-preview:hover {
    color: red;
}
</style>
