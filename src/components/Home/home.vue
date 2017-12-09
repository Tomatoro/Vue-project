<template>
  <div class="mui-content">
    <h1>Home</h1>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in images" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news">
		                    <span class="icon-news "></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/share">
		                    <span class="icon-share "></span>
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/buy">
		                    <span class="icon-buy "></span>
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/feedback">
		                    <span class="icon-feedback "></span>
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/video">
		                    <span class="icon-video "></span>
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/contact">
		                    <span class="icon-contact "></span>
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		        </ul>
            <router-view></router-view>
  </div>
</template>


<script>
import Vue from "vue";
// 按需引入部分组件
import { Swipe, SwipeItem } from "mint-ui";
import "mint-ui/lib/style.css";

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
  data() {
    return {
      images: [],
      menus: []
    };
  },
  created() {
    this.getlunbo();
  },
  methods: {
    //获取轮播图
    getlunbo() {
      this.$http
        .get("getlunbo")
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
};
</script>

<style scoped>
.mui-content,
.mui-table-view {
  background-color: #fff;
}

/* 轮播图 */
.mint-swipe {
  width: 100%;
  height: 250px;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}

/* 九宫格 */
span {
  display: block;
  width: 100%;
  height: 50px;
}
.icon-news {
  background: url(../../../statics/images/menu1.png) no-repeat center;
  background-size: contain;
}
.icon-share {
  background: url(../../../statics/images/menu2.png) no-repeat center;
  background-size: contain;
}
.icon-buy {
  background: url(../../../statics/images/menu3.png) no-repeat center;
  background-size: contain;
}
.icon-feedback {
  background: url(../../../statics/images/menu4.png) no-repeat center;
  background-size: contain;
}
.icon-video {
  background: url(../../../statics/images/menu5.png) no-repeat center;
  background-size: contain;
}
.icon-contact {
  background: url(../../../statics/images/menu6.png) no-repeat center;
  background-size: contain;
}
</style>

