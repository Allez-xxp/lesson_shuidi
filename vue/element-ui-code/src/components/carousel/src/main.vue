<template>
    <div
        :class="carouselClasses">
        <!-- Carousel -->
        <div
            class="el-carousel-container"
            :style="{height : height}"
            >

        
        <slot></slot>
        </div>
        <!-- 第一个小目标 幻灯片中的indicator -->
        <ul 
            :class="indicatorsClasses">
            <!-- 有多少个carousel-item 就输出多少个indicator? -->
            <!-- items？？数据项， 通过子组件，通知父组件已经挂载上去了-->
            <li 
                v-for="(item, index) in items"  
                :key="index"
                :class="[
                'el-carousel__indicator',
                'el-carousel__indicator--' + direction,
                ]">
                <button class="el-carousel__button"> <!--左右箭头 -->
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
// 设计小目标 目标驱动学习
export default {
  // 严格下不可或缺
  name: 'Carousel',
  data() {
    return {
      items: [] //空 何来？
    }
  },
  props: {
    height: String,
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {//验证，限制只能传下面两个，否则返回false
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    }
  },
  computed: {
    // classes根据方向计算,水平|垂直
    carouselClasses() {
      // vue :class 
      const classes = ['el-carousel', 'el-carousel--' + this.direction]; //把类名做成数组的方式
      // el-carousel是通用样式，后面的根据水平还是垂直决定样式
      // 小目标， 最核心的功能摸清楚
      // vue :class 支持三种语法1：key->value 类名+Boolean 2.json 可以同时设置多个类名3。数组方式，数组中每一项都可以
      // 小细节等下搞 
      // if (this.type === 'card') {  
      //   classes.push('el-carousel--card');
      // }
      return classes;
    },
    indicatorsClasses() { //放下面还是放左边
      const classes = ['el-carousel__indicators', 'el-carousel__indicators--' + this.direction];
      return classes;
    }
  },
  methods: {
    updateItems() {
        //会执行4次
      console.log('-------')
      console.log(this.$children);// 子组件
      // ？？
    //   filter方法是ES6的，将数组中每一项都过滤一下，要求类名得是CarouselItem
      this.items = this.$children.filter(child => child.$options.name === 'CarouselItem')
    }
  }
}
</script>