// 用户表的Schema
const mongoose = require('mongoose');
// bcrypt生成和验证一个加密串
const bcrypt = require('bcrypt');
const schema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        // 获取用户数据的时候，不要把密码去出去
        select: false, //查询功能，设置 update insert
        set(val) {  //进行insert操作时，在数据库层进行哈希操作，不会存储明文密码
            return bcrypt.hashSync(val,10)
        }
    },
    //用户跟文章的关系？一对多
    
})

module.exports = mongoose.model('User',schema,'users');