<template>
  <div class="mui-content">
    <div class="title">
      <h4>{{news.title}}</h4>
      <span>{{news.add_time | fmtTime('YYYY-MM-DD')}}</span>
      <span>{{news.click}}次浏览</span>
    </div>
    <div class="details" v-html="news.content"></div>

    <!-- 评论 -->
    <!-- 将来评论需要获取的artId 通过属性的方式传递,在评论页使用props:[;artId] 可以接收-->
    <comment :artId="id"></comment>
  </div>
</template>


<script>
import "../../../../statics/css/style.css";
//弹出框
// import { Toast } from 'mint-ui';
//需要引入的css样式,在home.vue已经引用

//引入评论子组件
import comment from '../../Common/comment.vue'

export default {
  data() {
    return {
      news: {},
    };
  },
  created: function() {
    this.getNewById();
  },
  props: ["id"],
  components:{
    comment
  },
  methods: {
    getNewById() {
      this.$http
        .get("getnew/" + this.id)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            if (response.data.message.length > 0) {
              this.news = response.data.message[0];
            }
          } else {
            Toast("请求数据失败");
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
.mui-content {
  background-color: #fff;
}
.title {
  padding: 10px 5px;
  border-bottom: 1px solid rgba(92, 92, 92, 0.1);
}
.title h4 {
  font-size: 16px;
  font-weight: bold;
  color: #0094ff;
}
.title span {
  color: rgba(92, 92, 92, 0.7);
  font-size: 12px;
}
.details {
  padding: 5px 5px;
  overflow: hidden;
}

</style>
