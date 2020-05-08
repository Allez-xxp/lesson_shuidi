<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div>{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <!-- 放大镜位置，放置图片，用position定位到input输入框中 -->
        <span><input class="icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "南昌",
    }
  }
}
</script>

<style lang="less">
// scoped样式私有化; 引入样式文件style.less
@import "./style.less";
</style>