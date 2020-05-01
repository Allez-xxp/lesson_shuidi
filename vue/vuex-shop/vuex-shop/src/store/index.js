import Vue from 'vue'
import Vuex from 'vuex'
//完成商品模块的数据管理分离
  //集中管理products数据
import products from './modules/products.js';
//添加树中的一个分支，集中管理(购物车)
import cart from './modules/cart.js';

Vue.use(Vuex)
//vuex是单一状态树，单一就是我们的入口文件index.js中store只有一次实例化的机会(new vuex store),
// vue中仓库只能有一个，因为这样我们的状态就不会混
// 树？modules来了之后，树的概念就来了，state就是状态的根节点，modules中的就是叶节点
export default new Vuex.Store({
  state: {  //根节点；所有状态放在这里
    // 当信息为空时，未登录；全局共享状态
    userInfo: {
      uid: 10001,
      username: '熊小萍'
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {  //数据管理模块
    cart, //叶节点，购物车
    products //叶节点，商品
  }
})
