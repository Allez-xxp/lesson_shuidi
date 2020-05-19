const { mysql } = require('../../mysql') //引入mysql.js

//抛出模块，我们这里放上异步 
// 使用同一个接口，负责获取轮播图,类型数据,品牌列表（商品）
module.exports=async (ctx) =>{
    // 1.轮播图
    // mysql的查询语句，是否存在一个叫nideshop_ad的表(里面是轮播图)
    const banner = await mysql('nideshop_ad').where({
        ad_position_id:1
    }).select()   // 找到就调用select()方法

    // 2.类型table数据
    const channel = await mysql('nideshop_channel').select()

    // 3. 品牌列表（商品）
    const brandList = await mysql('nideshop_brand').select()

    ctx.body={
        'banner':banner,
        'channel':channel,
        'brandList':brandList
    }
}
    