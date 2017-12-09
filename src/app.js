import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
// Vue.use(VueResource)

//过滤器格式化日期
import moment from 'moment'
Vue.filter('fmtTime',(value,fmrStr)=>{
  return moment(value).format(fmrStr)
})


//引用 axios 因为它并不是Vue的插件,所以没有use
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8899/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//让所有的vue实例都共享axios
Vue.prototype.$http = axios

//引用子组件
import home from './components/Home/home.vue'
import member from './components/Member/member.vue'
import shopcar from './components/ShopCar/shopcar.vue'
import search from './components/Search/search.vue'
//首页子组件
import buy from './components/Home/Buy/buy.vue'
import contact from './components/Home/Contact/contact.vue'
import feedback from './components/Home/Feedback/feedback.vue'
import news from './components/Home/News/news.vue'
import share from './components/Home/Share/share.vue'
import video from './components/Home/Video/video.vue'
//新闻详情组件
import newsDetail from './components/Home/News/detail.vue'

//图片详情
import shareDetial from './components/Home/Share/detial.vue'
//穿件路由对象
let router = new VueRouter({
  linkActiveClass: 'mui-active',
  routes: [
    { path: '/', component: home},
    { path: '/home', component: home},
    { path: '/member', component: member},
    { path: '/search', component: search},
    { path: '/shopcar', component: shopcar},
    { path: '/buy', component: buy},
    { path: '/contact', component: contact},
    { path: '/feedback', component: feedback},
    { path: '/news', component: news},
    { path: '/share', component: share},
    { path: '/video', component: video},
    { path: '/news/:id', component: newsDetail,props:true},
    //路由传参的时候,在路由规则中设置props:true
    { path: '/share/:id', component: shareDetial,props:true},
  ]
})

//加载父组件
import app from './app.vue'
import '../statics/mui/css/mui.css'

let vm = new Vue({
  el:'#app',
  router,
  render: c => c(app)
})
 // createElement帮我们处理组件，并把处理的结果返回，渲染到#app中。不是dom中的createElement
// render: function (createElement) {
//   return createElement(app);
// }
// render: c => c(app)