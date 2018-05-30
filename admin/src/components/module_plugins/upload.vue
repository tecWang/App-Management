<template>
    <!-- 本插件可以实现
        1. 文件/图片上传无页面跳转
        2. 上传后有回调函数可以拿到上传文件的信息
    -->
    <div>
        <form class="input-group mb-3" id="tecForm" target="nm_iframe"  :action="this.$store.state.url.url_prefix + 'UploadServlet'"  
            method="post" enctype="multipart/form-data">  
            <input type="text" name="fileType" v-model="fileRange" style="display:none;"> 
            <div class="custom-file">
                <input type="file" name="name" class="custom-file-input">  
                <label class="custom-file-label" for="inputGroupFile02">Choose file</label>  
            </div> 
            <div class="input-group-append">
                <input type="submit"> 
            </div>
        </form>
        <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe> 
    </div>
</template>

<script>
export default {
    name: 'upload',
    props: {
        range: String
    },
    data(){
        return {
            fileRange: this.range
        }
    },
    mounted(){
        $(document).ready(function() { 
            // bind 'myForm' and provide a simple callback function 
            $("#tecForm").submit(function(){   
                $(this).ajaxSubmit({   
                    target: '#id_iframe',
                    success:showResponse,    
                    dataType: 'json',  
                    error : function(xhr, status, err) {              
                        alert("操作失败");  
                    }  
                });   
                return false;   //防止表单自动提交  
            }); 
        }); 

        let vueEle = this;
        function showResponse(responseText, statusText, xhr, $form){  
            alert(responseText.msg);
            vueEle.$emit("uploadSuccess", responseText);
        }  
    }
}
</script>
