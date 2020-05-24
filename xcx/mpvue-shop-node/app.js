// 整个后端最外层的js文件
//若没有koa,所以要在项目中引入koa,安装一下koa这个依赖
const Koa = require('koa')
const app = new Koa()  //new koa的实例
// 引入koa-bodyparser中间件
const bodyParser = require('koa-bodyparser')
// const Router = require('koa-router')  //剪切了路由，放到routes/index.js文件中
const config = require('./config')
const router = require('./routes')

// 解析请求体
app.use(bodyParser())
// const app = new Koa()  //new koa的实例
// new了实例之后就要拿到router
// 剪切了路由的实例化, 不需要const router = new Router()


//router.get相当于在定义接口为了使项目可读性更高，我们分开来写在项目中新建routes文件夹index.js中
// router.get('*', (ctx, next) => {
//     ctx.body = 'hello world'
// })

// 项目除了需要路由，还得要控制层controllers，用来分别控制不同的功能需要用到的代码

// 启动路由：
app.use(router.routes()) //加了一个.routes()方法

app.listen(config.port,() => {
    console.log(`server is started at port ${config.port}`)
})