<template>
  <div class="el-badge">
      <!-- 加slot,因为badge；是作为el-button的子组件，所以要有一个button -->
      <slot></slot>
      <!-- transition配合is-show显示与否的状态切换 -->
      <transition name="el-zoom-in-center">      
      <!-- v-text=""输出的不会是html,只输出文字 -->
      <sub
      v-show="!hidden&&(content || content===0 || isDot)"
      class="el-badge__content" 
      :class="[
      'el-badge__content--' +type, //content是el-badge的子元素，所以是两个下划线，两个中横线是表示某种状态
      {
        'is-fixed': $slots.default,  //用户传的所有的slot插槽数组,is-fixed会让他到右上角去
        'is-dot': isDot //让他从长的变窄一点
      }
      ]"
      v-text="content"      
      >
      </sub>
      </transition>
      <!-- class="el-badge__content" //样式 -->
      <!-- 动态绑定的类名，并且其中有boolean值，直接用花括号 -->
      <!-- v-text="value"  现在根据源码改成content -->
  </div>
</template>

<script>
export default {
  name: 'ElBadge',
  props:{
    value: [String, Number],
    max: Number,
    hidden: Boolean, //默认为false
    isDot: Boolean, //参数中有驼峰式命名时，在传的时候是以-小写替代大写，这里遵守js风格
    type: {
      type: String,
      //加一个验证函数
      validation(val) {
        return ['primary','success','warning','info','danger'].indexOf(val) >-1
      }
    }
  },
  computed: {
    content(){
      if(this.isDot) return;
      //整数输出，一个是不超过的，一个是超过带加号的；
      // 输出hot new字符串的
      const value = this.value
      const max = this.max; //大于某个值就折叠，显示99+
      //除了会显示数量，还会显示提示的文字
      if(typeof value === 'number' && typeof max === 'number'){
        return max < value ? `${max}+` : value;
      }
      
      return value;
    }
  }

}
</script>

<style>

</style>