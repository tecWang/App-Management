<template>
    <div class="card">
        <div onselectstart="return false;" class="card-header" id="headingTwo" data-toggle="collapse" :data-target="'#collapse' + cardData.c_ID">
            <span>合同名称:{{cardData.contract_Name}}</span>
            <span class="float-right" :class="{'time-close': isTimeClose}">到期时间:{{cardData.contract_EndDate}}</span>
        </div>
        <div :id="'collapse' + cardData.c_ID" class="collapse" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">合同号:{{cardData.contract_ID}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('id')"></span></li>
                    <li class="list-group-item">合同名称:{{cardData.contract_Name}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('na')"></span></li>
                    <li class="list-group-item">甲方:{{cardData.contract_Party_A}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('a')"></span></li>
                    <li class="list-group-item">乙方:{{cardData.contract_Party_B}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('b')"></span></li>
                    <li class="list-group-item">起始时间:{{cardData.contract_BeginDate}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('bd')"></span></li>
                    <li class="list-group-item">到期时间:{{cardData.contract_EndDate}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('ed')"></span></li>
                    <li class="list-group-item">到期时间:{{cardData.contract_Value}} <span class="float-right oi oi-brush tec-button"  @click="tellFather('val')"></span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Con_card',
    props: {
        conData: Object
    },
    data(){
        return {
            cardData: this.conData,     // 卡片数据绑定
            isTimeClose: true,          // 是否临近两个月
        }   
    },
    created(){
        this.compareTime();
    },
    methods: {
        tellFather(type){
            this.$emit('show-model', {
                changeType: 'alter',
                type: type,
                id: this.cardData.c_ID,
            });
        },
        compareTime(){
            let time1 = new Date(this.cardData.contract_EndDate);
            let time2 = new Date();
            let dateSpan = time1 - time2;
            let iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            if(iDays <= 60){
                this.isTimeClose = true;
            }else{
                this.isTimeClose = false;
            }
        }
    }
}
</script>

<style>
.time-close {
    color: red;
}
.card-header {
    cursor: pointer;
}
.tec-button {
    cursor: pointer;
}
</style>
