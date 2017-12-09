<template>
  <div class="mui-content">
    <div class="title">
      <h4>{{news.title}}</h4>
      <span>{{news.add_time | fmtTime('YYYY-MM-DD')}}</span>
      <span>{{news.click}}次浏览</span>
    </div>
    <div class="details" v-html="news.content"></div>


    <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea placeholder="请输入评论内容" v-model="cmtContent"></textarea>
            <button class="mui-btn mui-btn-primary" @click.prevent="postComments">发表</button>
        </div>
            
        <div class="title">
            <h4>评论列表</h4>
        </div>    
        
        <!--评论列表-->
        
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
            <button class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
        </div>
    </div>
  </div>
</template>


<script>
import "../../../../statics/css/style.css";

export default {
  data() {
    return {
      news: {},
      comments:[],
      cmtContent:''
    };
  },
  created: function() {
    this.getNewById();
    this.getComments();
  },
  props: ["id"],
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
            alert("请求数据失败");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getComments(){
      this.$http
        .get("getcomments/"+this.id+"?pageindex=1")
        .then((response) => {
          if(response.status === 200 && response.data.status === 0){
            this.comments = response.data.message
          }else{
            alert("请求数据失败")
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    postComments(){
      if(this.cmtContent == ''){
        return alert('内容不能为空')
      }
      console.log(this.cmtContent)
      this.$http
        .post("postcomment/"+this.id,"content="+this.cmtContent)
        .then((response)=>{
          if(response.status === 200 && response.data.status ===0 ){
            console.log(response)
            this.cmtContent= ''
            this.getComments();
          }
        })
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
