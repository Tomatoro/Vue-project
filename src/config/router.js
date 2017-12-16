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
    { path: '/home', meta:{ title:'首页' }, component: home },
    { path: '/member', meta:{ title:'会员中心' },component: member },
    { path: '/search', meta:{ title:'搜索' },component: search },
    { path: '/shopcar', meta: { title:'购物中心'}, component: shopcar },

    { path: '/buy', meta: { title: '商品购买' }, component: buy },
    { path: '/contact', meta: { title: '联系我们' }, component: contact },
    { path: '/feedback', meta: { title: '留言反馈' },component: feedback },
    { path: '/news', meta: { title: '新闻资讯' },component: news },
    { path: '/share', meta: { title: '图片分享' },component: share },
    { path: '/video', meta: { title: '视频专区' }, component: video },
    //设置新闻详情路由
    { path: '/news/:id', meta: { title: '新闻' }, component: newsDetail, props: true },
    //路由传参的时候,在路由规则中设置props:true
    //设置图片分享详情路由
    { path: '/share/:id', meta: { title: '图片分享' }, component: shareDetail, props: true },
    //设置商品详情路由
    { path: '/buy/:id', meta: { title: '商品详情' },component:buyDetail, props:true },
    //设置商品评论路由
    { name: "buyComment", meta: { title: '商品评论' },path: '/buy/comment/:id', component:buyComment, props:true }
  ]
})
//路由跳转之后执行
router.afterEach((to,from)=>{
    document.title = to.meta.title
})

// 导出路由对象
export default router;