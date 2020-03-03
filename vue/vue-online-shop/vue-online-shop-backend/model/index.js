// 电商网站先做什么设计？ 订单设计
// 模型层映射成mongdb的驱动mongoose（底层的增删改查）；操作数据库
// products  商品(复数风格)；商家 collection（表）
// manufacturer 厂家

// 对数据表进行Schema设计（字段），负责商品的构建
// 数据库通过schema构建起来
// mongdb开发工作：new Schema ，save 存储数据
//设计数据库，Schema:数据库模型设计概念
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model =mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;
//第一个表product
const productSchema = Schema({
    id: ObjectId,   //mongdb中id写法:ObjectId，对象id，唯一的，哈希字符串
    name: String,   //商品名
    image: String,
    price: Number,  //9999
    description: String, //1亿像素
    //ref声明没有外键关系，组件；mongdb是非关系型数据库
    //两个表有关联关系
    manufacturer: { type: ObjectId, ref:'Manufacturer'}
})
//mysql，关系型数据库是什么关系？ 一对多
//第二个表manufacturer
const manufacturerSchema = Schema ({
    id: ObjectId,
    name: String
})
// 2.生成模型类映射数据库；用于保存数据
const Product = model('Product',productSchema);
const Manufacturer = model('Manufacturer',manufacturerSchema);
module.exports = {
    Product,
    Manufacturer,
}
