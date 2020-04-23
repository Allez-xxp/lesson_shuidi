import Vue from 'vue'
import App from './App.vue'

// 两个性能优化  
// lazyload 图片懒加载
// click 事件优化
import VueLazyload  from 'vue-lazyload';

Vue.use(VueLazyload, {
  // src 菊花图    data-src 
  // 用的是require，是commonjs  js   图片 webpack 静态资源打包器
  // js  css  img 
  error: require('./assets/loading.svg'), // error 
  loading: require('./assets/loading.svg'), // 加载中
  attempt: 1  // viewport ，图片离我多远就预加载（阈值）
});


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
