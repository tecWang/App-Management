<template>
    <form >
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="user">账号</label>
                <input type="text" class="form-control" id="user" v-model="username">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="pass">密码</label>
                <input type="password" class="form-control" id="pass" v-model="password">
            </div>
        </div>

        <div style="text-align: center;">
            <div class="btn btn-primary" @click="login">登陆</div>
        </div>
    </form>
</template>

<script>

export default {
    name: 'login',
    data(){
        return {
            username: "",
            password: "",
        }
    },
    ready(){
        console.log(this.$store.state);
    },
    methods: {
        login(){
            this.$http.post(this.$store.state.url.url_prefix + 'LoginServletMine', {
                requestType: "login",
                userAccount: this.username,
                userPass: this.password
            }, {emulateJSON: true}).then(res => {
                if(res.data.status == 1){
                    this.checkUserOrg(res.data.name, res.data.userID);
                }else {
                    alert(res.data.msg);
                }
            }, res => {
                console.log("Get User Info Error");
            });
        },
        // 检查供应商是否通过审核
        checkSalerStatus(user, userID){
            this.$http.post(this.$store.state.url.url_prefix + 'LoginServletMine', {
                requestType: "checkSaler",
                userID: userID,
                workStatus: 100,
                checkState: 1
            }, {emulateJSON: true}).then(res => {
                if(res.data.status == 1){
                    // 跟新本地vuex状态
                    this.$store.commit('login', {
                        userName: user, 
                        userID: userID
                    });    // 登录， 修改IsLogin为 true

                    localStorage.setItem("user", this.$store.state.auth.user);
                    localStorage.setItem("userID", this.$store.state.auth.userID);
                    localStorage.setItem("checkState", 1);
                    
                    this.$router.push("/sales/preview");
                }else {
                    alert(res.data.msg);
                }
            }, res => {
                console.log("Check Admin Grant Error");
            });
        },
        // 查看煤矿方面的管理员是否被授权
        checkAdminStatus(user, userID){
            this.$http.post(this.$store.state.url.url_prefix + 'LoginServletMine', {
                requestType: "checkAdmin",
                userID: userID,
                workStatus: 100,
                checkState: 1
            }, {emulateJSON: true}).then(res => {
                console.log(res.data);
                if(res.data.status == 1){
                    // 跟新本地vuex状态
                    this.$store.commit('login', {
                        userName: user, 
                        userID: userID
                    });    // 登录， 修改IsLogin为 true

                    localStorage.setItem("user", this.$store.state.auth.user);
                    localStorage.setItem("userID", this.$store.state.auth.userID);
                    localStorage.setItem("checkState", 1);
                    
                    this.$router.push("/sales/preview");
                }else {
                    alert(res.data.msg);
                }
            }, res => {
                console.log("Check Saler Grant Error");
            });
        },
        // 查看用户属于供应商还是属于煤矿
        checkUserOrg(user, userID){

            this.$http.post(this.$store.state.url.url_prefix + 'LoginServletMine', {
                requestType: "check",
                userID: userID,
                workStatus: 100,
                checkState: 1
            }, {emulateJSON: true}).then(res => {
                if(res.data.status == 1){
                    console.log("组织ID: " + res.data.org);
                    // 访客 9407 煤矿 9410
                    if(res.data.org == 9407){
                        // 验证用户身份信息正确后开始验证是否已经通过审核
                        this.checkSalerStatus(user, userID);
                    }else if(res.data.org == 9410){
                        // alert("煤矿管理员用户暂不可登录！");
                        this.checkAdminStatus(user, userID);
                    }else{
                        // 管理员
                        localStorage.setItem("user", user);
                        localStorage.setItem("userID", userID);
                        localStorage.setItem("checkState", 1);
                        
                        this.$router.push("/sales/preview");
                    }
                }else {
                    alert(res.data.msg);
                }
            }, res => {
                console.log("Get Org Error");
            });
            
        }
    }
}
</script>
