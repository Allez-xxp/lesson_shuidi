vue-cli有区别于vue
vue 全家桶开发的这样的一个命令行工具
1. vue全家桶
vue是框架，vue-cli用来开发单页应用的命令行工具
根据URL变化，显示不同内容
2. 组件化思维开发页面，
main.js 作为入口，挂载-》App.vue 根组件 -》挂载其他组件
#app 在哪里？
public/index.html 首页模板
main.js,vue去接管，挂载App.vue（根组件），再挂载其他组件；-》利用vue-cli编译成js文件;动态接入index.html后面，script

- main.js 入口，挂载new Vue()
- VueRouter 补全Vue全态，router的职责
- App.vue 根组件
- 单页面，插入<router-view />,占位符，全局组件
Vue.use(VueRouter) 全局启用