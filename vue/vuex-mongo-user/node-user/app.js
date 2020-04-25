
//入口文件
const express = require('express');
const db = require('./db/db.js');
const router = require('./routes/index.js');
const app = express();
router(app);
app.listen('3000', ()=>{
    console.log("listen port 3000");
}); 
//但是这里是在3000端口，而我们的页面是在8080端口，所以要考虑跨域问题vue.config.js