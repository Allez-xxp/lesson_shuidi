import Vue from 'vue'
import Router from 'vue-router'
// 首页，直接载入
import HelloWorld from '@/components/HelloWorld'
// 95%不登录,没必要在页面/加载；相对路径；在vue架构中，开发主要在src/
// webpack:vue的打包工具； alias：快速链接
const Login = () =>import('@/components/Login')
// 函数就是组件;require:引入模块；
// @：延迟加载组件，渐进式；用户切换路由时，组件再加载并显示
// 优化vue-router；返回的函数
// const GoodsList = (resolve) => 
// require(['@/components/GoodsList'],resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/goodsList',
      name: 'GoodsList',
      // 返回组件的函数
      component: () => import('../components/GoodsList.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // 返回组件的函数
      component: () => import('../components/Login.vue')
    },
  ]
})
