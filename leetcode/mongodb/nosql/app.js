//mongodb 数据库驱动
var MongoClient = require('mongodb').MongoClient;
//mongodb连接是用mongodb://协议， 27017是端口
// mysql端口 3306
var url = 'mongodb://192.168.31.128:27017/runoob';
MongoClient.connect(url,{
    useNewUrlParser:true
},function(err,db){
    if(err){    //抛出异常
        throw err;
    }
    // console.log('数据库已创建');
    var dbbase = db.db("runoob");
    // 查询数据库是否异步？
    // dbbase.createCollection('xxp_site',//创建集合
    // function(err, res){  //回调方案
    //     //回调先处理错误 
    //     if(err) {
    //         throw err;
    //     }
    //     console.log('创建了集合');
    //      db.close(); //放在函数之中，在创建集合之后再关闭数据库
    // })  

    // 插入数据;JSON object
    // var myObj = {name:'赵丽颖',url:'www.runoob'};
    // dbbase
    // .collection("xxp_site")
    // .insertOne(myObj,function(err,res){
    //     if (err)
    //     throw err;
    //     console.log('文档插入成功');
    //     db.close();
    // })

    //查询数据
    dbbase.collection("xxp_site")
    .find({"name":"赵丽颖"})
    .toArray(function(err,result){
        if(err) throw err;
        console.log(result);
        db.close();
    })
})
