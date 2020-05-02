<template>
  <div id="app">
    <products />
    <cart />
    <!-- {{$store.state.userInfo}}
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
[disabled] {
  cursor: not-allowed;  /*鼠标禁用，红圈表示*/ 
}
</style>

<script>
import ShoppingCart from '@/components/ShoppingCart'
import ProductList from '@/components/ProductList'
export default {
  mounted() {
    // 获取商品，MVVM 商品列表展示
    // this.dispatch('')
    // console.log(this.$store.state.products.all);
    // console.log(this.$store.state.cart.items);
  },
  components: {
    'products': ProductList, //'products'指定在当前组件的名字
    'cart': ShoppingCart
  }
}
</script>
