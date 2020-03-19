import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
Vue.config.productionTip = false
// 全局过滤器声明
Vue.filter('format_date', function format_data(value) {
  console.log(value);
  const date = new Date(value);
  console.log(date);
  // return `${date.getFullYear()}年
  // ${date.getMonth() + 1}月
  // ${date.getDate()}日
  // ${date.getHours()}时
  // ${date.getMinutes()}分
  // ${date.getSeconds()}秒`;
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
})
new Vue({
  render: h => h(App),
}).$mount('#app')
