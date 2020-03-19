const mongoose = require('mongoose');
// mongodb在硬盘，为物理模型 -》上升为逻辑模型
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poster: String,  /*封面由URL（比较大）传输*/
    rating:String,  //比分
    introduction: String, //说明
    // 大多数表的时间类型的直接声明
    created_at: {
        type: Date,
        default: Date.now  //如果不赋值，会自动使用默认值
    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie