<template>
  <div id="app">
    <!-- 头部主键：v-header -->
    <v-header :seller="seller"></v-header> 
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>
<script>
// 引入组件：使用es6的import用法
import header from './components/header/header.vue';
import footer from './components/footer/footer.vue';

//页面数据如何引入
const response = require('./common/data/seller.json');
console.log(response);

// 引入urlParse组件，使用模板解析url
import {urlParse} from './common/js/util';
export default {
  data() {
    return {
      seller: {
        id: (() => {  //立即执行函数，返回值为id值
          let queryParam = urlParse();
          return queryParam.id
        }) ()
      }
    }
  },
  components: {
    'v-header':header,      //声明主键
    'v-footer':footer
  },
  //获取数据(最佳时间)；生命周期created(){}；类似于小程序的onLoad()
  created() {
    //Object.assign({},) 对象为空模板，用于获取多个数据
    this.seller = Object.assign({},this.seller,response.data)
    console.log(this.seller);
  }
}
</script>
<style lang="stylus">
@import "./common/stylus/mixin.styl"

*
  padding 0
  margin 0
.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  border-1px(rgba(7,17,27,0.1))  //生成1像素的边线
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 14px
      color rgb(77,85,93)
      text-decoration none
      &.active
        color:rgb(240,20,20)

</style>
