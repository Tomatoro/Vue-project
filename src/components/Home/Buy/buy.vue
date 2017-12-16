<template>
    <div ref="muicontent" class="mui-content">
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="statusChange">
            <ul class="mui-table-view mui-grid-view">
                <li  class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in goodsList" :key="index">
                    <router-link :to="{path:'/buy/' + item.id}">
                        <img class="mui-media-object" v-lazy="item.img_url">
                        <div class="mui-media-body">{{item.title}}</div>
                    </router-link>
                    <div class="bottom">
                        <h6>
                            <span>￥{{item.sell_price}}</span>
                            <s>￥{{item.market_price}}</s>
                        </h6>
                        <div class="sell">
                            <span>热卖中</span>
                            <span>剩余{{item.stock_quantity}}件</span>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-loadmore>
    </div>
        
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      goodsList: [],
      //默认数据未加载完毕
      allLoaded: false
    };
  },
  created() {
    this.getGoodsList();
  },
  mounted() {
    let height = document.documentElement.clientHeight;
    this.$refs.muicontent.style.height = height + "px";
  },
  methods: {
    getGoodsList() {
      this.axios
        .get("getgoods?pageindex=" + this.pageindex)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            if(response.data.message.length == 0){
                  console.log(this.goodsList);
                  this.allLoaded = true
              }
            this.goodsList = this.goodsList.concat(response.data.message);
            // 这是因为在加载数据后需要对组件进行一些重新定位的操作。
            this.$refs.loadmore.onBottomLoaded();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    loadBottom() {
            // 加载更多数据
        console.log(1)
        this.pageindex++
        this.getGoodsList()
    },
    // 测试 loadmore组件的三种状态
    statusChange(status) {
        console.log(status);
    }
  }
};
</script>

<style scoped>

.mint-loadmore {
    padding-bottom: 50px;
}
.mui-table-view:before {
  display: none;
}

.mui-table-view:after {
  display: none;
}


.mui-content > .mui-table-view:first-child {
  margin-top: 0px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell {
  margin-right: 0px;
  padding: 0px;
}

.mui-table-view.mui-grid-view {
  padding: 5px;
}

.mui-table-view-cell {
  border: 1px solid rgba(92, 92, 92, 0.5);
  box-shadow: 0 0 4px #666;
  padding: 4px;
  margin-top: 5px;
  margin-left: 5px;
  width: 48%;
}

.mui-table-view-cell img {
  width: 100%;
}

.mui-table-view-cell:after {
  display: none;
}

.mui-table-view-cell > a {
  margin: 0;
}

.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
  margin: 0;
  margin-bottom: 5px;
  text-align: left;
  color: #000;
}

.bottom {
  text-align: left;
  background-color: rgba(92, 92, 92, 0.1);
  padding: 5px;
}

.bottom > h6 > span {
  color: red;
  font-size: 14px;
  margin-right: 20px;
}

.bottom > .sell {
  margin-top: 15px;
  color: rgba(92, 92, 92, 0.8);
  font-size: 13px;
  display: flex;
  justify-content: space-between;
}
</style>
