-组件式开发：页面有组件购成，而非标签（传统切页面）
 Facebook，由一万多个组件拼起来；组件复用
 components/header/header,效力于多个页面

-Object.assign({},n个对象)
 来自es6

-import from,使开发模块化

-组件化思维
 1.一个页面有多个组件构成，页面开发可以划分任务
 2.催生大量的团队合作
 3.每个组件都要解耦---产生scoped用法
 4.scoped 作用域；属性选择器 #app[data-v-12341]

-在VUE中禁止DOM操作
ref 留个票据  ；
eg：ref=""
    this.$refs.