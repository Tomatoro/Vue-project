<template>
  <div class="mui-content">
    <h1>News</h1>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in messageArr" :key="index">
					<router-link :to="{ path: '/news/'+ item.id}" append>
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body mui-ellipsis">
							{{item.title}}
							<p class='mui-ellipsis'>发表时间{{item.add_time|fmtTime('YYYY-MM-DD')}}</p>
							<span>点击数{{item.click}}</span>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>


<script>


export default {
  data() {
    return {
      messageArr:[]
    };
  },
  created: function() {
    this.getNewsList();
  },
  // filters:{
  //   strTime:function(value){
  //     value = new Date(value)
  //     var year = value.getFullYear()
  //     var month = value.getMonth()+1
  //     var day = value.getDate()
  //     var hours = value.getHours()
  //     var minute = value.getMinutes()
  //     var second = value.getSeconds()
  //     return year+"年"+month+"月"+day+"日"+hours+"时"+minute+"分"+second+"秒"
  //   }
  // },
  methods: {
    getNewsList(){
      this.$http
        .get('getnewslist')
        .then((response)=>{
          if(response.status === 200 && response.data.status === 0){
            this.messageArr = response.data.message
            console.log(this.messageArr)
          } else {
            alert('请求数据出错')
          }
        })
        .catch((err)=>{
          console.error(err)
        })
    }
  }
};
</script>

<style scoped>
  li p {
    font-size: 12px;
    color: blueviolet;
    float: left;
  }
  li span {
    font-size: 12px;
    color: skyblue;
    float: right;
  }
</style>
