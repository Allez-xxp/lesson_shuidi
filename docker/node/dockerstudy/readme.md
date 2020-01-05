- Koa 是最流行的node 轻量级框架
  egg.js 基于koa的二次开发
- Koa new ->app->listen 启动koa
  /bin/www(无后缀)，www是网站项目的启动文件
  http.createServer(app.callback())创造一个服务器
- 模板
  网站开发的views
  koa-views()
  app.use()启用views中间件
  模板在哪?使用哪种模板引擎？
  koa-views中指定，引擎->pug
- 设置路由,路由要分层
  routes/index.js
  koa-routes()才能做：
  .get post
  index.routes()->
  app.use()
- logger 访问记录
koa-logger
- 出错模板
- https://img.bosszhipin.com/beijin/mcs/banner/20171031/84ade9701fd02a77fedb6675600a134f33d208e8d6fc287973c46e5cb5346f06.png?x-oss-process=image/resize,w_100,limit_0
资源类型：静态资源，服务器端资源
找IP地址:
  静态资源：img.bosszhipin.com
  步骤：进行DNS解析；询问网络供应商（提供动态IP地址）---DNS解析对应IP地址表；公司会在网络供应商机房里安装cdn机器（负载均衡）；若本地（网络供应商机房）没有，就去中央服务器请求一次，则缓存到本地（网络供应商机房）
  服务端资源：

- koa-static
- 表单提交
  koa-bodyparser: 
  GET:请求头部里 head，get url?a=1&b=2
  POST：数据请求，head (url,body.length) + body

## node的发布
    docker,容器化

node项目，写完后,测试工程师（配置相同环境？）
docker功能：让项目在不同机器里，享用相同的环境运行（迅速）
docker images
启动镜像
docker run --name dockerstudentcontainer -d -p 1234:1234 -d -p id
