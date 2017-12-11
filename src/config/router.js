// 将所有的路由都放在此文件


import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


//引用子组件
import home from '../components/Home/home.vue'
import member from '../components/Member/member.vue'
import shopcar from '../components/ShopCar/shopcar.vue'
import search from '../components/Search/search.vue'
//首页子组件
import buy from '../components/Home/Buy/buy.vue'
import contact from '../components/Home/Contact/contact.vue'
import feedback from '../components/Home/Feedback/feedback.vue'
import news from '../components/Home/News/news.vue'
import share from '../components/Home/Share/share.vue'
import video from '../components/Home/Video/video.vue'
//新闻详情组件
import newsDetail from '../components/Home/News/detail.vue'

//图片详情
import shareDetail from '../components/Home/Share/detail.vue'

//商品详情
import buyDetail from '../components/Home/Buy/detail.vue'
//商品评论
import buyComment from '../components/Home/Buy/comment.vue'
//穿件路由对象
let router = new VueRouter({
  linkActiveClass: 'mui-active',
  routes: [
    { path: '/', component: home },
    { path: '/home', component: home },
    { path: '/member', component: member },
    { path: '/search', component: search },
    { path: '/shopcar', component: shopcar },
    { path: '/buy', component: buy },
    { path: '/contact', component: contact },
    { path: '/feedback', component: feedback },
    { path: '/news', component: news },
    { path: '/share', component: share },
    { path: '/video', component: video },
    //设置新闻详情路由
    { path: '/news/:id', component: newsDetail, props: true },
    //路由传参的时候,在路由规则中设置props:true
    //设置图片分享详情路由
    { path: '/share/:id', component: shareDetail, props: true },
    //设置商品详情路由
    { path: '/buy/:id', component:buyDetail, props:true },
    //设置商品评论路由
    { name:"buyComment", path: '/buy/comment/:id', component:buyComment, props:true }
  ]
})

// 导出路由对象
export default router;