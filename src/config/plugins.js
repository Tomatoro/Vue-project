//所有的插件放在此文件

//因为要把axios应用到Vue实例上,所以也需要Vue
import Vue from 'vue'

//引用 axios 因为它并不是Vue的插件,所以没有use
import axios from 'axios'
axios.defaults.baseURL = 'http://47.94.12.33:8080/api/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//让所有的vue实例都共享axios
Vue.prototype.$http = axios
Vue.prototype.axios = axios

//因为几乎所有地方都需要使用mint-ui Vue插件
// 全局引用mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
// 引用样式
import 'mint-ui/lib/style.css';


// 引用mui的css
import '../../statics/mui/css/mui.css'