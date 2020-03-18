<template>
  <transition name="el-alert-fade">
    <!--:class="" 动态类；为数组，多个动态变量  -->
    <div 
      class="el-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
    >
      <i class="el-alert__icon" :class="[ iconClass ]" ></i>
      <div class="el-alert__content">
      <!-- ElAlert -->
        <span class="el-alert__title">
          {{ title }}
        </span>
      </div>
    </div>
  </transition>
</template>
<script>
// 常量  约定大于配置 
const TYPE_CLASSES_MAP = {
  'success': 'el-icon-success',
  'warning': 'el-icon-warning',
  'error': 'el-icon-error'
};

export default {
  name: 'ElAlert',
  props: {  
    type: {
      type: String,
      default: 'info' /* 使用好默值 */
    },
    title: {
      type: String,
      default: ''
    },
    center: Boolean, 
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        // 其中之一 
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    } 
  },
  computed: {
    // 计算属性 计算一下 
    typeClass() {
      return `el-alert--${ this.type }`;  //字符串模板
    },
    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
    }
  },
  data() {
    return {
      visible: true
    }
  }
}
</script>
<style>

</style>