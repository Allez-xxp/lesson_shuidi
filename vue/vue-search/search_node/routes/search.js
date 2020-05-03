const express = require('express');
// 由express来生成路由对象
const search = express.Router();
const PostModel = require('../models/post.js');

search.get('/:keyword',(req,res)=>{
    const keyword = req.params.keyword;  //通过动态路由把keyword拿过来
    // console.log(keyword);
    //使用mongoose实现mongodb的复杂查询？需要有一个post.js模型,然后：
    //node中执行复杂数据查询 migration
    PostModel
        .find({  //查询
            $text:{  //文字查询
                $search: keyword
            }
        })
        .exec((err, posts)=>{ //exec可以执行一个.then或一个回调函数
            res.json(posts)
        })
})

module.exports = search;