//单点入口
const Koa = require('koa');
const config = require('./config/default.js');  //配置文件
const postRouter = require('./routers/posts.js');
const signinRouter = require('./routers/signin.js');
const app = new Koa();
//模板引擎
const ejs = require('ejs'); 
//处理模板
const views = require('koa-views');  
//路径模块
const path = require('path');
app.listen(config.port);
//use,应答模式,中间件是处理应用请求的核心
//启用一个路由，中间件
//启用模板
app.use(
    views(
        path.join(__dirname,'./views'),{  //绝对路径，查找文件，渲染模板
            extension:'ejs'
    }
))
// app.use(require('./routers/posts.js').routes());
app.use(postRouter.routes());

//负责登录相关的get,post;启用中间件
app.use(signinRouter.routes());
console.log(`listen on port ${config.port}`);