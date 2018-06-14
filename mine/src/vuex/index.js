import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 全局变量
    state: {
        auth: {
            showNav: false,     // 是否显示nav
            checkState: -1,     // 是否通过审核
            role: undefined,
            user: undefined,
            userID: undefined,

            orgID: '9407'       // 访客组织ID, 写死的, 一般不更改
        },
        url: {
            url_prefix: "http://192.168.1.113:8080/admin/"       // 开发环境地址
        }
    },
    // 修改全局变量必须通过mutations中的方法
    // mutations只能采用同步方法
    mutations: {
        login(state, obj) {
            state.auth.showNav = true;
            state.auth.checkState = 1;
            state.auth.user = obj.userName;
            state.auth.userID = obj.userID;
            state.auth.role = obj.role;
        },
        logout(state) {
            state.auth.showNav = false;
            state.auth.checkState = -1;
            state.auth.user = undefined;
            state.auth.userID = undefined;
            state.auth.role = undefined;
        }
    }
})

export default store