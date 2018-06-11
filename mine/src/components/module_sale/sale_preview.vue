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
            <tr v-show="getDataError">
                <th>Error</th>
            </tr>
            <tr>
                <th colspan="6">正在进行的竞标</th>
            </tr>
            <tr v-show="!getDataError" v-for="item in items" :key="item.project_ID">
                <th scope="row">{{item.project_ID}}</th>
                <td class="tec-item-active" :id="item.project_ID"
                    @click="seeDetail(item)">{{item.project_Desc}}</td>
                <td>{{item.project_BeginDate}}</td>
                <td>{{item.project_StopPriceDate}}</td>
                <td>{{item.project_OpenPriceDate}}</td>
                <td><button class="btn btn-sm" 
                    :id="'btn' + item.project_ID" 
                    :disabled = "disableBtn(item.project_StopPriceDate, item.project_ID) || bitted(item.project_ID)"
                    @click="bitForThis(item.project_ID)">竞价</button></td>
            </tr>
            <tr>
                <th colspan="6">已完成的竞标</th>
            </tr>
            <tr v-show="!getDataError" v-for="item in itemsFinished" :key="item.project_ID">
                <th scope="row">{{item.project_ID}}</th>
                <td class="tec-item-active" :id="item.project_ID"
                    @click="seeDetail(item)">{{item.project_Desc}}</td>
                <td>{{item.project_BeginDate}}</td>
                <td>{{item.project_StopPriceDate}}</td>
                <td>{{item.project_OpenPriceDate}}</td>
                <td><button class="btn btn-sm" disabled>已完成</button></td>
            </tr>
        </tbody>
        <div class="modal fade" id="model" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">请填写报价(
                        <span style="color: red">注意报价只能填写一次，不可修改</span>
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
            getDataError: true,
            submitPriceSuccess: false
        }
    },
    mounted(){
        this.getItems();
        this.getItmesFinished();
    },
    methods: {
        // 跳转到详情页
        seeDetail(item){
            // 此处新增一层验证，只有管理员可以访问
            if(this.$store.state.auth.user == '管理员' && 
               this.$store.state.auth.userID == 6687 ){
                this.$router.push({
                    name: 'sale_detail',
                    params: { 
                        item: item
                    }                
                });
            }else{
                alert("权限不足，只有管理员可以访问该页面");
            }
            
        },
        // 召开蒙版并绑定好上次用户报过的价格
        bitForThis(p_id){
            $('#model').modal('toggle');
            // 拿到该用户上次竞标提交过的价格(如果有的话)
            // this.getLastPrice();
            sessionStorage.setItem("p_id", p_id);
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
                        $("#btn" + sessionStorage.getItem("p_id")).html("已竞拍");
                        $("#btn" + sessionStorage.getItem("p_id")).attr("disabled",true);
                        $('#model').modal('toggle');
                    }, 500);
                }
            }, res => {
                $('#stateBtn').addClass('visible');
                $('#stateBtn').removeClass('invisible');
                $('#stateBtn').addClass('alert-danger');
                $('#stateBtn').removeClass('alert-success');
                $('#stateBtn').html("修改失败！");
                console.log("Change image data error");
            });
        },
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
        // 拿到用户上一次竞标的价格(暂时不使用该方法)
        getLastPrice(){},
        // 根据是否超过停止投标的时间决定按钮是否启用
        disableBtn(date, id){
            setTimeout(() => {
                let dateNow = new Date().getTime();
                let dateStop = new Date(date).getTime();
                if((dateNow - dateStop) < 0){   // 时间不到则不停用
                    return false
                }else{
                    $("#btn" + id).html("已超时");
                    $("#btn" + id).attr("disabled",true);
                    return true
                }
            }, 50);
        },
        // 根据是否已经参与竞价决定按钮是否启用
        bitted(id){
            this.$http.get(this.$store.state.url.url_prefix 
            + "BitServlet?requestType=detail&p_id=" 
            + id).then(res => {
                // console.log(res.data.data);
                if(res.data.data.length != 0){
                    $("#btn" + id).attr("disabled",true);
                    $("#btn" + id).html("已竞价"); 
                }else{
                    $("#btn" + id).html("竞价"); 
                }
            }, res => {
                console.log("error");
            });
        }
        
    }
}
</script>
