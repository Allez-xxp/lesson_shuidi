//用户模型对象
var mongoose = require('mongoose');
// mongoose中login，register由他负责

//中小型mall
// mongodb是文档型(doc); 
// 第三范式要求没有那么强，可以杂糅，包容性好；
// 优点：包容前期的设计冗余，特别适合在移动时代，或者在后来的5G物联网时代，数据不规整，需要动态调整
const userSchema = new mongoose.Schema({
    "userId": String,  //生成为一用户id 不用mongodb自带的objectId
    "name": String,
    "avatar": String,
    "userName": String,
    "userPwd": String,
    //杂糅
    // 购物车列表
    "cartList": [  //一对多
        {
            productId: String,
            productImg: String,
            productName: String,
            checked: String,
            productNum: Number,
            productPrice: Number
        }
    ],
    // 地址列表
    'addressList': [
        {
            "addressId": Number,
            "userName": String,
            "streetName": String,
            "tel": Number,
            "isDefault": Boolead
        }
    ]
})

const User = mongoose.model('User',userSchema);
module.exports = User;