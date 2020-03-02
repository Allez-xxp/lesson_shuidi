// 入口文件
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import View from './views/View.vue'
// 1. 引用vue-router，负责管理路由
// 2. 如何实现不同城市疫情的查看   --vue-router
// 页面支持热更新；SPA(single page application)
// 页面不变，URL发生变化
// 全局启用router
Vue.use(VueRouter)  //全家桶 路由，实现单页应用，URL改变，页面只有部分会更新
Vue.config.productionTip = false
// 实例化一个vue
// 3. 将router放到实例上
// 前端路由，路由规则
const routes = [
  {
    path: '/',  
    name: 'Home',
    component: Home  //首页组件
  },
  {
    path: '/about',  //新路径，前端路由
    name: 'Home',  //名字
    component: About  //首页组件
  },
  {
    // 匹配各个城市
    path: '/*',  //*匹配所有路由
    name: 'view',
    component: View
  }
]
const router = new VueRouter({ //生成一个路由对象
  mode:'hash',  //路由模式
  base: process.env.BASE_URL,routes
}) 
new Vue({
  router, //区分全国，省份
  render: h => h(App),
}).$mount('#app')
