const express = require('express');
const shop = express.Router();
const db = require('../db/db.js');
const Shop = require('../models/shop.js');

// 2d spare 是mongodb 内建的， 独有的功能
// 1. NOSQL 
// 2. 移动时代， 定位功能

// 作用：让数据流向前端
shop.get('/', async(req, res) => {
  Shop
    .find({
      location: { 
        $near: [28.6873380300,115.8340632900], // 地址反查 根据附近查找，偏差100m(国家安全问题); $:在mongodb里表示某个指令, 函数
        $maxDistance: 0.2 //2公里之内的；利用index进行最近距离排序 
        // $lt $  
      } // mongodb默认查出20条记录
    }).limit(5).exec(function(err, shops) {
      if (err) {
        console.log(err)
      }
      res.json(shops)
    })
})
// 手动添加数据
shop.post('/', async(req, res) => {
  console.log('---shops');
  const gqmx = new Shop({ //将模型文件实例化一下
    name: '正宗过桥米线(优乐汇店)',
    location: [115.83273,28.717934]
  });
 
  gqmx
    .save((err, saved)=> {
      res.json({
        status:1
      })
    })

  // const xhg = new Shop({ //将模型文件实例化一下
  //   name: '古乐牛香火锅',
  //   location: [28.6873380300,115.8340632900]
  // });
  // xhg
  //   .save((err, saved)=> {
  //     res.json({
  //       status:1
  //     })
  //   })
});

module.exports =  (app) => {
  app.use('/shops', shop);
}

