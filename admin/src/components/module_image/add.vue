<template>
    <tec-upload :range="'image'"></tec-upload>
</template>

<script>
import upload from "../module_plugins/upload.vue"
export default {
    name: 'Image_Add',
    components: {
        "tec-upload": upload
    }
}
</script>

