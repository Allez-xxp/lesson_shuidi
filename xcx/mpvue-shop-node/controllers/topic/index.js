const {mysql} = require('../../mysql')

// 获取专题列表数据方法 listAction
async function listAction(ctx) {
    let page = ctx.query.page || 1  // 以防万一没拿到数据，默认page为1
    const size = 5  // 一次显示5条数据
    // 分页处理
    const data = await mysql('nideshop_topic')
    .column('id','title','price_info','subtitle','scene_pic_url')
    .limit(size).offset((page - 1) * size)
    const data1 = await mysql('nideshop_topic')
    .column('id','title','price_info','subtitle','scene_pic_url').select()
    const total = parseInt(data1.length / 5)  // 表示总页数

    ctx.body={
        'page': page,
        'total': total,
        'data': data
    }
}

// 获取专题商品详情数据方法 detailAction
async function detailAction(ctx) {
    const id = ctx.query.id
    let data = []
    if(id) {
        data = await mysql('nideshop_topic').where({
            'id': id
        }).select()
    } 
    const recommendList = await mysql('nideshop_topic')
    .column('id','title','price_info','subtitle','scene_pic_url').limit(4).select()

    ctx.body = {
        'data': data[0],
        'recommendList': recommendList
    }
}

module.exports = {
    listAction,
    detailAction
}