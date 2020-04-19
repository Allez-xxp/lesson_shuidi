const express = require('express');
const app = express();
const config = require('./config');  //用来连接数据库 
const bodyParser = require('body-parser');  //第三方库，中间件处理，解析传过来的东西，要拿到用来处理表单的提交，要yarn add的
const todo = require('./router/index');  //路由引入
const mongoose = require('mongoose');
mongoose.connect(config.mongodb);
// config任务：
// 1. port 端口 
// 2. 数据库连接

// 处理路由是由一个个中间件来处理的，按序处理， 比路由更早去处理http请求（有三次握手，以字节流传输）头数据的收集，所以写在路由前面
// 字节流 ，传输过来的时候会触发事件： on('data'). on('loaded')
// 第一次发送的是请求头，包含url，以及要发送过去的请求体的length 
// 每次到达后，字节流数据json化一下（post请求是慢慢到达的，get请求不会去处理），放req.body中去
app.use(bodyParser.json()) //post  get  next   req res next huayixia
//将沿着url传过来的数据进行编码，extended=true,要扩展一下
app.use(bodyParser.urlencoded({ extended: true}))

//启用路由
app.use('/todo', todo);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
})