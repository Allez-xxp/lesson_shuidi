const searchRouter = require('./search.js');
// 模块化划分
module.exports = (app)=>{ //向外输出一个函数他会传app过来
    app.use('/search', searchRouter);  //app上才有能力去使用use
}