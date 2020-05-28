const {mysql} = require('../../mysql')

// 添加收藏addCollect方法
async function addCollect(ctx){
    const {openId, goodsId } = ctx.request.body
    // console.log(openId, goodsId) //可以拿到前端传过来的参数
    // 判断用户是否收藏过，若收藏过，就取消收藏
    const iscollect = await mysql('nideshop_collect').where({
        'user_id':openId,
        'value_id':goodsId
    }).select()
    if(iscollect.length == 0) {
        // 如果没有查询到，就插入要收藏的数据给数据库
        await mysql('nideshop_collect').insert({
            'user_id':openId,
            'value_id':goodsId
        })
        // 向前端页面输出
    ctx.body = {
        data:'收藏成功'
    }
    } else {
        // 如果查询到已收藏，就从数据库删除收藏信息
        await mysql('nideshop_collect').where({
            'user_id':openId,
            'value_id':goodsId
        }).del()
        ctx.body = {
            data:'取消收藏'
        }
    }
    
}

// 导出方法
module.exports = {
    addCollect
}