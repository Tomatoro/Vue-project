<template>
  <div class="container">
		<header class="mui-bar mui-bar-nav">
			<a v-if="isShow" @click="goBack" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">{{msg}}</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
        <router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
      <router-link to="/member" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/shopcar" class="mui-tab-item">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">{{ num }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    <router-view></router-view>
  </div>

</template>


<script>
	//引入组件通信的模块
	import bus from './config/bus'

  export default {
    data(){
      return{
				isShow:false,
				msg:'Hello Vue',
				num:0
      }
		},
		created(){
			//当页面刷新的时候,因为路由地址没有发生变化,不会执行watch,所以要在组件构建完成后,
			//判断是否显示后退按钮
			this.judgeBack(this.$route.path)
			//$route 是路由规则 有当前路由的path 和 params
			//$router 是路由对象 有很多路由的方法
			console.log(this.$router)
			console.log(this.$route)

			//$on是放在B组件中的监听事件
			//第一个参数是要监听的事件名称
			//第二个参数是监听事件触发后的函数,其中的参数是触发事件传递过来的值
			// let thiss = this
			bus.$on('updateBadge',function(count){
				console.log(count)
				this.num = count
			}.bind(this))
		},
		watch:{
			//监听$router 当里面的值发生变化的时候,获取它的value,进行相应操作
			$route:function(value){
				this.judgeBack(value.path)
			}
		},
		methods:{
			goBack(){
				this.$router.back()
			},
			judgeBack(path){
				let arr = ['/home','/member','/shopcar','/search','/']
				if(arr.indexOf(path) == -1){
					this.isShow = true
				}else{
					this.isShow = false
				}
			}
		}
  }
</script>

<style scoped>
	
</style>


