<template>
  <div id="app">
    <!-- Vue.use(VueRouter)，全局组件
    router-view，匹配路由视图占位符的作用
     -->
    <!-- 单页应用的头部导航 nav标签-->
    <nav class="nav">
      <ul>
        <li>
          <!-- router-link:链接
          在单页应用中不用a标签，使用router-link代替
           -->
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/about">关于</router-link>
        </li>
        <li>
          <router-link to="/jiangxi">江西</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
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
