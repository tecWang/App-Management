<template>
    <div class="row border-top border-left border-right tec-item-problem">
        <span class="col-md-1 border-right" style="text-align: center;">{{item.problem_ID}}</span>
        <span class="col-md-4 col-12 border-right" style="text-align: center;">{{item.problem_Name}}</span>
        <span class="col-md-3 border-right" style="text-align: center;">{{item.problem_Last_Modify}}</span>
        <span class="col-md-3 border-right" style="text-align: center;">{{item.problem_Owner}}</span>
        <span @click="callPreviewTool" style="text-align: center;" class="col-sm-1 tec-problem-preview" :data-path="item.problem_Last_Modify">预览</span>
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
            item: this.itemData
        }
    },
    methods: {
        callPreviewTool(){
            $('#exampleModal').modal('toggle');
            this.$emit('toggleModal');
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
