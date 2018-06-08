<template>
    <div data-attr="title" 
        class="row border-top border-left border-right tec-item-problem">
        <span class="col-md-1 border-right" style="text-align: center;">
            {{item.problem_ID | replaceBlankValue}}
        </span>
        <span onselectstart="return false;" class="col-md-4 col-12 border-right tec-item-active" style="text-align: center;"
             @click="callProblemDetail" >
            {{item.problem_Name | replaceBlankValue}}
        </span>
        <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Desc | replaceBlankValue}}
        </span>
        <!-- <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Last_Modify | replaceBlankValue}}
        </span> -->
        <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Solve | replaceBlankValue}}
        </span>
        <!-- <span class="col-md-3 border-right" style="text-align: center;">
            {{item.problem_Owner | replaceBlankValue}}
        </span> -->
        <span class="col-sm-1 tec-item-active" style="text-align: center;"
            @click="callPreviewTool()" onselectstart="return false;">预览</span>
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
            this.$emit('toggleModal', {
                id: this.itemData.problem_ID
            });
        },
        callProblemDetail(){
            this.$router.push("/problems/detail");
        }
    }
}
</script>