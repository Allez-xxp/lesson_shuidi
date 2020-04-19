const express = require('express'); //express生成路由
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// console.log(typeof ObjectId);??出不来？
const moment = require('moment');
const Todo = require('../models/todo');//将模型层的todo.js引入
// restful 
//用post表示新增一个对象
router.post('/', (req, res) => {
// 存时间时， 给日期的字符串 html表单的提交 
//   console.log(req.body); //请求体
//   调用mongoose里的create方法，创建一条物理的存储实例
//   每次到达后，字节流数据json化一下（post请求是慢慢到达的，get请求不会去处理），放req.body中去
  Todo.create(req.body, (err, todo) => { //存完后通过一个回调函数看看是否存储成功
    if (err) {
      res.json(err)
    } else { //存储完了把存储的东西再取出来一下
      res.json(todo)
    }
  }) //数据库是BSON文件，一个数据就是一个doc
})

router.get('/:id',(req,res)=>{ //使用id查询
  const id = req.params.id; //id是一个参数
  Todo.findOne({
    "_id" : ObjectId(id) //"_id",是mongodb中会自动生成的，由hash字符串生成的
  }, (err, todo)=> {
    console.log(todo.start)
    console.log(new Date(todo.start).getMonth()+1)
    console.log(moment(todo.start).format('MMMM Do YYYY, h:mm:ss a'))
    res.json({
      err,
      todo
    })
  })
})
//要向外输出路由对象
module.exports = router