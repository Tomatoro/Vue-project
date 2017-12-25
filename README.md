## Vue项目

### vue-router地址

https://router.vuejs.org/zh-cn/

### 为移动端页面设置meta标签

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

### 搭建好底部导航

- 路由配置

//配置路由
let router = new vueRouter({

```
//点击router-link时候，添加的激活样式
linkActiveClass: 'mui-active',
routes: [
	//路由跳转 访问/ 是跳转到#/home
	{name: 'Root', path: '/', redirect: '/home'},
	{name: 'Home', path: '/home', component: Home},
	{name: 'Member', path: '/member', component: Member},
	{name: 'Shopcar', path: '/shopcar', component: Shopcar},
	{name: 'Search', path: '/search', component: Search}
]
```

});

- 配置不同路由的页面标题

//设置不同路由的标题
router.afterEach((to, from) => {
  document.title = to.name;
})

- 设置tabbar的按钮激活

let router = new vueRouter({

```
//点击router-link时候，添加的激活样式
linkActiveClass: 'mui-active',
…………
```

### Home页

- 9宫格 mui
- 9宫格 动态获取数据
- 轮播图  mint
- 把轮播图封装成组件

### 新闻资讯

- 两边对其

```css
.container {
	display: flex;
	justify-content: space-between;
}
```

http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

- 新闻列表超出后显示省略号

```css
.mui-media-body{
  overflow: hidden; 
  text-overflow:ellipsis; 
  white-space: nowrap;
}
```

- 日期格式化模块


- 官网

http://momentjs.cn/

- 下载

cnpm install moment --save  

- 使用
  import moment from 'moment'
  //全局过滤器
  Vue.filter('fmtdate', function(input, format) {
  return moment(input).format(format);
  });

//使用过滤器
{{item.add_time | fmtdate('YYYY-MM-DD}}

### 加载提示 mint中的组件

```javascript
import { Indicator } from 'mint-ui';
//import 'mint-ui/lib/style.css'
Indicator.open('加载中...');
Indicator.close();
```

### 新闻详细页面

- 搭建布局
- 设置路由，设置路由参数

```html
<router-link v-bind:to="{name: 'newsDetail', params: {id: item.id}}"></router-link>
```

- 获取路由参数
  ​

- 评论

  ```javascript
  import { Toast } from 'mint-ui';
  Toast('Upload Complete');
  ```

  ​


- 设置评论子组件
- 获取评论列表
- 发表评论
- 加载更多

### 图片分享

- 搭建页面布局
- 设置路由
- 动态获取数据
- 操作dom


- 标签上设置ref

<ul ref='cateUL'>

- 通过$refs获取元素

this.$refs.cul.style.width = 65 * (response.body.message.length + 1) + 'px';

### 图片分享详细页面

- 搭建页面布局
- 设置路由
- 动态获取数据
- 9宫格展示图片
- 加载评论组件
- 图片预览插件

https://github.com/LS1231/vue-preview

### 商品购买

- 搭建页面布局

- 设置路由

- 动态获取数据

- 上拉更新

  ```html
  <mt-loadmore style="margin-bottom: 50px"  :autoFill="autoFill" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="change" ref="loadmore">
    	<ul>
      	……  
    	</ul>
  </mt-loadmore>
  ```

  ```js
  //当上拉更新的时候执行的方法
  loadBottom() {
    this.pageindex ++;
    console.log('调用了' + this.pageindex);
    this.getgoodslist();
  },
  //@bottom-status-change 状态改变的事件
    change: function (stat) {
      console.log(stat);
    }

  // 当获取到数据之后
  // 如果没有数据了，则设置bottom-all-loaded为true，所有数据加载完毕
  if (response.data.message.length === 0) {
    this.allLoaded = true;
  }
  // 如果上拉更新，调用
  if (this.pageindex > 1) {
    this.$refs.loadmore.onBottomLoaded();
    // loadmore组件，调用onBottomLoaded 加载完毕，回归原位
    //this.$refs.loadmore
  }
  ```

  ​

- 跳转到商品详情
  <router-link v-bind='{to: "/buy/" + item.id}'></router-link>

### 商品详情

- 搭建页面布局
- 设置路由
- 轮播图
- 图文介绍、商品评论
- 实现购买数量的子组件
- 点击 加入购物车，添加动画

1. 设置标签
   ​

   ```html
   <transition name="fade" 
     v-on:before-enter="beforeEnter"
     v-on:enter="enter"
     v-on:after-enter="afterEnter">
     <div v-if="isShow" class="ball"></div>
   </transition>
   ```

2. 设置动画相关方法和事件

   ​

   ```javascript
   addshopcar() {
   	this.isShow = !this.isShow;
   },
   beforeEnter(el) {
   	el.style.transform = 'translate3d(0,0,0)';
   },
   enter(el, done) {
     //let offset = el.offsetWidth;

     let span = document.querySelector('.mui-badge');

     let elX = el.getBoundingClientRect().left;
     let elY = el.getBoundingClientRect().top;

     let spanX = span.getBoundingClientRect().left;
     let spanY = span.getBoundingClientRect().top;

     let x = spanX - elX;
     let y = spanY - elY;

     el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px,0)';

     done();
   },
   afterEnter(el) {
   	this.isShow = !this.isShow;
   }
   ```

   ​
   ​

3. 样式 

```css
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
    /*display: none;*/
}
```

- number.vue子组件通知buydetail.vue父组件，值变化

1. number.vue中，this.$emit('getcount', this.value);   触发事件

2. buydetail.vue中 

   <number @getcount="getcount"></number>
    //自定义的事件，接受number组件发送过来的count
   ​

   ```javascript
   getcount(count) {
   	this.count = count;
   	console.log(this.count);
   }
   ```

   ​

- 加入购物车实现思路

1. 点击+ - 的时候让number.vue通知详细页面值发生变化，并记录值
2. 点击加入购物车，实现动画，见上面
3. 把当前商品id和商品的count存储到localStorage中
4. 计算totalcount（购物车中商品的总数），把值显示到badge中
5. 其它：在首页加载的时候，获取localStorage中的商品总数，显示到badge中

### 转场动画

```html	
<transition name="slide">
	<router-view></router-view>
</transition>

.slide-enter,
.slide-leave-to {
	opacity: 0;
}
 
.slide-enter-active,
.slide-leave-active {
	transition: all 1s linear;
}
```



### 购物车

实现思路，购物车的数据存储在localStorage中，先写一个localStorageHelp的模块，封装读写localStorage的方法

1. 在商品详情页中，点击加入购物车按钮，把商品id和商品数量存储在localStorage中

2. 购物车页面，首先从localStorage中把localStorage中存储的数据读取出来，把商品的id构造成 1,2,3的形式

3. 向服务器发送请求，获取数据并绑定到页面上显示

4. 在number组件中显示商品数量

5. 处理多个switch控件的选中和不选中，设置values数组，并在获取服务器方法中设置默认值为false

6. 点击删除按钮，根据商品id找到找到goodslist索引，删除values和goodslist中对应的项，根据商品id删除localStorage中的数据

7. 处理number组件 + -的时候更新localStorage和badge
   number组件中，触发事件，传递参数
   this.$emit('count', {type:this.type, goodsId:this.goodsId, count:this.count});
   购物车中更新界面和localStorage
   ​

   ```javascript
     getcount(obj) {
             if (obj.type == 'add') {
                 setItem({
                     goodsId: obj.goodsId,
                     count: 1
                 });
                 this.updategoodslist(obj.goodsId, 1);
             } else if (obj.type == 'sub') {
                 subtractItem(obj.goodsId);
                 this.updategoodslist(obj.goodsId, -1);
             }
         },
         //更新goodslist
         updategoodslist(goodsId, num) {
             this.getTotalPrice();
             let count = 0;
             this.goodslist.forEach(item => {
                 if (item.id == goodsId) {
                     item.count = item.count + num;
                 }
                 count += item.count;
             })
             let span = document.querySelector('.mui-badge');
             span.innerHTML = count;
         }
   ```

8. 监听以选择商品数量和总价
   ​

   ```javascript
   computed: {
         getTotalCount() {
             let array = this.values.filter(c => c);
             let totalCount = array.length;

             this.getTotalPrice();

             return totalCount;
         }
     }
   ```

   ​

   ```javascript
    getTotalPrice() {
             this.totalPrice = 0;
             this.values.forEach((item, index) => {
                 if (item) {
                     this.totalPrice += this.goodslist[index].sell_price * this.goodslist[index].count;
                 }
             });
         }
   ```

### 全局处理返回按钮，App.vue中

- 添加返回按钮，使用mui的样式 

<a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>

- 注册点击事件

  v-on:click="goback"

  ​

  ```javascript
  methods: {
    //返回
    goback() {
        this.$router.go(-1);
    }
  }
  ```

  ​

- 监视路由的变化

  ​

  ```javascript
   watch: {
        '$route': function(newValue, oldValue) {
            var paths = ['/home', '/member', '/shopcar', '/search'];
            if (paths.includes(newValue.path.toLowerCase())) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        }
    }
  ```

- 绑定

  v-if="isShow"

  ​

  ```javascript
  data() {
    return {
        isShow: true
    }
  }
  ```

  ​

- 解决刷新的问题

  ​

  ```javascript
    created() {
        var paths = ['/home', '/member', '/shopcar', '/search'];
        if (paths.includes(this.$route.path.toLowerCase())) {
            this.isShow = false;
        } else {
            this.isShow = true;
        }
    },
  ```

### webpack插件配置

```
复制文件
npm install --save-dev copy-webpack-plugin
压缩图片
npm install imagemin-webpack-plugin --save-dev
打包css
npm install --save-dev extract-text-webpack-plugin
压缩css
npm install --save-dev optimize-css-assets-webpack-plugin
```





```js
// 复制文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default;
// 把css打包到一个文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');

// 分离css的配置 css的loader处
use: ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'autoprefixer-loader']
})

// 图片和字体的路径
use: [
  {
    loader: 'url-loader',
    options: {
      limit: 10240,
      name: '/statics/fonts/[name].[ext]'
    }
  }
]



new HtmlWebpackPlugin({
  title: 'Output Management',
  template: 'index.html', // 自动生成html的模板文件
  filename: 'index.html', // 设置生成的html的文件名
  minify: {
    collapseWhitespace: true, //去除换行和空格
    minifyCSS: true, //压缩html内的css
    minifyJS: true, //压缩html内的js
    removeComments: true //删除html注释
  }
}),
new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}),
 new ExtractTextPlugin({
    filename: '/statics/css/style.css'
 }),
  new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
  // Copy the images folder and optimize all the images
  new CopyWebpackPlugin([
  {
    from: 'statics/images',
    to: 'statics/images'
  }
]),
  new ImageminPlugin({
   test: /\.(jpe?g|png|gif|svg)$/i,
  })
```



### 开启Apache的gzip压缩

要让apache支持gzip功能，要用到deflate_Module和headers_Module。打开apache的配置文件httpd.conf，大约在105行左右，找到以下两行内容：（这两行不是连续在一起的）

```
#LoadModule deflate_module modules/mod_deflate.so
#LoadModule headers_module modules/mod_headers.so
```

然后将其前面的“#”注释删掉，表示开启gzip压缩功能。开启以后还需要进行相关配置。在httpd.conf文件的最后添加以下内容即可：

```
<IfModule deflate_module>
    #必须的，就像一个开关一样，告诉apache对传输到浏览器的内容进行压缩
    SetOutputFilter DEFLATE
    DeflateCompressionLevel 9
</IfModule>
```

最少需要加上以上内容，才可以生gzip功能生效。由于没有做其它的额外配置，所以其它相关的配置均使用Apache的默认设置。这里说一下参数“DeflateCompressionLevel”，它表示压缩级别，值从1到9，值越大表示压缩的越厉害。