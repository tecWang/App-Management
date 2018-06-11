<template>
    <ul class="list-group">
        <div class="container-fluid" style="line-height: 3">
            <div class="row">
                <div class="col align-self-start">{{router.p_title}}</div>
                <div class="col align-self-end" 
                    style="color: red;font-weight: 700;text-align: right;">距离开标时间 {{remainDate}}</div>
            </div>
        </div>
        <li v-for="item in items" :key="item.PRICE_ID"
            class="list-group-item container-fluid">
            <div class="row">
                <div class="col">{{item.PRICE_USER | hiddenUser}} 在 {{item.PRICE_PRICE_DATE | parseDate}} 参与了竞标， 竞标金额为 {{item.PRICE_PRICE | hiddenPrice}}</div>
                <div class="col align-self-end"
                    style="text-align: right;">
                    </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'sale_detail',
    data(){
        return {
            items: [],
            remainDate: '00天 00时 00分 00秒',
            timeOutFlag: false,
            // 由父页面传递过来的相关数据
            router: {
                p_id: "",
                p_title: "",
                p_openDate: ""
            }
        }
    },
    beforeMount(){
        this.updateDate();  // 初始化倒计时
        // 绑定表单数据
        if(this.$route.params.item != undefined){
            console.log("页面传参的值存在，不调用session");
            sessionStorage.setItem("p_id", this.$route.params.item.project_ID);
            sessionStorage.setItem("p_title", this.$route.params.item.project_Title);
            sessionStorage.setItem("p_openDate", this.$route.params.item.project_OpenPriceDate);
            this.router.p_title = sessionStorage.getItem("p_title");
            this.router.p_openDate = sessionStorage.getItem("p_openDate");
            this.getData(this.$route.params.item.project_ID);
        }
        else {
            console.log("页面传参的值不存在，调用session");
            if(sessionStorage.getItem("p_id")){
                this.router.p_title = sessionStorage.getItem("p_title");
                this.router.p_openDate = sessionStorage.getItem("p_openDate");
                this.getData(sessionStorage.getItem("p_id"));
            }
            else
                console.log("local session is not exists")
        }  
    },
    watch: {
        timeOutFlag(){
            if(this.timeOutFlag == true){

            }
                // this.hiddenPrice();
        }
    },
    filters: {
        hiddenPrice(data){
            let dateLast = new Date(sessionStorage.getItem('p_openDate'));
            let dateNow = new Date();
            if(dateNow < dateLast){ // 说明未到开标时间，暂不公布
                return "-----";
            }else {
                return data;
            }
        },
        hiddenUser(data){
            let dateLast = new Date(sessionStorage.getItem('p_openDate'));
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
            let minute = date.getMinutes();
            let second = date.getSeconds();

            return `${year}/${month}/${day} ${hour}:${minute}:${second}`
        }
    },
    methods:{
        // 更新右上角的开标倒计时
        updateDate(){
            setInterval(() => {
                let dateNow = new Date().getTime();
                let dateLast = new Date(this.router.p_openDate).getTime();
                let diff = dateLast - dateNow;
                if(diff > 0) {
                    let day = Math.floor(diff/86400000);
                    let hour = Math.floor((diff/3600000)%24);
                    let min = Math.floor((diff/60000)%60);
                    let sec = Math.floor((diff/1000)%60);
                    this.remainDate = day + '天 ' + hour + '时 ' + min + '分 ' + sec + '秒 ';
                }else{
                    this.getData(sessionStorage.getItem("p_id"));
                }
            }, 1000);
        },
        // 向服务器请求投标人的数据
        getData(p_id){
            this.$http.get(this.$store.state.url.url_prefix 
            + "BitServlet?requestType=detail&p_id=" 
            + p_id).then(res => {
                this.items = res.data.data;
            }, res => {
                console.log("error");
            });
        }
    }
}
</script>

