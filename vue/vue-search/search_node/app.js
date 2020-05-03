// 入口文件
const express = require('express');
const db = require('./db/db.js'); //连接数据库
const router = require('./routes/index.js');
const app = express();
router(app) //启动路由
app.listen('3000', () => {
    console.log('online')
})