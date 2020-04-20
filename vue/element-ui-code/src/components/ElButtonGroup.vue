<template>
  <!-- 容器组件，把el-button包起来作用 -->
  <div class="el-button-group">
      <slot></slot>
  </div>
</template>

<script>
export default {
    //要去ElButton.vue声明
    name: 'ElButtonGroup'  //声明组件的名字叫ElButtonGroup,等下引入的时候就会变成el-button-group
}
</script>

<style>

</style>