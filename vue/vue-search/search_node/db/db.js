const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,   //使用url的协议，定位机器在哪里，未来会有很多台机器
    useUnifiedTopology: true //使用统一的资源定位
});

mongoose.Promise = global.Promise;  //将mongodb中的异步处理交给node中的异步来做
const db = mongoose.connection;    //这是一个连接对象，会返回一个db操作距离
db.once('open',()=>{ //只打开一次
    console.log('连接数据库成功');
})
db.on('error',()=>{

})
module.exports = db; //向外输出db