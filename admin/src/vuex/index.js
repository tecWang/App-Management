import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 全局变量
    state: {
        auth: {
            IsLogin: true,
            user: "王佳文",
            userID: "1986628"
        },
        url: {
            url_prefix: "http://192.168.1.113:8080/yong/"
        }
    },
    // 修改全局变量必须通过mutations中的方法
    // mutations只能采用同步方法
    mutations: {
        login(state, obj) {
            console.log(obj.userName + "   " + obj.userID);
            state.auth.IsLogin = true;
            state.auth.user = obj.userName;
            state.auth.userID = obj.userID;
        },
        logout(state) {
            state.auth.IsLogin = false;
            state.auth.user = undefined;
            state.auth.userID = undefined;
        }
    },
    // 异步方法用actions
    // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
    actions: {
        
    }
})

export default store