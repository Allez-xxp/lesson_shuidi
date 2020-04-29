const mongoose = require('mongoose')

// 5G时代，数据由机器收集；
// mongodb比MySQL更优秀；
// mysql 数据表提前设计好字段，遵循数据库三大范式
// mongodb doc 文档 存储的内容是动态的： 
// 1. 没有创建表？  {} => save 存到collection
// 2. NOSQL，不需要SQL语句的语法
// 移动时代， 5GAI时代

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  //必填
    },
    // 位置，定位：经纬度 latitude，longtide
    location: {
        type: [Number],  //用于经纬度形容[111,98]
        index: "2d" , //索引；//作用：2d索引 location会将type和index组成一个平面，快速的将数据库中的经纬度计算
        sparse: true //索引的另一个声明 满足散落在各个地方的
    }
})

const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop;