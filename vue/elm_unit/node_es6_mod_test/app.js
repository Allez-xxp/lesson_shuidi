// 入口文件
// const express = require('express'); 
//es5支持的common.js
import express from 'express';
const app = express();  //node部分支持es6

app.listen("1234", () =>{
    console.log('api服务器上线啦');
})