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
            <!-- element-ui 表单,收集数据(json)；
            :model props是el-form-item的需要
            form 功能组件；el-form-item：容器
            -->
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <!-- 双向绑定指令 -->
                    <el-input v-model="loginForm.username"
                    placeholder="用户名">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <!-- 双向绑定指令 -->
                    <el-input v-model="loginForm.password"
                    placeholder="密码" type="password"> 
                    </el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="submitForm('loginForm')"
                     class="submit_btn">登录
                     </el-button>
                </el-form-item>
            </el-form>
        </section>
    </transition>
  </div>
</template>
<script>
// 后端请示放在api模块下,不要把api业务写在组件里
import { login } from '@/api/getData';
export default {
    data() {
        return {
            showLogin: false,
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                // 渐进式开发
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                ]
            }
        }
    },
    methods:{
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) =>{
                // console.log(valid);
                if(valid) {
                    // 跟后端api通信；登录
                    // 异步的ajax请求
                    const res = await login({
                        user_name: this.loginForm.username,
                        password:this.loginForm.password
                    });
                    console.log(res,'--------');
                    // 模拟 mock；减少不确定性
                    if(res.status ==1 ) {
                        this.$message({
                            type:'success',
                            message: '登录成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message
                        })
                    }
                }else {
                    // this -> component.prototype ->vue 跟实例 ->vue.use()
                    this.$notify.error({
                        title: '错误',
                        message: '请输入正确的用户名和密码',
                        offset: 100
                    });
                }
            })
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