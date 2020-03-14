import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 大型项目中，慎重其事的做这件事；配置引入rem（第一项）
import './config/rem'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
