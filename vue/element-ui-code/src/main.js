import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  //不写css，专注于vue
// 引入组件Carousel，变成全局组件
import Carousel from './components/carousel/index.js';
import CarouselItem from './components/carousel-item/index.js';

// console.log(Carousel);

// 1. 单独调用组件
// Carousel.install(Vue);
// CarouselItem.install(Vue);
// Vue.component(Carousel.name, Carousel);

// 2.把组件放到一个数组里
const components = [
  Carousel ,
  CarouselItem
];
// 2. 封装了成为全局组件的细节 components.forEach
const install = function(Vue) {
  components.forEach(component => {
    // Vue.component: 在vue的语法中可以全局引入组件的api，会沿着原型链
    // Vue.component(component.name, component)

    //2 调用的是每个组件的index.js下面的install方法
    component.install(Vue)
  })
}
// Vue.use 启用库， 会调用对象的install方法
install(Vue)  //2 安装一下，类似于axios

Vue.config.productionTip = false
// Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
