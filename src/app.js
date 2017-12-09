
import Vue from 'vue'
//引入过滤器
import './config/filters'
//引入外部插件
import './config/plugins'



//引入路由模块
import router from './config/router'
//加载父组件
import app from './app.vue'
// import '../statics/mui/css/mui.css'

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