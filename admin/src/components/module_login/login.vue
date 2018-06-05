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
            <div class="btn btn-primary" @click="sendData">登陆</div>
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
        sendData(){
            this.$http.post(this.$store.state.url.url_prefix + 'LoginServlet', {
                userName: this.username,
                userPass: this.password
            }, {emulateJSON: true}).then(response => {
                if(response.data.status == 1){
                    this.$store.commit('login', {
                        userName: response.data.name, 
                        userID: response.data.userID
                    });    // 登录， 修改IsLogin为 true
                    this.$router.push("/contracts/preview");
                    console.log(this.$store.state);
                }else {
                    alert(response.data.data);
                }
            }, response => {
                console.log("Error");
            });
        }
    }
}
</script>
