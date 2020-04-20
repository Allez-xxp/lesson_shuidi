# element-ui源码分析
1. element-ui 源码在哪里？
 在node_modules/element-ui

2. github element-ui  
  怎么做？ 学， 边看代码边实现一下? 

3. 写出来element-ui 组件
  css文件引入留下， 将 Vue.use(ElementUI)注释

- 学到代码风格 
  属性一行一个  有利于代码可读
- :class 的用法 []数组，有多个动态样式要输出, 第一个是typeclass,他就是一个变量，冒号后面是js区域，每一项都是可以动态输出的，双引号里面是会运行的，这个变量在computed中计算得出 
  computed 属性 根据props 再计算
  6000 人民币(props, data) 再计算 raw（原生数据） 
  
- props 高级声明 
  type : {  // props  name 
    type: String,   // 类型
    default: '默认值',
    validate: function(){}  return boolean   //通过返回一个Boolean值的回调函数,来决定是否要报错
  }
  
  ['type', 'title'] //粗线条的， 不能做太多的检测

  'is-' + effect：交互式，根据effect值的不同生成一个不同的作用

# element-ui 源码再讲解 carousel
  - 怎么使用Element-ui? 
  import ElementUI from 'element-ui'
  Vue.use(ElementUI);
  所有组件就全局可使用
    1. Vue.use 背后在干什么？
    2. 如果只想使用部分组件，怎么解决？
      在页面按需加载，引入
  
  - 每个组件都是一个目录
    - carousel组件，设计成父子组件，各司其职，拆分细
    - carousel-item组件，负责内部的item
    - 划分职责
      - 容器组件：负责横向|纵向；自动滚动 @change interval
      - 子组件 相当于slot关系

  - element-ui 组件开发，框架，难度 表震度 专业度 多个部门协作的
    index.js方便安装 install Vue.component
