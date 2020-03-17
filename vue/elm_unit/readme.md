vue的全栈开发

问题：
跨项目，先定义好接口
1. 用户名，密码   node负责
  后台发送请求 (user_name,password
  vue.config.js--proxy(代理))-> node
  status api开发经验 约定好数据接口
  {
      status: 1|0 , //1委用户名密码正确；0为有误
      message: '用户名和密码有误'
  }
  URL传送数据（data），返回response（约定）

  mock.js. 没有后台支持的情况下，模拟数据

1. 代码的封装（模块化）
   admin 模块化 vue export default {} + import from
   main.js es6 模块化
   api common.js require('')+ module.exports
   - 为什么？ vue单页应用，es6前端（发展前卫）；babel+webpack
   node后端，以稳定为主，版本更新较慢；common.js(原生)
   - 如何统一前后端的模块化？
     向先进的一方靠拢
   
  - 三个项目
    项目上线，用怎么样的方式？
    elm单页应用 ->打包dist/ ->重命名为web/
    elm-admin ->打包dist/ ->重命名为admin/ 
    上线在node项目中，放在api下
    配置express static

    yarn build 打包项目dist/
    web 将作为项目的前台 /
    admin 后台 /admin
    api 服务 没有页面
    localhost:3000/ 才是所有人（用户|编辑）
    localhost:3000/  web 前台
    localhost:3000/admin
    localhost:3000/api/admin/login
