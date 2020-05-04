import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//utils将常用的工具类插入到Vue的prototype中，$store也是同样的原理
import utils from '@/utils/base.js'
//插件
// import Plugins from '@/plugins/index.js'


Vue.config.productionTip = false
Vue.prototype.utils = utils  //在vue的prototype原型链上添加utils,通过$utils调用

// Vue.use(Plugins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
