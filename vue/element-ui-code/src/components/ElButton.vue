<template>
  <button
    class="el-button"
    :type="nativeType"
    @click="handleClick"
    :class="[
    type ? 'el-button--' + type : '',
    {
        'is-round':round,
        'is-plain':plain,
        'is-loading':loading
    }
    ]"
  >
  <!-- 为什么不和下面的icon写一起呢？这也是为什么下面那个icon要加一个&& !loading的判断有关 -->
  <!--要让按钮不能既能是编辑状态icon又能是loading状态按钮，有歧义(一般是icon是loading是就不能编辑了(比如提交事件)有歧义) -->
  <i class="el-icon-loading" v-if="loading"></i>
  <!-- ElButton 有了icon 这个就能去掉了 -->
  <i v-if="icon && !loading" :class="icon"></i>
  
  <span v-if="$slots.default"><slot></slot></span> 
  <!-- 把默认的输出到这里文字 -->

  <!-- 用span 包裹文字 ,文字就是slot 为什么写if?因为如果是只是一个icon  $slots是组件的所有的插槽-->
  <!-- <span v-if="$slots.solt"><slot name="solt"></slot></span> -->
  <!-- <span v-if="$slots.solt"><slot></slot></span> -->

  <!-- 如果在声明slot的时候不给name,也就是说有一个默认的slot,那就直接输出来
  前面传了name,slot为 $slots.solt -->
  <!-- 内置的type属性，决定他是普通的按钮，还是可以提交事件的按钮,变成动态的，因为已经有一个用于props的声明的type -->
  
  </button>
  <!-- 基础类名el-button有了它，才是一个按钮 
  动态类名，中括后，里面的类名是需要根据类型动态输出的
  type ? 'el-button--' + type : '',
  'is-round',
  round ? 'is-round' : '',
  key-value方式：json object方式，只要后面的结果为真，vue中就会把前面的类名(key)给动态绑定的class-->
</template>

<script>
export default {
    //要来ElButton.vue声明组件名
    name: 'ElButtonGroup',
    props:{
        loading: Boolean,
        type:{
            type:String, //类型可以在App.vue中自定义输入的，有type参数
            default: 'default' //因为可以根据官网看到，原始的是el-button--default
        },
        //比较一下两个type
        nativeType: {
            type:String,
            default: 'button'
        },
        round:{
            type: Boolean,
            default:false
        },
        plain:{
            type: Boolean,
            default:false
        },
        icon: String,
    },
    computed:{

    },
    methods:{
        handleClick(evt){ //evt是事件的对象，里面会包含这是个什么事件，事件的目标是什么，在哪里
            this.$emit('click', evt) //$emit子组件向父组件传递一个事件,事件名叫click，这样就能在外面也使用@click进行对事件的捕捉
        } //交给业务层处理点击事件App.vue
    }

}
</script>

<style>

</style>