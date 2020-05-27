const {mysql} = require('../../mysql')

// 获取商品详情页数据
async function detailAction(ctx) {
    // 获取前端调用接口传过来的参数
    const goodsId = ctx.query.id
    const openId = ctx.query.openId
    console.log(goodsId)
    // 获取商品信息
    const info = await mysql('nideshop_goods').where({
        'id': goodsId
    }).select()
    // 获取商品图片
    const gallery = await mysql('nideshop_goods_gallery').where({
        'goods_id': goodsId
    })
    // 向前端页面输出
    ctx.body = {
        'info':info[0] || [],  
        'gallery':gallery
    }
}

module.exports = {
    detailAction
}