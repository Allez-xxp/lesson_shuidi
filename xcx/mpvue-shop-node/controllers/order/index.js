const {mysql} = require('../../mysql')

// 立即购买的订单数据操作方法
async function submitAction(ctx) {
    const {openId} = ctx.request.body
    let goodsId = ctx.request.body.goodsId
    let allPrice = ctx.request.body.allPrice

    // 判断是否存在订单
    const isOrder = await mysql('nideshop_order').where({
        'user_id': openId
    }).select()
    if(isOrder.length>0) {
        const data = await mysql('nideshop_order').where({
            'user_id': openId
        }).update({
            user_id: openId,
            goods_id: goodsId,
            allprice: allPrice
        })
        if(data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    } else {
        const data = await mysql('nideshop_order').insert({
            user_id: openId,
            goods_id: goodsId,
            allPrice: allPrice
        })
        if(data) {
            ctx.body = {
                data: true
            }
        } else {
            ctx.body = {
                data: false
            }
        }
    }
}

// 获取收货地址相关信息方法
// 获取商品地址等信息
async function detailAction(ctx) {
    const openId = ctx.query.openId;
    const addressId = ctx.query.addressId || '';
    const orderDetail = await mysql('nideshop_order').where({
        'user_id': openId        
    }).select()
    // console.log(orderDetail);

    var goodsIds = orderDetail[0].goods_id.split(',') //以逗号切割开来
    // console.log(goodsIds); 
    
    const list = await mysql('nideshop_cart').andWhere({
        'user_id': openId,
    }).whereIn('goods_id', goodsIds).select()
    // console.log(list);
    // 收货地址
    var addressList;
    if(addressId) {
        // 新建的收货地址都要存到数据库中去的
        addressList = await mysql('nideshop_address').where({
            'user_id': openId,
            'id': addressId
        }).orderBy('is_default', 'desc').select()
        // 数据库里面有一个is_default字段，为1就是默认地址，为0就是有这条数据，但不是默认地址
    } else {
        // 前端没传的话，就不用找了
        // 这里就是用来区分是默认还是不是默认地址的一个操作
        addressList = await mysql('nideshop_address').where({
            'user_id': openId
        }).orderBy('is_default', 'desc').select()
    }
    // console.log(orderDetail); //在订单那个表里面有一个allprice 单价
    ctx.body = {
        price: orderDetail[0].allprice,
        goodsList: list, //购物车列表中取出来的数据 //根据order表往cart表中取出来的数据
        address: addressList[0] || {} //取到了就放，没取到就放空对象
    }
}

// 先抛出
module.exports = {
    submitAction,
    detailAction
}
