<template>
   <div class="comment">
      <h4>提交评论</h4>

      <div class="submitcomment">
          <textarea placeholder="请输入评论内容" v-model="cmtContent" @keyup.13="postComments"></textarea>
          <button class="mui-btn mui-btn-primary" @click.prevent="postComments">发表</button>
      </div>
          
      <div class="title">
          <h4>评论列表</h4>
      </div>    

      <div class="item" v-for="(item,index) in comments ":key="index">
          <div class="content">评论内容</div>
          <div>
              <span class="user">{{item.user_name}}</span> 
              <span>{{item.add_time | fmtTime('YYYY-MM-DD HH:mm:ss')}}</span>
          </div>
          <div>
              <p>{{item.content}}</p>
          </div>
      </div>

      <div class="more">
          <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="getMore" >加载更多</button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      cmtContent: "",
      pageindex: 1
    };
  },
  created() {
    this.getComments();
  },
  props:['artId'],
  methods: {
    getComments() {
      this.$http
        .get("getcomments/" + this.artId + "?pageindex=" + this.pageindex)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            this.comments = this.comments.concat(response.data.message);
          } else {
            this.$toast("请求数据失败");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    postComments() {
      // this.pageindex = 1
      if (this.cmtContent.trim() == "") {
        return this.$toast("内容不能为空");
      }
      console.log(this.cmtContent);
      this.$http
        .post("postcomment/" + this.artId, "content=" + this.cmtContent)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            console.log(response);
            this.comments.unshift({
              user_name: "匿名用户",
              add_time: new Date(),
              content: this.cmtContent
            });
            // this.getComments();
            this.cmtContent = "";
          }
          this.$toast(response.data.message);
        });
    },
    getMore() {
      this.pageindex++;
      this.getComments();
    }
  }
};
</script>

<style scoped>
  /*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    
    .submitcomment button {
        width: 96%;
    }
    
    .comment .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>
