<template>
    <div>
        <div class="card">
            <div onselectstart="return false;" class="card-header">
                <span class="tec-item-preview" @click="callProjectDetail">项目名称：{{item.project_Name}}</span>
                <span v-if="item.project_Expired == 1" class="float-right tec-warn">{{item.project_Expired | replaceText}}</span>
                <span v-else-if="item.project_Expired == 2" class="float-right tec-danger">{{item.project_Expired | replaceText}}</span>
                <span v-else-if="item.project_Expired == 3" class="float-right tec-deep-danger">{{item.project_Expired | replaceText}}</span>
                <span v-else class="float-right tec-invalid">{{item.project_Expired | replaceText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pro_card',
    props: {
        cardData: Object
    },
    data(){
        return {
            item: this.cardData
        }
    },
    filters: {
        replaceText(data){
            if(data == 1){
                return "轻度逾期";
            }else if(data == 2){
                return "重度逾期";
            }else if(data == 3){
                return "严重逾期";
            }else if(data == 99){
                return "数据出错";
            }
        }
    },
    methods: {
        callProjectDetail(){
            this.$router.push("/projects/detail");
        }
    }
}
</script>
