<template>
  <div class="mui-content">
    <div class="info">
      <div class="title">
        <h3></h3>
        <span>
          次浏览
        </span>
      </div>
      <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!-- <img class="preview-img" v-for="(item, index) in list" :key="index" :src="item.src" height="100" @click="$preview.open(index, list)"> -->
            </li>   
      </ul>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.title {
  height: 100%;
  border-bottom: 2px solid rgba(92, 92, 92, 0.1);
  padding: 10px 5px;
}

.title h3 {
  font-size: 16px;
  font-weight: bold;
  color: #0094ff;
}
.title span {
  font-size: 12px;
  color: rgba(92, 92, 92, 0.6);
}
.content {
  padding: 5px 5px;
  width: 100%;
  font-size: 14px;
  color: #8f8f94;
}
.info {
  margin-bottom: 50px;
}

/*九宫格样式*/
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border-top: 0px;
  border-left: 0px;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border-right: 0px;
  border-bottom: 0px;
  padding: 0px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell > a:not(.mui-btn) {
  padding: 5px;
}
</style>