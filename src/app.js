
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
  render: c => c(app),
  created(){
    // 添加请求拦截器
    this.axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      this.$indicator.open('加载中...');
      return config;
    }.bind(this), function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    this.axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      this.$indicator.close();
      return response;
    }.bind(this), function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
})
 // createElement帮我们处理组件，并把处理的结果返回，渲染到#app中。不是dom中的createElement
// render: function (createElement) {
//   return createElement(app);
// }
// render: c => c(app)