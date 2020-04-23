<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <div v-for="(product, index) in products" :key="index">
      {{product.title}}
    </div> -->
    <!-- 第一种写法 -->
    <div v-for="(product,index) in $store.state.products" :key="index">
      {{product.title}}
    </div>
  </div>
</template>


<script>
// store中的数据怎么流向App.vue呢？就要有两个方法
// import HelloWorld from './components/HelloWorld.vue'
//第二种写法 vue mapStates 
import { mapGetters } from 'vuex';
// 怎么通过mapGetters将products数据流向组件,通过computed

import Api from "@/api/shop.js";  //切动态数据，引入api层
export default {
  name: 'App',
  data() {  //数据驱动页面; 有了store,基本就不需要用data了
    return {
      products: [] //可以根据设计稿，先填个假数据，实现切页面，然后再去切到api,从api获取数据
    }
  },
  components: {
    // HelloWorld
  },
  mounted() { //生命周期，做数据请求
  // 老方法，没有promise的时候
    // Api.getProducts((_products) =>{  //回调函数，数据流向页面APP.vue
    //   //封装的方法，两个模块通过回调进行交互
    //   this.products = _products
    // });
    // console.log(this.$store) //$store是根组件中注册了的store,main.js中
  }
}
</script>

<style>

</style>
