<template>
  <div class="login_page fillcontain">
    <!-- 表单
    v-show:是否隐藏；
    transition：vue的内置组件，带来特效，当他的子元素从不显示到显示；v-if,v-show都会触发
    -->
    <transition name="form-fade">
        <!--v-if,v-show都会触发 进场的切换 
            产生四个类名：
            进场  false -> true；
            form-fade-enter(存在短暂时间)：元素显示之前生效，显示之后，一帧后移除
            form-fade-enter-active：进入transition的时间
            form-fade-enter -> form-fade-enter-active
            出场  true  -> false:
            form-fade-leave：离开的开始状态（一帧）
            form-fade-leave-active：离开
        -->
        <section class="form_container" v-show="showLogin">
            <div class="manage_tip">
                <p>elm后台管理系统</p>
            </div>
        </section>
    </transition>
  </div>
</template>
<script>
export default {
    data() {
        return {
            showLogin: false
        }
    },
    mounted() {
        // 
        this.showLogin = true
    }
}
</script>
<style lang="stylus" scoped>
// 根组件
@import "../style/common.styl";
.login_page
    height 100vh
    background-color  #324057
.manage_tip
    position absolute
    width 100%
    top -100px
    left 0
    p
    font-size  34px
    color #ffffff
.form_container
    width 320px
    height 240px
    position absolute
    top 50%
    left 50%
    margin-top -160px
    margin-left -120px
    padding 25px
    border-radius 5px
    text-align center
    background-color #ffffff
    .submit_btn
        width 100%
        font-size 16px
// 动态的产生四个类
.form-fade-enter-active, .form-fade-leave-active
    transition all 10s
.form-fade-enter, .form-fade-leave
    transform translate3d(0,-50px,0)
    opacity 0
</style>