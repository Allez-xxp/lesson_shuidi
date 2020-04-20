<template>
  <div id="app">
    <!-- <carousel height="150px">
      <carousel-item  v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </carousel-item>
    </carousel> -->
    <el-button 
      type="success" 
      nativeType=""
      loading
      round 
      plain
      icon="el-icon-edit"
      @click="upload"      
       >按钮</el-button>
    <el-button 
      type="text"          
    >文本按钮</el-button>
    <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button> -->

       <!-- 这里给slot加了name,因为$slots.default就不会为true了（因为slot不为default）所以不会输出 -->
       <!-- Boolean的有值即为真，所以只需要传round就可以了 
       icon="el-icon-edit"去掉就没有东西在按钮上了，处理loading
       交给业务层处理点击事件，在这里定义的是上传事件，在ElButton.vue中定义的是Click点击事件 -->
       <!-- nativeType="submit"表单提交 reset，表单重置 -->
       <!-- 添加loading能力 -->
    <div>
      <!-- 容器式组件 -->
      <el-button-group>
        <el-button  type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button  type="primary" >下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <el-button-group>
        <el-button  type="primary" icon="el-icon-edit"></el-button>
        <el-button  type="primary" icon="el-icon-share"></el-button>
        <el-button  type="primary" icon="el-icon-delete"></el-button>
      </el-button-group>
      <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
      </el-badge>
      <el-badge :value="101" class="item" :max="99">
        <el-button size="small">评论</el-button>
      </el-badge>
      <!-- 我们的max是number的，:max="99"表示绑定，把max里面变成js运行区域，双引号里面的就不会是String类型的了 -->
      <el-badge value="new" class="item" >
        <el-button size="small">回复</el-button>
      </el-badge>
      <!-- value="new"里面是字符串的时候就不能加：不然会被认为是关键字，要去定义的 -->
      <el-badge value="hot" class="item" type="info">
        <el-button size="small">回复</el-button>
      </el-badge>
      <!-- 小圆点 ，遵守html风格,变大写驼峰为横杠小写-->
      <el-badge is-dot class="item">数据查询</el-badge>
      <!-- 还有一种需要是已经阅读过的消息，小圆点就会消失 -->
      <el-badge :hidden="isHideDot" is-dot class="item">数据查询</el-badge>
    </div>

    <!-- element-ui源码分析 alert组件 -->
    <!-- <el-alert 
    title="成功提示的文案" 
    type="success">
    </el-alert> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import ElAlert from './components/ElAlert.vue'
import ElButton from './components/ElButton.vue'
import ElButtonGroup from './components/ElButtonGroup.vue'
import ElBadge from './components/ElBadge.vue'
export default {
  name: 'App',
  components: {
    // ElAlert
    // 'carousel': Carousel //自定义组件时这样写，组件名大写的时候组件里面的html标签小写
    ElButton,
    ElButtonGroup,  //声明组件，就能使用了
    ElBadge
  },
  methods: {
    upload(evt){
      console.log(evt);
    }
  },
  //已经阅读过的消息，小圆点就会消失
  mounted(){
    setTimeout(() => {
      this.isHideDot = true 
    }, 3000);
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  background-color: blueviolet;
}
.item {
  margin: 25px 20px;
}
</style>
