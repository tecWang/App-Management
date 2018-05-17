<template>
    <div class="card" style="width: 18rem;" >
        <img class="card-img-top" :src="'http://192.168.1.113:8080/yong/' + cardData.image_Path"  alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title" style="margin-bottom: 0;">{{cardData.image_Name}}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" data-toggle="modal" data-target="#exampleModal">{{cardData.image_Target_Link}}</li>
            <!-- <input type="text" class="list-group-item" :value="cardData.image_Target_Link"> -->
        </ul>


        <!-- 模态框 -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">修改图片链接</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">填入新的链接:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="newLink">
                </div>
                </form>
            </div>
            <div class="modal-footer">
                <div id="stateBtn" class="alert alert-success invisible" role="alert" style="padding: .375rem .75rem; margin-bottom: 0; width: 100%; ">
                    修改成功
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" @click="sendCardMsg">确认修改</button>
            </div>
            </div>
        </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        data: Object
    },
    data(){
        return {
            cardData: this.data,
            newLink: ''
        }
    },
    methods: {
        sendCardMsg: function(){
            this.$http.post('http://192.168.1.113:8080/yong/ImageChangeServlet', {newLink: this.newLink}, {emulateJSON: true}).then(response=>{
                // console.log(response.data);
                let data = response.data;
                if(data.status == 1){
                    $('#stateBtn').addClass('visible');
                    $('#stateBtn').removeClass('invisible');
                    setTimeout(() => {
                        $('#exampleModal').modal('toggle');
                        this.cardData.image_Target_Link = this.newLink;
                    }, 500);
                }
            }, response=> {
                $('#stateBtn').addClass('visible');
                $('#stateBtn').removeClass('invisible');
                $('#stateBtn').addClass('alert-danger');
                $('#stateBtn').removeClass('alert-success');
                $('#stateBtn').html("修改失败！");
                console.log("Change image data error");
            });
        }
    }
}
</script>

