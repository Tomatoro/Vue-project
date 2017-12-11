<template>
    <div class="mui-content">
        <div class="detail">
            <swiper :lunboUrl="lunbo"></swiper>
        </div>
        <div class="sell">
            <h4>{{goodsMsg.title}}</h4>
            <div class="price">
                市场价：<s>{{goodsMsg.market_price}}</s> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 销售价：<span>{{goodsMsg.sell_price}}</span>
            </div>
            <div class="num">
                购买数量：<number @numberChange='numberchange' :stock="goodsMsg.stock_quantity"></number>
                <div class="ball"></div>
            </div>
            <div class="button">
                <button class="mui-btn mui-btn-primary">立刻购买</button>
                <button class="mui-btn mui-btn-danger" @click="addShopCar">加入购物车</button>
            </div>
        </div>

        <div class="param">
            <h5>商品参数</h5>
            <div class="info">
                <p>商品编号：{{goodsMsg.goods_no}}</p>
                <p>库存情况：{{goodsMsg.stock_quantity}}件</p>
                <p>上架时间：{{goodsMsg.add_time | fmtTime("YYYY-MM-DD HH:mm:ss")}}</p>
            </div>
        </div>
        
        <div class="footer">
            <a class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</a>
            <a class="mui-btn mui-btn-danger mui-btn-outlined" @click="push">商品评论</a>
        </div>
    </div>
</template>

<script>
//引入轮播图的组件
import swiper from "../../Common/swiper.vue";
//引入数字加减组件
import number from "../../Common/number.vue";
//引入通信用的模块
import bus from "../../../config/bus";

//导出组件
export default {
  data() {
    return {
      lunbo: "getthumimages/" + this.id,
      goodsMsg: {},
      count: 1
    };
  },
  props: ["id"],
  components: {
    swiper,
    number
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      this.axios
        .get("goods/getinfo/" + this.id)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            if (response.data.message.length > 0) {
              this.goodsMsg = response.data.message[0];
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    push() {
      // 点击商品评论，跳转到评论组件
      let thiss = this
      this.$router.push({ name: "buyComment", params: { id: thiss.id } });
    },
    //在引入的number组件中又对numberChange的监听
    //这里的@numberChange就是订阅者,会接收到number组件中传递的参数--count
    //这样,就实现了子组件给父组件的传值
    numberchange(count) {
      console.log(count);
      this.count = count;
    },
    //在点击添加购物车的时候要将count的值传给home.vue里的小红点中
    //此时,detail.vue与home.vue是属于非父子组件的关系
    //所以这里用到了$emit 与 $on 通信
    //在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：
    addShopCar() {
      //与上一个事件触发器相同
      //第一个参数自定义一个事件名,通过次事件名来决定触发的事件
      //第二个参数以后,是此事件被触发后传递的值
      bus.$emit("updateBadge", this.count);
    }
  }
};
</script>

<style scoped>
.num {
  position: relative;
}

.ball {
  left: 115px;
  top: 3px;
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: red;
  transition: all 0.5s linear;
  z-index: 1000;
  display: none;
}

.mui-content {
  background-color: #fff;
}

.top,
.sell,
.param,
.footer {
  border: 1px solid rgba(92, 92, 92, 0.7);
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
}

.sell h4 {
  color: dodgerblue;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(92, 92, 92, 0.5);
}

.price,
.num,
.button {
  margin: 10px;
  font-size: 15px;
}

.price span {
  font-size: 18px;
  color: red;
}

.param h5 {
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(92, 92, 92, 0.5);
}

.info {
  margin-top: 10px;
  margin-left: 20px;
}

.info p {
  margin: 0;
}

.footer .mui-btn {
  width: 100%;
}

.footer .mui-btn-danger {
  margin-top: 10px;
}
</style>
