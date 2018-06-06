<template>
    <form>
        <!-- <h2 class="mb-3">访客注册</h2> -->
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="inputEmail4">账号</label>
                <input type="text" class="form-control" id="inputEmail4" 
                    v-model="upload.userAccount"
                    @blur="isUserNameRepeat">
                <span style="color: red;">{{NameRepeatValue}}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputPass1">密码</label>
                <input type="password" class="form-control" id="inputPass1" v-model.lazy="upload.userPass">
                
            </div>
            <div class="form-group col-md-6">
                <label for="inputPass2">密码确认</label>
                <input type="password" class="form-control" id="inputPass2" v-model.lazy="upload.userPassAgain">
                <span style="color: red;">{{passwordCheckValidate}}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputName1">中文名</label>
                <input type="text" class="form-control" id="inputName1" v-model="upload.userName">
            </div>
            <div class="form-group col-md-6">
                <label for="inputName2">用户简码</label>
                <input @blur="isSimpleNameRepeat" type="text" class="form-control" id="inputName2" v-model="upload.user_simpleName">
                <span style="color: red;">{{simpleNameRepeatValue}}</span>
            </div>
        </div>


        <div style="text-align: center;">
            <div class="btn btn-primary" @click="addUser">确定</div>
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
export default {
    name: 'sign',
    data(){
        return {
            NameRepeatValue: "",
            simpleNameRepeatValue: "",
            upload: {
                userAccount: "",
                userPass: "",
                userName: "",
                userPassAgain: "",
                user_simpleName: "",
            },
            password: {
                passwordFlag: false
            }
        }
    },
    computed: {
        passwordCheckValidate: function() {
            var errorText;
            if(this.upload.userPassAgain != this.upload.userPass){
                errorText = '两次密码不匹配'
            }else {
                errorText = ''
            }
            return errorText
        }
    },
    methods: {
        addUser(){
            // 检测是否所有项为空
            if( this.upload.userAccount == "" ||
                this.upload.userPass == "" ||
                this.upload.userPassAgain == "" ||
                this.upload.userName == "" ||
                this.upload.user_simpleName == ""){
                alert("所有列表项都需要填满");
                return ;
            }
            this.$http.post(this.$store.state.url.url_prefix + "SignServlet", {
                userAccount: this.upload.userAccount,
                userPass: this.upload.userPass,
                userName: this.upload.userName,
                user_simpleName: this.upload.user_simpleName,
                user_sex: 0,
                // user_organizeID: 1986329 // 科利来
                user_organizeID: 1987443    // 访客组织
            }, {emulateJSON: true}).then(res => {
                alert(res.data.msg);
                this.$router.push("/login");
            }, res => {
                console.log("error");
            });
        },
        isUserNameRepeat(){
            this.$http.post(this.$store.state.url.url_prefix + "RepeatServlet", {
                repeatName: "account",
                account: this.upload.userAccount
            }, {emulateJSON: true}).then(res => {
                if(res.data.status == 0){
                    this.NameRepeatValue = '重复'
                }else {
                    this.NameRepeatValue = ''
                }
            }, res => {
                console.log("error");
            });
        },
        isSimpleNameRepeat(){
            this.$http.post(this.$store.state.url.url_prefix + "RepeatServlet", {
                repeatName: "simpleName",
                simpleName: this.upload.user_simpleName
            }, {emulateJSON: true}).then(res => {
                if(res.data.status == 0){
                    this.simpleNameRepeatValue = '重复'
                }else {
                    this.simpleNameRepeatValue = ''
                }
            }, res => {
                console.log("error");
            });
        }
    }
}
</script>

