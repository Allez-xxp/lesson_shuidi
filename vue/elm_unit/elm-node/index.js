// 入口文件
const express = require('express');
const app = express();

// 路由的模块化 
const router = require('./routes/index.js');
router(app);

app.listen("3000", () =>{
    console.log('api服务器上线啦');
})