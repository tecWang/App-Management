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
                           <li v-for="devItem in developArr" :key="devItem.id" class="list-group-item tec-no-border">{{devItem.date}} {{devItem.contributor}} {{devItem.content}}</li>
                        </ul>
                    </td>
                    <th scope="row">提醒记录</th>
                    <td>
                        <ul class="list-group">
                           <li v-for="alertItem in alertArr" :key="alertItem.id" class="list-group-item tec-no-border">{{alertItem.date}} {{alertItem.contributor}}提醒了{{alertItem.receiver}} {{alertItem.time}}次</li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'project_detail',
    data(){
        return {
            item: {},
            // 任务进度图及相关变量
            scheduleArr: [],
            scheduleLen: 0,     // 共有几个阶段
            periodArr: [],      // 共有几个阶段
            beginWeekArr: [],   // 每个阶段从第几周开始
            dataWeekArr: [],    // 每个阶段的持续周数
            // 项目进度
            developArr: [],
            // 提醒进度
            alertArr: []
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
            this.scheduleArr = response.data.schedule;
            this.scheduleLen = this.scheduleArr.length;
            this.developArr = response.data.develop;
            this.alertArr = response.data.alert;

            // 图表数据绑定
            for(let i = this.scheduleLen; i > 0; i--){
                this.periodArr.push("第" + i + "阶段");
                if(i != 1) {
                    this.beginWeekArr.push(this.scheduleArr[i-1].begin*1 + 1);
                }else{
                    this.beginWeekArr.push(this.scheduleArr[i-1].begin);
                }
                this.dataWeekArr.push(this.scheduleArr[i-1].during);
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
                    data : this.periodArr
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
                        data: this.beginWeekArr
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
                        data:this.dataWeekArr
                    }
                ]
            };
            if (options && typeof options === "object") {
                myChart.setOption(options, true);
            }
        },response => {
            console.log("error")
        });
    }
}
</script>

