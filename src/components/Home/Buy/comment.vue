<template>
  <div class="mui-content">
    <comment :artId="id"></comment>
  </div>
</template>

<script>
  import comment from '../../Common/comment.vue'

  export default {
    props:['id'],
    components:{
      comment
    }
  }
</script>

<style scoped>

</style>
