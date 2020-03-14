<template>
    <div class="alert_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span></span>
                <span></span>
            </div>
            <p class="tip_text">{{alertText}} </p>
            <div class="confirm" @click="closeTip">确认</div>
        </section>
        
        <!-- 弹窗的确定功能，取消功能；点完关闭它
        如何关闭？ 通知父组件将showAlert设置为false
         -->
        
    </div>
</template>
<script>
// 数据驱动界面，数据只有data吗？
// props是一个数据由父组件传给子组件；使通用组件更有意义
// 
export default {
    props: [  //定义外界给它什么
        'alertText'
    ], 
    data() {   //私有数据；页面级组件持有数据，派发给子组件
        return {

        }
    },
    methods: {
        closeTip() {
            //emit：通知父组件功能
            this.$emit('closeTip') 
        }
    },
    // computed() { //计算属性

    // }
}
</script>
<style lang="stylus" scoped>
@import '../../style/mixin';
.alert_container
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 200
  background-color rgba(0,0,0,.3)
  .tip_text_container
    position absolute
    top 50%
    left 50%
    margin-top -6rem
    margin-left -6rem
    width 12rem
    animation tipMove .4s
    background-color rgba(255, 255, 255, 1)
    border 1px
    padding-top 0.6rem
    display flex
    justify-content center
    align-items center
    flex-direction column
    border-radius 0.25rem
    .tip_icon
      wh(3rem, 3rem)
      border 0.15rem solid #f8cb86
      border-radius 50%
      display flex
      justify-content center
      align-items center
      flex-direction column
      span:nth-of-type(1)
        wh(.12rem, 1.5rem)
        background-color #f8cb86
      span:nth-of-type(2)
        wh(.2rem, .2rem)
        border 1px
        border-radius 50%
        margin-top 0.2rem
        background-color #f8cb8b
</style>