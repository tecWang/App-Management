<template>
    <form>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputEmail4">项目名称</label>
                <input type="text" class="form-control" id="inputEmail4" v-model="upload_basic.p_name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputLeader1">主要责任人</label>
                <input type="text" class="form-control" id="inputLeader1" v-model="upload_basic.p_main_leader">
            </div>
            <div class="form-group col-md-6">
                <label for="inputLeader2">主要责任人联系方式</label>
                <input type="text" class="form-control" id="inputLeader2" v-model="upload_basic.p_main_leader_phone">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputLeader3">次要责任人</label>
                <input type="text" class="form-control" id="inputLeader3" v-model="upload_basic.p_deputy_leader">
            </div>
            <div class="form-group col-md-6">
                <label for="inputLeader4">次要责任人联系方式</label>
                <input type="text" class="form-control" id="inputLeader4" v-model="upload_basic.p_deputy_leader_phone">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputDate1">项目开始时间</label>
                <input type="text" v-model="upload_basic.p_begin_date" class="form-control" id="inputDate1" placeholder="2018/1/1">
            </div>
            <div class="form-group col-md-6">
                <label for="inputDate2">项目预期结束时间</label>
                <input type="text" v-model="upload_basic.p_end_date" class="form-control" id="inputDate2" placeholder="2019/1/1">
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputWeek1">项目阶段数</label>
                <input v-model="upload_schedule.periodLen" type="test" class="form-control" id="inputWeek1">
            </div>
        </div>
        <div class="form-row" v-for="item in upload_schedule.periodList" :key="item.id" :id="'schedule' + item.id ">
            <div class="form-group col-md-6">
                <label data-toggle="tooltip" data-placement="right" 
                    title="阶段开始时间(以周为单位)">{{item.beginValue}}</label>
                <input type="text" class="form-control" data-name="begin">
            </div>
            <div class="form-group col-md-6" >
                <label data-toggle="tooltip" data-placement="right" 
                    title="填写本阶段完成所需要的时间(以周为单位)">{{item.durValue}}</label>
                <input type="text" class="form-control" data-name="during">
            </div>
        </div>


        <div style="text-align: center;">
            <div class="btn btn-primary" @click="insertProjectBasic">确定</div>
        </div>


        <!-- 没有作用，只是为了占位 -->
        <div class="form-row">
            <div class="form-group col-md-12">
                <input type="text" hidden >
            </div>
        </div>
    </form>
</template>

<script>
import split from "../split.vue"
import liner from "../liner.vue"
export default {
    name: 'project_add',
    components: {
        "tec-liner": liner,
        "tec-split": split
    },
    data(){
        return {
            upload_basic: {
                p_name: "",
                p_main_leader: "",
                p_main_leader_phone: "",
                p_deputy_leader: "",
                p_deputy_leader_phone: "",
                p_begin_date: "",
                p_end_date: ""
            },
            upload_schedule: {
                periodLen: 0,
                periodList: []
            }
        }
    },
    watch: {
        'upload_schedule.periodLen' : function(val){
            this.upload_schedule.periodList = [];
            for(let i = 0; i < val; i++){
                this.upload_schedule.periodList.push({
                    id: i,
                    durValue: "第"+ (i+1) +"阶段所需时长(周)",
                    beginValue: "第"+ (i+1) +"阶段开始时间(周)"
                });
            }
            setTimeout(() => {
                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                })
            }, 200);
        }
    },
    methods: {
        createScheduleList(){
            let arr = [];
            let period, projectWeek, beginWeek, duringWeek;
            for(let i = 0; i < this.upload_schedule.periodLen; i++){
                period = this.upload_schedule.periodList[i].id + 1;
                beginWeek = $('#schedule' + i).find("[data-name='begin']").val();
                duringWeek = $('#schedule' + i).find("[data-name='during']").val();
                arr.push({
                    period: period,
                    beginWeek: beginWeek,
                    duringWeek: duringWeek,
                    projectWeek: beginWeek*1 + duringWeek*1
                });
            }
            // console.log(arr);
            return arr;
        },
        insertProjectBasic(){
            this.$http.post(this.$store.state.url.url_prefix + "ProjectServlet", {
                // 项目基本信息数据绑定
                requestType: 'insert',
                addType: 'basic',
                p_name: this.upload_basic.p_name,
                p_main_leader: this.upload_basic.p_main_leader,
                p_main_leader_phone: this.upload_basic.p_main_leader_phone,
                p_deputy_leader: this.upload_basic.p_deputy_leader,
                p_deputy_leader_phone: this.upload_basic.p_deputy_leader_phone,
                p_begin_date: this.upload_basic.p_begin_date,
                p_end_date: this.upload_basic.p_end_date,
                p_cur_period: 0,
                p_total_period: this.upload_schedule.periodLen,
                p_finished: 0
            },{emulateJSON: true}).then(response => {
                console.log(response.data);
                this.insertProjectSchedule(response.data.p_id);
            }, response => {
                console.log("error");
            });
        }, 
        insertProjectSchedule(p_id){
            this.$http.post(this.$store.state.url.url_prefix + "ProjectServlet", {
                // 项目基本信息数据绑定
                requestType: 'insert',
                addType: 'schedule',
                p_id: p_id,
                len: this.upload_schedule.periodLen,
                schedule: this.createScheduleList()
            },{emulateJSON: true}).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
            });
        }
    }
}
</script>

