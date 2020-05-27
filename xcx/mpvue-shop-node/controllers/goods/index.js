const {mysql} = require('../../mysql')

// 获取商品详情页数据
async function detailAction(ctx) {
    // 获取前端调用接口传过来的参数
    const goodsId = ctx.query.id
    const openId = ctx.query.openId
    console.log(goodsId)
    // 1. 获取商品信息
    const info = await mysql('nideshop_goods').where({
        'id': goodsId
    }).select()
    // 2. 获取商品图片; 图片表nideshop_goods_gallery与商品表nideshop_goods的关联表
    const gallery = await mysql('nideshop_goods_gallery').where({
        'goods_id': goodsId
    })
    // 3. 获取商品参数
    // 这张表nideshop_goods_attribute中有所有商品的参数
    // 我们现在要日式和风懒人沙发这件商品的参数，那就需要根据某一个特殊的字段取，根据id取
    // 所以我们这张参数表也是商品表nideshop_goods的关联表，所以我们去查询这张表
    // nideshop_attribute对应到这张表的所有的参数信息，为什么分两张表存？参数的类型不一样分开存储有助于更好的构建后端的数据库
    const attribute = await mysql('nideshop_goods_attribute')
    // 区分（column）当前这张表中的value:nideshop_goods_attribute.value还有一张表，nideshop_attribute也是关联表
    .column('nideshop_goods_attribute.value', 'nideshop_attribute.name')
    // 然后使用leftJoin方法,这两张表参杂使用，关联查询两张表
    .leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id','nideshop_attribute.id')
    .where({
        // 会匹配传过来的id和要查询的这张表中的goods_id,
        //  匹配到了就会把nideshop_goods_attribute表中的所有数据去出来，
        // 并且还会关联去取nideshop_attribute表中的attribute_id跟nideshop_goods_attribute.attribute_id相同的数据。
        'nideshop_goods_attribute.goods_id': goodsId
    }).select()
    // 向前端页面输出
    ctx.body = {
        'info':info[0] || [],  
        'gallery':gallery,
        'attribute': attribute
    }
}

module.exports = {
    detailAction
}