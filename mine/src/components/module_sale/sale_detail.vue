<template>
    <ul class="list-group">
        <div class="container-fluid" style="line-height: 3">
            <div class="row">
                <div class="col align-self-start">{{routerData.project_Title}}</div>
                <div class="col align-self-end" 
                    style="color: red;font-weight: 700;text-align: right;">距离开标时间 {{remainDate}}</div>
            </div>
        </div>
        
        <li v-if="routerData.project_Finish == -1" class="list-group-item tec-font-red">流拍</li>
        <li v-else-if="routerData.project_Finish == 1" class="list-group-item tec-font-red">已完成</li>


        <li v-if="!getPriceSuccess" class="list-group-item">无人报价</li>
        <li v-else v-for="item in items" :key="item.PRICE_ID"
            class="list-group-item container-fluid">
            <div class="row">
                <div class="col">{{item.PRICE_USER | hiddenUser(routerData.project_OpenPriceDate)}} 在 {{item.PRICE_PRICE_DATE | parseDate}} 参与了竞标， 竞标金额为 {{item.PRICE_PRICE | hiddenPrice(routerData.project_OpenPriceDate)}}</div>
                <div class="col align-self-end"
                    style="text-align: right;">
                    </div>
            </div>
        </li>
        <div v-show="routerData.project_Finish == 0" class="mt-3" style="text-align: center;">
            <button class="btn" @click="losePrice">流拍</button>
            <button class="btn" @click="bargain">议价</button>
            <button class="btn btn-primary" @click="openPrice">开标</button>
        </div>
    </ul>
</template>

<script>
export default {
    name: 'sale_detail',
    data(){
        return {
            p_id: "",
            items: [],          // 供应商报价信息
            routerData: {},     // 标的时间信息，如开标，停标，开标及名称
            remainDate: '00天 00时 00分 00秒',
            

            getPriceSuccess: false,
            getSummarySuccess: false
        }
    },
    beforeMount(){
        // 初始化倒计时
        this.updateTime();  
        // 绑定表单数据
        if(this.$route.params.p_id != undefined){
            console.log("页面传参的值存在，不调用session");
            sessionStorage.setItem("p_id", this.$route.params.p_id);
            this.getSummaryData(this.$route.params.p_id);
            this.getPriceData(this.$route.params.p_id);
        }
        else {
            console.log("页面传参的值不存在，调用session");
            if(sessionStorage.getItem("p_id")){
                this.p_id = sessionStorage.getItem("p_id");
                this.getSummaryData(this.p_id);
                this.getPriceData(this.p_id);
            }
            else{
                console.log("local session is not exists")
            }
        }  
    },
    filters: {
        // 不能调用this， 为undefined
        hiddenPrice(data, type){
            let dateLast = new Date(type);
            let dateNow = new Date();
            if(dateNow < dateLast){ // 说明未到开标时间，暂不公布
                return "-----";
            }else {
                return data;
            }
        },
        hiddenUser(data, type){
            let dateLast = new Date(type);
            let dateNow = new Date();
            if(dateNow < dateLast){ // 说明未到开标时间，暂不公布
                return "xxxxxx";
            }else {
                return data;
            }
        },
        parseDate(data){
            let date = new Date(data);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            let hour = date.getHours();
            if(hour < 10)
                hour = '0' + hour;
            let minute = date.getMinutes();
            if(minute < 10)
                minute = '0' + minute ;
            let second = date.getSeconds();
            if(second < 10)
                second = '0' + second;

            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        }
    },
    methods:{
        // 更新右上角的开标倒计时
        updateTime(){
            let timer = setInterval(() => {
                let dateNow = new Date().getTime();
                let dateLast = new Date(this.routerData.project_OpenPriceDate).getTime();
                let diff = dateLast - dateNow;
                if(diff > 0) {
                    let day = Math.floor(diff/86400000);
                    let hour = Math.floor((diff/3600000)%24);
                    let min = Math.floor((diff/60000)%60);
                    let sec = Math.floor((diff/1000)%60);
                    this.remainDate = day + '天 ' + hour + '时 ' + min + '分 ' + sec + '秒 ';
                }else{
                    console.log("已到开标时间");
                    clearInterval(timer);
                }
            }, 1000);
        },
        getSummaryData(p_id){
            this.$http.get(this.$store.state.url.url_prefix 
            + "BitServlet?requestType=preview&scope=exact&p_id=" 
            + p_id).then(res => {
                if(res.data.data.length != 0){
                    this.routerData = res.data.data;
                    this.getSummarySuccess = true;
                }
            }, res => {
                console.log("error");
            });
        },
        // 向服务器请求投标人的数据
        getPriceData(p_id){
            this.$http.get(this.$store.state.url.url_prefix 
            + "BitServlet?requestType=detail&p_id=" 
            + p_id).then(res => {
                if(res.data.data.length != 0){
                    this.items = res.data.data;
                    this.getPriceSuccess = true;
                }
            }, res => {
                console.log("error");
            });
        },
        openPrice(){
            this.$http.post(this.$store.state.url.url_prefix 
            + "BitServlet", {
                changeType: "status",
                statusType: "finish",
                p_id: this.p_id
            }, {emulateJSON: true}).then(res => {
                this.remainDate = '00天 00时 00分 00秒';
                this.getSummaryData(this.p_id);
                this.getPriceData(this.p_id);
            }, res => {
                console.log("error");
            });
        },
        bargain(){
            alert("实现方案待定");
        },
        losePrice(){
            this.$http.post(this.$store.state.url.url_prefix 
            + "BitServlet", {
                changeType: "status",
                statusType: "lose",
                p_id: this.p_id
            }, {emulateJSON: true}).then(res => {
                this.remainDate = '00天 00时 00分 00秒';
            }, res => {
                console.log("error");
            });
        }
    }
}
</script>

