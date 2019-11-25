-NOSQL
 MYSQL（传统的数据库）,关系型数据库
 database->table->fields

 NOSQL,不需要写SQL语句,非关系型数据库，适合于碎片化的，结构性不是很良好的数据存储
 JOSN obect {}.save()
 find({})  //查询信息
 Mongodb,云开发数据库就是线上版的，js语法的交互
 API式，支持JS的语法解析

 npm init -y 初始化
 npm install 插件名 //安装插件
 use 数据库名 ，切换数据库

 -MYSQL          MONGODB
 关系型数据库     NOSQL(新生的数据库)，Facebook,文档型
 show database;  show dbs;
           use db;
 tables;（表）    collectionns;（集合）
 SQL             支持js语法的面向对象的API

-连接数据库mongodb
url(拥有mongodb协议，mongodb://)
-创建集合
db.createCollection('site'),function(err,res{
    //err 出错
    //异步，耗时的，js之中执行的代码不会阻塞，
    db.close();

})

代码顺序
1.createCollection
2.close() 在外面
执行顺序
1，create -> 去到mongodb ->create ->回来跟我说
2.js（异步）不等待，接着向后执行

-数据库之后，后端开发框架
express用法
node世界里，后端就是一个APP
app.get('/',(req,res)=>)  // 箭头函数，请求加上响应
res.send('hello world')   //回复
app.listen(3000,)  //在3000端口上