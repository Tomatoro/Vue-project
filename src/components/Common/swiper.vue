<template>
  <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in images" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
  export default {
    data(){
      return{
        images: []
      }
    },
    props:['lunboUrl'],
    created(){
      this.getlunbo()
    },
    methods: {
    //获取轮播图
    getlunbo() {
      this.$http
        .get(this.lunboUrl)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            this.images = response.data.message;
          } else {
            alert("请求数据出错");
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  }
</script>

<style scoped>
  .mint-swipe {
    width: 100%;
    height: 250px;
  }
  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
</style>
