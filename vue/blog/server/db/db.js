// 业务层和数据库层分离
module.exports = app => {
    // mongoose是mongodb的驱动
    const mongoose = require('mongoose');
    // 连接数据库
    mongoose.connect('mongodb://localhost:27017/myblog', {
        useNewUrlParster: true
    })

}