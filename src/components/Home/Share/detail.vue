<template>
  <div class="mui-content">
        <div class="title">
            <h4>{{imageMsg.title}}</h4>
            <span>{{imageMsg.add_time | fmtTime('YYYY-MM-DD HH:mm:ss')}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>{{imageMsg.click}}次点击</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in thumImages" :key="index">
              <a href="javascript:;">
                   <img v-lazy="item.src" alt="缩略图">
              </a>
            </li>
        </ul> 

        <p class="content" v-html="imageMsg.content"></p>

        <!-- 评论-->
        <comment :artId="id"></comment>
    </div>
</template>

<script>

//评论
import comment from '../../Common/comment.vue'

export default {
  data() {
    return {
      imageMsg: {},
      thumImages: []
    };
  },
  props: ["id"],
  created() {
    this.getImageInfo();
    this.getThumImages();
  },
  components:{
    comment
  },
  methods: {
    getImageInfo() {
      this.axios
        .get("getimageInfo/" + this.id)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            if (response.data.message.length > 0) {
              this.imageMsg = response.data.message[0];
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getThumImages() {
      this.axios
        .get("getthumimages/" + this.id)
        .then(response => {
          if (response.status === 200 && response.data.status === 0) {
            this.thumImages = response.data.message;
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
  margin: 15px 5px;
}

.title h4 {
  color: dodgerblue;
}

.title span {
  font-size: 13px;
  color: rgba(92, 92, 92, 0.6);
}
/*9宫格样式*/

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-left: 0px;
}

.mui-table-view-cell img {
  height: 100px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0px;
  border-bottom: 0px;
  padding: 0;
  margin: 0;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell > a:not(.mui-btn) {
  padding: 0;
}
</style>
