<template>
	<div class="mui-content">
		<div v-for="(item, index) in shopCarList" :key="item.id" class="row">
			<div class="left">
				<mt-switch v-model="values[index]"></mt-switch>
			</div>
			<div class="center">
				<img width="75" height="75" :src="item.thumb_path" alt="">
			</div>
			<div class="right">
				<h4>
					{{ item.title }}
				</h4>
				<span>￥{{ item.sell_price }}</span>
        <!-- 在number组件上绑定一个num属性,使得number组件可以获得购买的数据 -->
				<number @numberChange='numberchange' :num="item.count" :id="item.id"></number>
				<a @click="delShopCarList(item.id)">删除</a>
			</div>
		</div>

		<div class="total">
			<div class="left">
				<h4>总计(不含运费):</h4>
				<span>已经选择商品 {{count}} 件，共计￥{{price}}元</span>
			</div>
			<div class="right">
				<button  class="mui-btn mui-btn-danger">去结算</button>
			</div>
		</div>
      <!-- {{values}} -->
	</div>
</template>

<script>
  //导入number组件
  import number from '../Common/number.vue'

  //导入获取本地存储数据的插件
  import {getLocalData,updateLocalData,deleteLocalData} from '../../config/localstorage'

  //引入通信用的模块 用来实时更新小红点
  import bus from './../../config/bus'

  export default {
    data(){
      return{
        shopCarList:[],
        values:[],
        price:0,
        count:0
      }
    },
    created(){
      this.getShopCarList()
    },
    components:{
      number
    },
    watch:{
      //计算总价
      shopCarList:function(){
        let count = 0
        let price = 0
        this.values.forEach((item,index)=>{
          if(item){
            count += this.shopCarList[index].count
            price += this.shopCarList[index].count * this.shopCarList[index].sell_price
          }
        })
        this.price = price
        // return count //计算属性输出的值
        this.count = count
        // alert(this.count)
      },
      values:function(){
        let count = 0
        let price = 0
        this.values.forEach((item,index)=>{
          if(item){
            count += this.shopCarList[index].count
            price += this.shopCarList[index].count * this.shopCarList[index].sell_price
          }
        })
        this.price = price
        this.count = count
      }
    },
    methods:{
      //获取购物车的数据
      getShopCarList(){
        //通过本地存储的数据获取商品的id数组
        let ids = []
        let localdata = getLocalData()
        //如果没有数据 便不发送请求
        if(localdata.length == 0){
          return
        }
        localdata.forEach(item =>{
            ids.push(item.id)
            //初始化mt-switch需要绑定的数组
            this.values.push(false)
        })
        console.log(ids)
        this.axios
          .get('goods/getshopcarlist/' + ids.join(','))
          .then(response=>{
            if(response.status === 200 && response.data.status === 0){
              this.shopCarList = response.data.message
              console.log(this.shopCarList)
         //将local中的count属性绑定在shopCarList中 以后需要使用它来展示在number组件上
          //先将shopCarList和localdata数组进行排序,使得id一一对应
              localdata.sort(function(item1,item2){
                return item1.id > item2.id
              })
              this.shopCarList.sort(function(item1,item2){
                return item1.id>item2.id
              })
              localdata.forEach((item,index)=>{
                this.shopCarList[index].count = item.count
              })
            }else{
              console.log('服务器请求出错')
            }
          })
          .catch(err=>{
            console.error(err)
          })
      },
      //数字改变的时候 小红点也跟着变 本地存储页更新
      numberchange(obj){
        //更新本地存储
        let num = obj.type == 'add'? 1 : -1
        updateLocalData({id:obj.id,num:num})
        //更新小红点
        bus.$emit('updateBadge2')
        //更新shopcarlist中的数据
        let localdata = getLocalData()
        localdata.sort(function(item1,item2){
          return item1.id > item2.id
        })
        this.shopCarList.sort(function(item1,item2){
          return item1.id>item2.id
        })
        localdata.forEach((item,index)=>{
          this.shopCarList[index].count = item.count
        })
        //当选中的时候,点击加减,更新总价
      },
      //删除
      delShopCarList(id){
        // 1 删除本地存储中的数据
        // 2 删除shopcarlist中对应的数据
        // 3 删除values对应的数据
        // 4 更新小红点
        deleteLocalData(id)
        let index = this.shopCarList.findIndex((item)=>{
          return item.id == id
        })
        this.shopCarList.splice(index,1)
        this.values.splice(index,1)
        bus.$emit('updateBadge2')
      }
    }

  }
</script>


<style scoped>
.mui-bar-tab ~ .mui-content {
  padding-bottom: 0;
  background-color: #fff;
}
.total {
  display: flex;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: rgba(92, 92, 92, 0.2);
  justify-content: space-between;
  height: 70px;
}

.total h4 {
  font-weight: bold;
  font-family: '微软雅黑';
}

.total span {
  margin-top: 10px;
  font-size: 14px;
}

.total .right {
  margin-top: 8px;
}

.row {
  display: flex;
  border-bottom: 1px solid rgba(1, 1, 1, 0.3);
  padding: 10px 5px;
}

.row .left {
  /*flex: 0, 0, auto;*/
  padding-top: 20px;
}

.row .center {
  /*flex: 0, 0, auto;*/
  margin-left: 5px;
}

.row .right {
  /*flex: 1;*/
  margin-left: 5px;
}

.row .right h4 {
  color: #0094ff;
  font-size: 16px;
  padding: 5px 0px;
}

.row .right .num {
  display: inline-block;
  margin-left: 5px;
}

.row .right span {
  color: red;
  font-size: 20px;
}

.row .right a {
  color: gray;
  font-size: 14px;
  margin-left: 5px;
}
</style>