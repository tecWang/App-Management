<template>
    <div>
        <form  :action="this.$store.state.url.url_prefix + 'UploadServlet'"  
                method="post" enctype="multipart/form-data">  
                <input type="submit" name="name"> <input type="file" name="file1">  
        </form>
    </div>
</template>

<script>
export default {
    name: 'Image_Add'
}
</script>

