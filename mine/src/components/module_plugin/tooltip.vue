<template>
    <div>{{msg}}</div>
</template>

<script>
export default {
    name: 'tooltip',
    props: {
        propMsg: String
    },
    data(){
        msg: ""
    },
    beforeMount(){
        this.msg = this.propMsg;
    }
}
</script>