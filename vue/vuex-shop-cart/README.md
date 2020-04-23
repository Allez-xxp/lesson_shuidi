# vuex系列
- 全栈 js(前端) + node(后端)

- vue全家桶三巨头： vue + vue-router | + vuex
前两个是必须的；大型项目时要用到vuex；vuex不是必需品
在项目中，vue作用是关于数据绑定，生命周期；vue-router作用是链接页面，形成单页应用。

- 大型项目开发 vue的企业级开发 核心：数据流管理
1. 组件开发
2. vuex数据设计

- api目录 数据接口
vuex开始于应用数据接口 api（总仓库）其中的数据流-》store-》组件中

- api目录下shop.js
数据来源；提供接口，对后端进行请求

- 数据流
1. 切页面App.vue 
2. 走接口，即做好数据流
3. 切页面时加快速度，html标签要简洁

- api的数据流过程
api原来是直接到页面 api->页面，
现在是api->vuex->页面
api有更多东西时，用vuex来管理，因为如果由api直接给页面，数据流就容易出问题，所以用vuex(财务），用store管理，每笔钱的进出都记录下来，有问题的地方能够追溯components

- 运用store步骤
1. main.js中声明store；在根组件部分添加store。
2. store目录下index.js引入vue，vuex；定义一个Vuex Store（返回一个store实例）
3. vue的原型链上会添加一个$store, 根组件引用
<div v-for="(product,index) in $store.state.products" :key="index">
   