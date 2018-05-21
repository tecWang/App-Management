<template>
    <div class="card">
        <div onselectstart="return false;" class="card-header" id="headingTwo" data-toggle="collapse" :data-target="'#collapse' + cardData.contract_ID">
            <span>合同名称:{{cardData.contract_Name}}</span>
            <span class="float-right">到期时间:{{cardData.contract_EndDate}}</span>
        </div>
        <div :id="'collapse' + cardData.contract_ID" class="collapse" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">甲方:{{cardData.contract_Party_A}}</li>
                    <li class="list-group-item">乙方:{{cardData.contract_Party_B}}</li>
                    <li class="list-group-item">起始时间:{{cardData.contract_BeginDate}}</li>
                    <li class="list-group-item">到期时间:{{cardData.contract_EndDate}}</li>
                    <li class="list-group-item">到期时间:{{cardData.contract_Value}}</li>
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
            cardData: this.conData
        }
    }
}
</script>

