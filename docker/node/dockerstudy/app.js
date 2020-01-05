const Koa = require('koa');
const app = new Koa();
const views=require('koa-views');
const logger=require('koa-logger');
const onerror=require('koa-onerror');
const bodyparser = require('koa-bodyparser');
//中间件式 网站模板  __dirname当前项目的物理路径->网站模板所在位置
//分层
const index=require('./routes/index')
const fs=require('fs');

onerror(app);
// ctx.body响应体
// app.use(ctx=>{
//     ctx.body=fs.createReadStream('dffaf');//先500错误 const fs后才是文件错误
// });
app.use(bodyparser({
    enableTypes:['json','form','text']
}));
app.use(require('koa-static')(__dirname + '/public'))  
app.use(views(__dirname+'/views',{
    extension:'pug'//模板引擎
}));

// 启用
app.use(logger());
// index.routes()取出index下所有路由，routes()->route数组,index.allowedMethods()允许所有的访问方式
app.use(index.routes(),index.allowedMethods())
//向外输出app，模块化语句，由node支持的COMMONJS
module.exports=app;