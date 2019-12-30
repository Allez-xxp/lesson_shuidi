<template>
  <div id="app">
    <div class="user">
      <!-- v:指令 -->
      <div class="back" @click="back">
        <!-- i标签：放置图标 -->
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="switches-wrapper">
      <!-- 组件封装 -->
        <switches :switches="switches" :currentIndex="currentIndex" 
        @switch="switchItem" />  
      </div>
    </div>
    
  </div>
</template>
<script>
import Switches from './components/switches/switches';
export default {   //声明需要引用的方法
  data () {
    return {
      currentIndex:0,
      switches: [
        {
          name:'我的收藏'
        },
        {
          name:'最近播放'
        }
      ]
    }
  },
  methods: {
    back () {
    console.log('返回上一页')
    },
    switchItem(index) {
      this.currentIndex = index;
    }
  },
  components: {
    'switches': Switches
  }
}
</script>
<style lang="stylus">
@import "./common/styl/reset";
@import "./common/styl/variable";

//图标字体库
@font-face {
  font-family: 'FontAwesome';
  src: url('./common/font-awesome/fonts/fontawesome-webfont.eot');
  src: url('./common/font-awesome/fonts/fontawesome-webfont.eot?#iefix') format('embedded-opentype'),
    url('./common/font-awesome/fonts/fontawesome-webfont.woff2') format('woff2'),
    url('./common/font-awesome/fonts/fontawesome-webfont.woff') format('woff'),
    url('./common/font-awesome/fonts/fontawesome-webfont.ttf') format('truetype'),
    url('./common/font-awesome/fonts/fontawesome-webfont.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

.fa  //块级元素
  display inline-block
  font normal normal normal 14px/1 FontAwesome
  font-size inherit     //继承字体
  text-rendering auto   //字体渲染
  -webkit-font-smoothing antialiased
.user
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 100   //占满这个页面
  background $color-background  //设置变量
  .back  //返回页面css
    position absolute
    top 0
    left 4px
    .fa-angle-left  //引用上一级类名
      padding 5px 10px
      font-size 30px
      color #ffffff
      &:before       
        content "\F104"
  .switches-wrapper
    display flex
    align-items center
    background red
    height 44px
</style>
