// 所有的过滤器放在此文件

//过滤器格式化日期
import moment from 'moment'
import Vue from 'vue'


Vue.filter('fmtTime', (value, fmrStr) => {
  return moment(value).format(fmrStr)
})