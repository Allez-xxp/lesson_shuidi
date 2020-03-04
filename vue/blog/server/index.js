const express = require('express');
const app = express();
//如何将db.js引入？
// import es6 模块化
// vue中支持es5的require
// require('./db/db')(app); //负责数据库的连接
// 静态服务，将静态资源直接显示
app.use('/',express.static(__dirname + '/web'));

app.listen('1314',async(req,res) =>{
    console.log('http:localhost:1314');
})
// 1.vue写完后，执行npm run build命令生成一包静态文件（index.html，app.js）
// 2.静态文件包放到服务器目录下，阿里云服务器上 Node
// 3. 把vue 网站发布？