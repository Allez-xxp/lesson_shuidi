// 文章的分类（前后端）的Schema
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title:{type: String}
})

module.exports = mongoose.model('Category',schema,'categories');