const { mysql } = require('../../mysql') //引入mysql.js

//抛出模块，我们这里放上异步 
module.exports=async (ctx) =>{
    //1.抛出去一个轮播图
    // mysql的查询语句，是否存在一个叫nideshop_ad的表(里面是轮播图)
    const banner = await mysql('nideshop_ad').where({
        ad_position_id:1
    }).select()   // 找到就调用select()方法

    ctx.body={
        'banner':banner,
    }
}
    