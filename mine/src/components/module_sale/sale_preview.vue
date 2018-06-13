<template>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">项目名称</th>
            <th scope="col">开放报价时间</th>
            <th scope="col">截止报价时间</th>
            <th scope="col">开标时间</th>
            <th scope="col">参与竞标</th>
            </tr>
        </thead>
        <tbody>
            <!-- 获取数据出错时显示 -->
            <tr v-show="getDataError"><th>Error</th></tr>

            <!-- 未完成的竞标 -->
            <tr><th colspan="6">正在进行的竞标</th></tr>
            <tr v-show="!getDataError" v-for="item in items" :key="item.project_ID">
                <!-- ID -->
                <th scope="row">{{item.project_ID}}</th>
                <!-- 标题 -->
                <td class="tec-item-active"
                    @click="seeDetail(item)">{{item.project_Desc}}</td>
                <!-- 标的开始时间 -->
                <td>{{item.project_BeginDate | parseDate}}</td>
                <!-- 标的停标时间 -->
                <td>{{item.project_StopPriceDate | parseDate}}</td>
                <!-- 标的开标时间 -->
                <td>{{item.project_OpenPriceDate | parseDate}}</td>
                <!-- 供应商竞价按钮 -->
                <td><button class="btn btn-sm" 
                    :id="'btn' + item.project_ID"
                    :data-disable="checkStatus(item.project_StopPriceDate, item.project_ID)"
                    @mouseenter="getPriceBitted(item.project_ID)"
                    data-toggle="tooltip" data-placement="left" title="尚未参与竞标"
                    @click="bitForThis(item.project_StopPriceDate, item.project_ID)">竞价</button></td>
            </tr>


            <!-- 已完成的竞标 -->
            <tr><th colspan="6">已完成的竞标</th></tr>
            <tr v-show="!getDataError" v-for="item in itemsFinished" :key="item.project_ID">
                <th scope="row">{{item.project_ID}}</th>
                <td class="tec-item-active" :id="item.project_ID"
                    @click="seeDetail(item)">{{item.project_Desc}}</td>
                <td>{{item.project_BeginDate | parseDate}}</td>
                <td>{{item.project_StopPriceDate | parseDate}}</td>
                <td>{{item.project_OpenPriceDate | parseDate}}</td>
                <td><button class="btn btn-sm" disabled>已完成</button></td>
            </tr>
        </tbody>
        <div class="modal fade" id="model" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">请填写报价(
                        <span class="tec-font-red">报价只能填写一次，不可修改</span>
                    )</h5>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="newPrice"  class="col-form-label">预期价格:</label>
                            <input type="text" class="form-control" id="newPrice" v-model="newPrice">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div id="stateBtn" class="alert alert-success invisible" role="alert" style="padding: .375rem .75rem; margin-bottom: 0; width: 100%; ">
                        修改成功
                    </div>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="submitNewPrice">提交</button>
                </div>
                </div>
            </div>
            </div>
    </table>
</template>

