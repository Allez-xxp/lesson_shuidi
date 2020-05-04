import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import mutation from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({  //这里只负责返回一个单一的状态树
  state: {  //rootState
    // 关于用户设计状态：
    login: false,  //是否登录？
    userInfo: null, //头像，昵称
    products:{},    //货物
    cartList: []    //购物车中显示的数据列表
    //若你在没有登录的状态下，进入下单页面或发表评论，vue-router的守卫状态会跳转到登录页
  }
  // vuex的另一种架构方式：将mutations和actions从index.js分离,从外部引入

  // modules: {
  //   //做vuex小型电商应用，不那么复杂，就不要modules
  // }
})
