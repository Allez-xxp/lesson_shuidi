# 全栈开发的入门练习
- blog系统
掘金：blog系统+电商系统（小册购买；以文章为主）
 1. server 后端为前端服务，写接口；提供/api；增删改查
 node + mongodb
 2. vue/react 前端，更好的用户体验；单页应用
  VueRouter:负责路由
  /about / /* 支持页面热更新：头部底部不变，中间内容随着<router-view /> routes数组配置更新

# 知识点：
1. 全栈开发思路搭建（vue+node）
前后端分离的全栈开发；创造更好的用户体验
整栈开发：admin + server + web
admin  后台核心开发，构建网站底层结构
server 提供服务器端项目，封装
web 提供vue项目，前端用户体验

2. vue router的两种形式
- history，js里的内置对象；浏览器历史对象 /，更像后端传统的api
- hash，以#/开始；兼容性好（IE8-IE9）

3. 先把完整的路由想一想，搭建一下，在/views目录下把组件建好
 
# 栈 需要什么组件？
- router + views + component
 1. element-ui 框架
 2. component组件
   - Header.vue 头部组件
   - Footer.vue 尾部组件
   - Comment.vue 评论组件
   - Loading..vue 加载组件
    