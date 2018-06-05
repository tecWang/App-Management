<template>
    <div class="card">
        <div onselectstart="return false;" class="card-header"
            data-toggle="collapse" :data-target="'#collapse' + item.project_ID">
            <!-- 项目名称 -->
            <span :id="item.project_ID" class="tec-item-active" 
            @click="callProjectDetail($event)">项目名称：{{item.project_Name}}</span>
            
            <!-- 根据逾期严重程度决定显示哪个标签 -->
            <span class="float-right">
                当前项目进行到第 <span style="font-weight: 700; color: red;">{{item.project_CurrentPeriod}}</span> 阶段，
                历时 <span style="font-weight: 700; color: red;">{{ item.project_BeginDate | calcDays }}</span> 天
                即 <span style="font-weight: 700; color: red;">{{ item.project_BeginDate | calcWeeks }}</span> 周
            </span>
        </div>
        <div :id="'collapse' + item.project_ID" class="collapse" data-parent="#accordion">
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        标记为已完成的项目
                        <span @click="finishProject(item.project_ID)" class="float-right oi oi-check tec-button tec-item-active"></span>
                    </li>
                </ul>
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
        calcDays(data){
            let sDate1 = new Date(); 
            let sDate2 = new Date(data);
            let diff = sDate1 - sDate2;
            let iDays = Math.round(diff/1000/2600/24);  //把相差的毫秒数转换为天数  
            return iDays;
                //返回相差天数  
        },
        calcWeeks(data){
            let sDate1 = new Date(); 
            let sDate2 = new Date(data);
            let diff = sDate1 - sDate2;
            let iWeeks = Math.round(diff/1000/3600/24/7);   // 周数
            return iWeeks;
                //返回相差天数  
        },
        // 暂时废弃
        replaceText(data){
            if(data == 0){
                return "项目进展正常";
            }
            else if(data == 1){
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
        callProjectDetail(e){
            this.$router.push({
                name: 'Project_detail',
                params: { 
                    p_id: e.target.id
                }                
            });
        },
        finishProject(id){
            console.log(id);
            this.$http.post(this.$store.state.url.url_prefix + "ProjectServlet", {
                requestType: 'finish',
                p_id: id,
            },{emulateJSON: true}).then(res => {
                console.log(res.data);
            }, res => {
                console.log("error");
            });
        }
    }
}
</script>
