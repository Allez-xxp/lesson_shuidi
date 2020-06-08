const {mysql} = require('../../mysql')

// 获取分类列表商品数据（导航栏）方法
async function categoryNav(ctx) {
    const categoryId = ctx.query.id
    // 获取分类(导航栏)，显示当前点击的类型的商品数据
    const currentNav = await mysql('nideshop_category').where({
        'id': categoryId
    }).select()
    // 获取他的同类
    const navData = await mysql('nideshop_category').where({
        'parent_id': currentNav[0].parent_id
    }).select()
    ctx.body = {
        navData,
        currentNav:currentNav[0]
    }
}

module.exports = {
    categoryNav
}