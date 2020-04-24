<template>
  <div id="app">
    <!-- <div v-for="(user,index) in users" :key="index"> {{user.name}}</div> -->
    <!-- <div v-for="(user, index) in $store.state.users" :key="index">{{user.name}}</div> -->
    <div v-for="(user, index) in getUsers" :key="index">
      {{user.id}} {{user.name}}
    </div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import  { mapGetters, mapActions } from 'vuex';
// 本地map(映射) 借 要什么都可以 $store.state 读操作
export default {
  name: 'App',
  // data 自己做主，跟其他组件不共享数据；私有数据
  // 不是父子组价，可能是兄弟组件，没有任何关系；若修改数据，就会导致前后数据不一致
  // data() {  //本地
  //   return {
      // vuex到来之后，组件做不了主；数据驱动页面（template）
      // 升级之后，有了vuex，这样不利于数据管理
      // 引入vuex之后，项目分为两部分：
        // 1.UI（用户界面工程师，前端）；地方（申请使用数据）
        // 2.数据流管理 vuex； 中央（批准发放）；管理数据（可以共享）
      // 用户列表
      // users: [
      //   {
      //     "address": {
      //       "city": "Los Angeles",
      //       "state": 'California',
      //       "pincode": "123"
      //     },
      //     "tags": [
      //       "music",
      //       "blogs",
      //       "cricket"
      //     ],
      //     "name": "Tom Benzamin"
      //   },
      //   {
      //     "address": {
      //       "city": "赣州",
      //       "state": '江西',
      //       "pincode": "331000"
      //     },
      //     "tags": [
      //       "coding",
      //       "blogs"
      //     ],
      //     "name": "王志浩"
      //   },
      //   {
      //     "address": {
      //       "city": "九江",
      //       "state": '江西',
      //       "pincode": "331000"
      //     },
      //     "tags": [
      //       "coding",
      //       "swim"
      //     ],
      //     "name": "刘子民"
      //   },
      //    {
      //     "address": {
      //       "city": "赣州",
      //       "state": '江西',
      //       "pincode": "331000"
      //     },
      //     "tags": [
      //       "coding",
      //       "games"
      //     ],
      //     "name": "衷从海"
      //   }
      // ]
  //   }
  // },
  // 申请使用中央数据; 使用第二个API
  computed: {
    //.. 展开运算符，一次性引入多个，getter函数里面的状态；返回想要的值
    ...mapGetters(['getUsers'])
  },
  components: {
    // HelloWorld
  },
  methods: {  //针对于vuex的actions
    ...mapActions(['fetchUsers'])
  },
  mounted() {  //使用生命周期取数据
    // ajax请求（二层）；TCP（三次握手）更加安全（相互确认身份）
    // 一个应用只能由一个store状态
    //dispatch api派发动作
    // this.$store.dispatch('fetchUsers')
    this.fetchUsers();
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
