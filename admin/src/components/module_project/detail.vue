<template>
    <div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" colspan="6">余吾项目</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">主要责任人</th>
                    <td>
                        {{item.project_MainLeader}} 
                        <span style="padding-left: 20px">{{item.project_MainLeaderPhone}}</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row">次要责任人</th>
                    <td>
                        {{item.project_DeputyLeader}} 
                        <span style="padding-left: 20px">{{item.project_DeputyLeaderPhone}}</span>
                    </td>
                </tr>
                <tr><th scope="row">项目开始时间</th><td>{{item.project_BeginDate}}</td></tr>
                <tr><th scope="row">项目预期结束时间</th><td>{{item.project_EndDate}}</td></tr>
                <tr>
                    <th scope="row">项目进度图</th>
                    <td>
                        <div id="container" style="height:500px;"></div>
                    </td>
                </tr>
                <tr style="visibility: hidden">
                    <th scope="row">项目预期结束时间</th>
                    <td>项目预期结束时间项目预期结束时间项目预期结束时间项目预期结束时间项目预期结束时间项目预期结束时间</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <th scope="row">项目发展记录</th>
                    <td>
                        <ul class="list-group">
                            <li v-for="devItem in task.developArr" class="list-group-item tec-no-border" :key="devItem.id" >
                               {{devItem.date}} {{devItem.contributor}} {{devItem.content}}
                            </li>
                            <li class="list-group-item tec-no-border tec-item-active"
                                @click="callModel($event)">
                                <button id="addDevelop" class="btn btn-block">新增条目</button>
                            </li>
                        </ul>
                    </td>
                    <th scope="row">提醒记录</th>
                    <td>
                        <ul class="list-group">
                            <li v-for="alertItem in task.alertArr"  class="list-group-item tec-no-border" :key="alertItem.id">
                               {{alertItem.date}} {{alertItem.contributor}}提醒了{{alertItem.receiver}} {{alertItem.time}}次
                            </li>
                            <li class="list-group-item tec-no-border tec-item-active" 
                                @click="callModel($event)">
                                <button id="addAlert" class="btn btn-block">新增条目</button>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 模态框 -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">新增条目</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">发起人:</label>
                                <input type="text" class="form-control" placeholder="张惠茹" v-model="upload.content">
                                
                                <div v-if="upload.addType == 'addDevelop'">
                                    <label for="recipient-name" class="col-form-label">进度内容:</label>
                                    <input type="text" class="form-control" placeholder="部署OA" v-model="upload.contributor">
                                </div>
                                
                                <div v-else-if="upload.addType == 'addAlert'">
                                    <label for="recipient-name" class="col-form-label">被警示人:</label>
                                    <input type="text" class="form-control" placeholder="王港荦" v-model="upload.receiver">
                                </div>
                            </div>
                        </form>
                    </div>



                    <div class="modal-footer">
                        <div id="stateBtn" class="alert alert-success invisible" role="alert" style="padding: .375rem .75rem; margin-bottom: 0; width: 100%; ">
                            修改成功
                        </div>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="sendCardMsg">确认修改</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>

export default {
    name: 'project_detail',
    data(){
        return {
            item: {},
            // 任务进度图及相关变量
            task: {
                scheduleArr: [],
                scheduleLen: 0,     // 共有几个阶段
                periodArr: [],      // 共有几个阶段
                beginWeekArr: [],   // 每个阶段从第几周开始
                dataWeekArr: [],    // 每个阶段的持续周数
                // 项目进度
                developArr: [],
                // 提醒进度
                alertArr: [],
            },
            upload: {
                addType: "",         // 用来区分是新增项目进度还是提醒进度 (develop / alert)
                contributor: "",
                content: "",
                receiver: ""
            }
        }
    },
    methods: {
        callModel(e){
            this.upload.addType = e.target.id;
            $('#exampleModal').modal('toggle');
        },
        sendCardMsg(){
            this.$http.post(this.$store.state.url.url_prefix + 'ProjectServlet', {
                
            }).then(response => {
                console.log(response.data);
            }, response => {
                console.log("error");
            });
        }
    },
    beforeMount(){
        this.$http.post(this.$store.state.url.url_prefix + "ProjectServlet", {
            requestType: 'detail',
            p_id: 1
            // p_id: this.$route.params.p_id
        }, {emulateJSON: true}).then(response => {
            console.log(response.data);
            this.item = response.data.data;

            // 任务进度图数据绑定
            this.task.scheduleArr = response.data.schedule;
            this.task.scheduleLen = this.task.scheduleArr.length;
            this.task.developArr = response.data.develop;
            this.task.alertArr = response.data.alert;

            // 图表数据绑定
            for(let i = this.task.scheduleLen; i > 0; i--){
                this.task.periodArr.push("第" + i + "阶段");
                if(i != 1) {
                    this.task.beginWeekArr.push(this.task.scheduleArr[i-1].begin*1 + 1);
                }else{
                    this.task.beginWeekArr.push(this.task.scheduleArr[i-1].begin);
                }
                this.task.dataWeekArr.push(this.task.scheduleArr[i-1].during);
            }

            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var app = {};
            let options = null;
            options = {
                title: {
                    text: '项目进度图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[1];
                        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'value'
                },
                yAxis: {
                    type : 'category',
                    splitLine: {show:false},
                    data : this.task.periodArr
                },
                series: [
                    {
                        name: '辅助',
                        type: 'bar',
                        stack:  '总量',
                        itemStyle: {
                            normal: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            },
                            emphasis: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: this.task.beginWeekArr
                    },
                    {
                        name: '时间',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data:this.task.dataWeekArr
                    }
                ]
            };
            if (options && typeof options === "object") {
                myChart.setOption(options, true);
            }
        },response => {
            console.log("error")
        });
    },
    
}
</script>

