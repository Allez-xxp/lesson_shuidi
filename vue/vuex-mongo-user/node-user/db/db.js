const mongoose = require('mongoose');
//mongoose.use('useCreateIndex',true) //http://www.360doc.com/content/19/0923/15/13328254_862739286.shtml
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
// 使用 Node 自带 Promise 代替 mongoose 的 Promise,
mongoose.Promise = global.Promise;
const db = mongoose.connection;
//执行成功的回调函数
db.once('open',()=>{
    console.log('数据库连接成功');
})
//执行失败的回调函数
db.on('error',function(error){
    console.log('fail to connect mongodb'+ error);
    mongoose.disconnect();
})

module.exports = db;