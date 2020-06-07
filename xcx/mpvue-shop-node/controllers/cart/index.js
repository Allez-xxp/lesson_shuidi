const {mysql} = require('../../mysql')

// 定义添加购物车方法
async function addCart(ctx) {
    const {openId, goodsId, number} = ctx.request.body
    // 逻辑：要判断这件商品是否已经加过，有就是增加具体的数字
    // 没有就是插入完整的数据

    // 判断购物车是否包含此商品数据
    const haveGoods = await mysql('nideshop_cart').where({
        'user_id':openId,
        'goods_id':goodsId
    }).select()
    if(haveGoods.length === 0) {  //?????
        const goods = await mysql('nideshop_goods').where({
            'id':goodsId
        }).select()
        const { retail_price, name, list_pic_url } = goods[0] //是一个数组
        // 如果不存在，即没有加入过购物车。就插入数据到数据库
        await mysql('nideshop_cart').insert({
            'user_id':openId,
            'goods_id':goodsId,
            number, //植入一个number的值（字段）
            'goods_name':name,
            retail_price, //这些都没有，我们就在表中植入，放上这些关键字
            list_pic_url
        })
    } else {  // 如果购物车中有该商品，就只修改数量number即可
        const oldNumber = await mysql('nideshop_cart').where({
            'user_id':openId,
            'goods_id':goodsId
        }).column('number').select()
        // 如果原本就有这条数据，就更新数据
        await mysql('nideshop_cart').where({
            'user_id':openId,
            'goods_id':goodsId
        }).update({
            'number':oldNumber[0].number + number
        })
    }

    ctx.body = {
        data: 'success'
    }
}

// 定义获取购物车列表数据方法
async function cartList(ctx) {
    const {openId} = ctx.query
    const cartList = await mysql('nideshop_cart').where({
        'user_id': openId
    }).select()
    ctx.body = {
        data: cartList
    }
}
module.exports = {
    addCart,
    cartList
}