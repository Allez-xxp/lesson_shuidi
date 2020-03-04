// 建表 collection；文章表
// 1. Schema 表设计
// 2. 模型对象，返回数据

const mongoose = require('mongoose');
// 实例化一个mongoose.Schema
const schema = new mongoose.Schema({
    uid: {  //用户id的名称
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    title: {type: String },
    isTop: {type: Boolean }, //是否将文章置顶
    summary: {type: String }, //列表里的介绍
    body: {type: String },  //内容
    // Article表与Category表有一对多关系，外键
    categories:[{type: //数组型,分类
    mongoose.SchemaTypes.ObjectId, ref:'Category'}]  
})
//相当于类，表名为articles
module.exports = mongoose.model('Article',schema,'articles');