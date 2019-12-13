koa,是node的轻量级开发框架

comment create table
字段：
id 
name 用户名
content
moment 评论时间
postid 外键,文章id
avatar 用户头像

blog中
mvc开发模式必要的文件夹
routers,网站所有的路由层
public,静态资源,css,js.
views,所有视图
middlewares,中间件
controller控制器层
model数据模型层
test测试文件夹
config可以设置数据库，网站的基本配置



-mvc,设计模式
routers,一个模块一个文件

npm i koa koa-router koa-views ejs koa-static mysql koa-bodyparser

ctx.body ='',表示向外返回一个文本文件，''表示返回的内容
async () => {} //异步请求