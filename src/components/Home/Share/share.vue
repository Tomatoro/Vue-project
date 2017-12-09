<template>
<div class="mui-content">

	<div class="share">
		<div class="category">
			<ul ref="cul">
				<li>
					<a @click="getImages(0)">全部</a>	
				</li>
				<li v-for="item in category" :key="item.id">
					<a @click="getImages(item.id)">{{item.title}}</a>
				</li>
			</ul>
		</div>
		<div class="imglist">
			<ul>
          <li v-for="(item,index) in images" :key="index">
              <router-link v-bind='{to:"/share/"+item.id}'>
                  <img :src="item.img_url">
              </router-link>
              <p>
                  <span class="title" v-text="item.title"></span><br />
                  {{item.zhaiyao}}
              </p>
          </li>
      </ul>
		</div>
	</div>
</div>
</template>

<script>

    export default {
        data() {
            return {
                category: [],
                images: [],
            }
        },
        props:["id"],
        created: function() {
            this.getImgCategory();
            this.getImages(0);
        },
        methods:{
          getImgCategory(){
            this.$http
              .get('getimgcategory')
              .then((response)=>{
                if(response.status === 200 && response.data.status == 0){
                  this.category = response.data.message
                }
              })
          },
          getImages(cid){
            this.$http
              .get("getimages/"+cid)
              .then((response) => {
                if(response.status === 200 && response.data.status === 0){
                  this.images = response.data.message
                }else{
                  alert("请求数据失败")
                }
              })
              .catch((err) => {
                console.error(err)
              })
          }
        }

    }
</script>

<style scoped>
    /*懒加载图片样式begin*/
    
    .imglist p {
        color: #fff;
        position: absolute;
        bottom: 0px;
        left: 0px;
        background-color: rgba(0, 0, 0, 0.4);
    }
    
    .imglist .title {
        font-weight: bold;
    }
    
    .imglist ul {
        padding: 0;
    }
    
    .imglist li {
        list-style: none;
        position: relative;
    }
    
    .imglist img {
        width: 100%;
        height: 300px;
    }
    /*image[lazy=loading] {
        width: 100%;
        height: 300px;
        margin: auto;
    }*/
    /*懒加载图片样式end*/
    
    .category {
        /* width: 1000px; */
        overflow-x: auto;
        overflow-y: scroll;
    }
    
    .category ul {
      width: 800px;
        margin: 0px;
        padding: 0px;
    }
    
    .category>ul>li {
        list-style: none;
        display: inline-block;
        padding: 20px 5px;
    }
    
    .category li>a {
        color: #0094ff;
        font-size: 14px;
        cursor: pointer;
    }
    
    .share {
        margin-bottom: 50px;
    }
</style>