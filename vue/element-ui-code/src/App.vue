<template>
  <div id="app">
    <!-- element-ui源码分析 alert组件 -->
    <el-alert 
    title="成功提示的文案" 
    type="success">

    </el-alert>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import ElAlert from './components/ElAlert.vue'

export default {
  name: 'App',
  components: {
    ElAlert
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
