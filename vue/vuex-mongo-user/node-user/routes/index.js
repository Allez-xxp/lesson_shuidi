const express = require('express');
const user = express.Router();
const db = require('../db/db.js');
const User = require('../models/user.js');

user.get('/', async(req, res)=>{
    // 取数据
    User //使用模型
        .find({})
        .exec((err,concats)=>{ //mongoose exec运行一下
            res.json(concats);
        })
})
user.get('/tag/:tag', async(req, res)=>{
    // console.log(this.arguments);
    const tag = req.params.tag;
    console.log(tag, 'node');
    User
        .find({tags: tag}) //直接写tag就行
        .exec((err, users) => {
        res.json(users)
        })
})

module.exports = (app) =>{
    app.use('/users',user); //在user模块下，提供了两个get
}
//http://localhost:3000/users/ 看效果