const {mysql} = require('../../mysql')
 
// 获取收货地址列表方法 getListAction
async function getListAction(ctx) {
    const openId = ctx.query.openId
    const addressList = await mysql('nideshop_address').where({
        'user_id': openId
    }).orderBy('is_default','desc').select()
    ctx.body = {
        data: addressList
    }
}

module.exports = {
    getListAction
}