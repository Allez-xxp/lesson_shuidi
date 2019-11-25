//node 开发框架
//异步无阻塞，node可以支持更高的并发
const express = require('express'); //require引入node没有的插件
//启动一个webapp
// const app = express();
// app.get('/',(req,res)=>
//  res.send('hello world!'))
// app.listen(3000,() =>
//  console.log('Example app listening on port 3000!'));

const ejs = require('ejs'); //模板引擎
const app = express();
//mongodb 数据库驱动
var MongoClient = require('mongodb').MongoClient;
//mongodb连接是用mongodb://协议， 27017是端口
// mysql端口 3306
var url = 'mongodb://192.168.31.128:27017/runoob';
var dbbase;
MongoClient.connect(url,{
    useNewUrlParser:true
},function(err,db){
    if(err){    //抛出异常
        throw err;
    }
    // console.log('数据库已创建');
    dbbase = db.db("runoob");
});
app.get('/',(req,res)=>{
    dbbase.collection("xxp_site")
    .find({"name":"赵丽颖"})
    .toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        // db.close();
        ejs.renderFile("views/index.html",{
            title:'hello',
            items:result
        },function(err,data){
            res.end(data);
        })
    })
})
app.listen(3000);
