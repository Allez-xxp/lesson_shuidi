import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Goods from '../views/Goods.vue'

// const Goods = () => {
//   return `
//   <div>goods</div>
//   `
// }
// const GoodsDetails = () => {
//   return `
//   <div>goodsDetails</div>
//   `
// }
Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    component: Index, //？
    name: 'index',
    redirect: '/home',
    children: [
      {path: 'home', component: Home},
      {path: 'goods', component: Goods},
    ],
    // path: '/',
    // name: 'Home',
    // redirect: '/home',
    // children: [
    //   {
    //     path: 'home', //子路由中不用加/
    //     component: Home
    //   },
    //   {
    //     path: 'goods', //子路由中不用加/
    //     component: Goods
    //   },
    //   {
    //     path: 'goodsDetails', //最常被访问的
    //     name: 'goodsDetails',
    //     component: GoodsDetails
    //   }
    // ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由钩子
//跳转之前捕获路由
router.beforeEach(function(to, from, next){
  console.log('路由在变化')
  console.log(to, from);
  next();
})
export default router
