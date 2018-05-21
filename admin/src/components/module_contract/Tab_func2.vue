<template>
    <div class="row">
        <div class="col-2">
            <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="list-image-list" data-toggle="list" href="#list-image" role="tab" aria-controls="home">合同预览</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">合同录入</a>
            </div>
        </div>
        <div class="col-10">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="list-image" role="tabpanel" aria-labelledby="list-home-list">
                    <div class="accordion">
                        <div v-for="card in cards" :key="card.contract_ID">
                            <tec-contract :conData="card"></tec-contract>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                    合同号<input type="text" name="c_id" v-model="c_id"> <br>
                    合同名称<input type="text" name="c_name" v-model="c_name"><br>
                    合同开始时间<input type="text" name="c_bdate" v-model="c_bdate"><br>
                    合同结束时间<input type="text" name="c_edate" v-model="c_edate"><br>
                    合同甲方<input type="text" name="c_a" v-model="c_a"><br>
                    合同乙方<input type="text" name="c_b" v-model="c_b"><br>
                    合同价格<input type="text" name="c_val" v-model="c_val"><br>
                    <button @click="insertContract">插入</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Con_card from "./con_card.vue";
import config from "../../assets/config.js";

export default {
    name: 'Tab_func2',
    components: {
        "tec-contract": Con_card
    },
    data: function(){
        return {
            cards: [],
            url_prefix: config.url_prefix,
            c_id: "",
            c_name: "",
            c_bdate: "",
            c_edate: "",
            c_a: "",
            c_b: "",
            c_val: ""
        }
    },
    mounted: function(){
        this.$http.get(this.url_prefix + "ContractServlet").then(response => {
             this.cards = response.data.data;
             console.log(this.cards);
        }, response => {
            console.log("error");
        });
    },
    methods: {
        insertContract(){
            this.$http.post(this.url_prefix + "ContractServlet", {
                changeType: "insert",
                c_id: this.c_id,
                c_name: this.c_name,
                c_bdate: this.c_bdate,
                c_edate: this.c_edate,
                c_a: this.c_a,
                c_b: this.c_b,
                c_val: this.c_val
            }, {emulateJSON: true}).then(response => {
                console.log("success");
            }, response => {
                alert(插入失败);
            });
        }
    }
}
</script>
