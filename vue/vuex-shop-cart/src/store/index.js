// 数据管理的地方部门
import Vue from 'vue';
import Vuex from 'vuex'; //引入vuex，调兵遣将；管理数据，流根组件

// 路由中传的是路由数组，Store中传什么？
//仓库这里的数据本来应该是空的，数据应该从api->store
import Api from '@/api/shop.js';
let products = [];
Api.getProducts((_products)=>{
  // console.log(_products);
  products= _products; //这里是出不来数据的,是异步的
})

Vue.use(Vuex);
//返回Vuex的Store的实例，返回一个仓库，仓库中等下去提供数据
// store中的数据怎么流向App.vue呢？就要有一方法，
export default new Vuex.Store({
  state: {  //可以理解为组件中的data
    products
    //从上面传过来，是 products: products 的简写
    // [
    //   //仓库这里的数据本来应该是空的，数据应该从api->store
    //   {"id": 1, "title": "ipad4 Mini","prce":500.01,"inventory":2}, //先放个假数据
    //   {"id": 1, "title": "H&M T-shirt White","prce":10.01,"inventory":20},
    //   {"id": 1, "title": "Charli XCX-Suker CD","prce":59.01,"inventory":5},
    // ],
    // 还可以添加别的
    // name: '范家新村',
    // products: products //这里是出不来数据的
  },
  getters: {
    
  }
})