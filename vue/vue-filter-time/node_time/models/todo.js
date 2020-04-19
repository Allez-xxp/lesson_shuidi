const mongoose = require('mongoose')

//数据存储是目的，但不猴急。
// 数据存储是一个物理需求，首先要有一个模型设计，根据如何使用来设计（目的）
const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    address:String,
    content:String,
    // 开始和结束的日期 后端node的日期处理
    start: {
        type: Date,
        default: Date.now() //mongodb可以解析Date.now()
    },
    end: {
        type: Date,
        default: Date.now() //mongodb可以解析Date.now()
    },
    created_at: {
        type: Date,
        default: Date.now() //mongodb可以解析Date.now()
    },
    update_at: {
        type: Date,
        default: Date.now() //mongodb可以解析Date.now()
    },
})

const Todo = module.exports = mongoose.model('Todo',todoSchema)
//存进去后数据库名为todo,操作时加上表名为todos
// db.todos.find({}).pretty();