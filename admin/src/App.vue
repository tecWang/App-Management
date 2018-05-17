<template>
  <div id="app" class="container-fluid">
    <tec-title></tec-title>
    <tec-split></tec-split>
    <router-view/>
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import Split from "./components/split.vue"

export default {
  name: 'App',
  components: {
    "tec-title": Title,
    "tec-split": Split
  }
}
</script>

<style>
  .visible {
    visibility: visible;
  }
  .invisible {
    visibility: hidden;
  }
</style>