<script>
export default {
    name: 'sale_preview',
    data(){
        return {
            items: [],
            itemsFinished: [],
            newPrice: "",
            toolTipMsg: "",
            getDataError: true,
            submitPriceSuccess: false
        }
    },
    mounted(){
        this.getItems();
        this.getItmesFinished();
    },
    filters: {
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
    methods: {
        // 拿到正在招标的项目
        getItems(){
            this.$http.get(this.$store.state.url.url_prefix + "BitServlet?requestType=preview&scope=unfinished").then(res => {
                if(res.data.status == 1){
                    this.items = res.data.data;
                    this.getDataError = false;
                }else{
                    this.getDataError = true;
                }
            }, res => {
                console.log("error");
            });
        },
        // 拿到已经完成的项目
        getItmesFinished(){
            this.$http.get(this.$store.state.url.url_prefix + "BitServlet?requestType=preview&scope=finished").then(res => {
                if(res.data.status == 1){
                    this.itemsFinished = res.data.data;
                    this.getDataError = false;
                }else{
                    this.getDataError = true;
                }
            }, res => {
                console.log("error");
            });
        },
        // -----------------------------------------------------------------
        // 根据截至时间和供应商竞价情况确定按钮的显示状态（是否可用，是否显示已竞价的价格）
        checkStatus(date, id){
            // 先检查是否超过竞标截止日期
            let dateNow = new Date().getTime();
            let dateStop = new Date(date).getTime();
            console.log("diff: " + (dateNow - dateStop));
            if((dateNow - dateStop) > 0){
                console.log("id: " + id + ", 超时");
                $("#btn" + id).attr("disabled",true);
                $("#btn" + id).html("已超时");
            }else{
                console.log("id: " + id + ", 不超时");
                // 现在的时间还没到截止日期, 则查看是否已经参与竞价
                this.IsBittedAlready(id);
            }
        },
        // 数据加载时查看是否已经参与过竞标
        IsBittedAlready(p_id){
            this.$http.get(this.$store.state.url.url_prefix 
                + "BitServlet?requestType=preview&scope=price"
                + "&p_id=" + p_id + "&userID=" + this.$store.state.auth.userID)
            .then(res => {
                if(res.data.data != undefined){   // 如果拿到了竞价信息，则已经参与了竞价
                    // $("#btn" + p_id).attr("disabled",true);
                    $("#btn" + p_id).html("已竞价"); 
                }
            }, res => {
                console.log("error");
            });
        },
        // 鼠标hover时显示供应商竞标价格
        getPriceBitted(p_id){
            this.$http.get(this.$store.state.url.url_prefix 
                + "BitServlet?requestType=preview&scope=price"
                + "&p_id=" + p_id + "&userID=" + this.$store.state.auth.userID)
            .then(res => {
                if(res.data.data != undefined){
                    $("#btn" + p_id).attr("title",`您的报价为￥${res.data.data.PRICE_PRICE}`);
                    $("#btn" + p_id).tooltip();
                    $("#btn" + p_id).tooltip("show");
                }else{
                    // $("#btn" + p_id).attr("title","尚未竞价");
                    // $("#btn" + p_id).tooltip();
                    // $("#btn" + p_id).tooltip("show");
                }
            }, res => {
                console.log("error");
            });
        },
        // 召开蒙版并绑定好上次用户报过的价格
        bitForThis(date, p_id){
            $("#btn" + p_id).tooltip("hide");           // 隐藏左部提示栏
            sessionStorage.setItem("p_id", p_id);       // 准备好项目id供submitNewPrice调用
            
            // 第二次检验是否超过截止时间，防止出现加载失误按钮没有disable 的情况
            let dateNow = new Date().getTime();
            let dateStop = new Date(date).getTime();
            if((dateNow - dateStop) > 0){
                // console.log("id: " + id + ", 超时");
                $("#btn" + p_id).attr("disabled",true);
                $("#btn" + p_id).html("已超时");
            }else{
                // 如果没有超时，判断是否已经参与过竞价
                this.$http.get(this.$store.state.url.url_prefix 
                    + "BitServlet?requestType=preview&scope=price"
                    + "&p_id=" + p_id + "&userID=" + this.$store.state.auth.userID)
                .then(res => {
                    if(res.data.data != undefined){
                        // alert("已经参与过竞价了");
                    }else{
                        $('#model').modal('show'); 
                    }
                }, res => {
                    console.log("error");
                });
            }

            
        },
        // 提交新价格
        submitNewPrice(){
            this.$http.post(this.$store.state.url.url_prefix + "BitServlet", {
                changeType: "price",
                p_id: sessionStorage.getItem("p_id"),
                user: this.$store.state.auth.user,
                userID: this.$store.state.auth.userID,
                newPrice: this.newPrice
            },{emulateJSON: true}).then(res => {
                let data = res.data;
                if(data.status == 1){
                    // console.log(this);
                    $('#stateBtn').addClass('visible');
                    $('#stateBtn').removeClass('invisible');
                    setTimeout(() => {
                        $("#btn" + sessionStorage.getItem("p_id")).html("已竞价");
                        // $("#btn" + sessionStorage.getItem("p_id")).attr("disabled",true);
                        sessionStorage.removeItem("p_id");  // 用完的session记得要销毁
                        $('#model').modal('toggle');
                    }, 500);
                }
            }, res => {
                $('#stateBtn').addClass('visible');
                $('#stateBtn').removeClass('invisible');
                $('#stateBtn').addClass('alert-danger');
                $('#stateBtn').removeClass('alert-success');
                $('#stateBtn').html("修改失败！");
                sessionStorage.removeItem("p_id");  // 用完的session记得要销毁
                console.log("Change image data error");
            });
            
        },
        // -------------------------------------------------------------------
        // 跳转到详情页
        seeDetail(item){
            // 此处新增一层验证，只有管理员可以访问
            if(this.$store.state.auth.user == '管理员' && 
               this.$store.state.auth.userID == 6687 ){
                this.$router.push({
                    name: 'sale_detail',
                    params: { 
                        p_id: item.project_ID
                    }                
                });
            }else{
                alert("权限不足，只有管理员可以访问该页面");
            }
        },
    }
}
</script>
