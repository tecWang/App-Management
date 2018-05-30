<template>
    <div class="tec">
        <div class="col-sm-6 col-12 mx-auto">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">账号</span>
                </div>
                <input v-model="username" type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
            </div>

            <div class="input-group mb-3">
                <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">密码</span>
                </div>
                <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon2">
            </div>

            <div style="text-align:center;">
                <button type="button" class="btn" @click="sendData">登录</button>
            </div>
        </div>
    </div>
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
                    this.$router.push("/images/preview");
                    console.log(this.$store.state);
                }
            }, response => {
                console.log("Error");
            });
        }
    }
}
</script>
