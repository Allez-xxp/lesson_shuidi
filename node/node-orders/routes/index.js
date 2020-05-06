const express = require('express');
const orders = express.Router();
const db = require('../db/db.js');
const Order = require('../models/order.js');

orders.get('/',(req,res)=>{
    // res.json({
    //     msg: 'ok' //测试一下是否连接成功
    // })

    //希望在查询的时候加一个参数过去 http://localhost:3000/orders?page=1&limit=20
    //总共是有10万条数据，以字节为单位，取第几页page的多少条内容 limit
    // 越过前面的多少条:skip 取第9页的就是 8*limit
    // 要查询总数，才可以分页，10万条
    // 要得到某一页限制多少条数据
    let {page = 1, limit = 20} = req.query; //把查询字符串中的数据拿出来  解构并提供初值
    page = parseInt(page);
    limit = parseInt(limit);
    // res.json({
    //     page,
    //     limit
    // })
    // http://localhost:3000/orders?page=101&limit=20 //"{"page":"101","limit":"20"}"
    Order.countDocuments({}, (err, count) => { //mongodb中的count查询 查总数，一般是独立于列表查询的
        //用一个回调函数，处理出现错误的情况
        if(err) {
            res.json({
                status: 400, //4开头的状态码是来自客户端的，5开头的是来自服务器端的
                msg: JSON.stringify(err)
            })
        }
        //1. 找到count
        // res.json({
        //     count
        // })
        // 2. 找到第几页的数据
        else {
            Order
                .find({})
                .skip((page - 1)*limit) //跳过去多页 游标
                .limit(limit) //从游标开始往后limit条数据（一页limit条数据）
                .sort({
                    'orderDate': -1 //按时间进行降序排序
                }) 
                .exec((err,docs)=>{
                    if(err) {
                        res.json({
                            status: 400,
                            msg: JSON.stringify(err)
                        })
                    } else {
                        res.json({
                            status: 200,
                            result: docs, //mongodb中一个集合其实就是在查询一个文档
                            total: count,
                            msg: 'ok'
                        })
                    }
                })
        }
    })

     
    
})

module.exports = (app)=>{
    app.use('/orders',orders);
}