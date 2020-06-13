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

// 获取分类页面的菜单列表数据方法
async function indexAction(ctx) {
    const {id: categoryId} = ctx.query
    const data = await mysql('nideshop_category').where({
        'parent_id': 0
    }).select()
    const currentCategory = []
    // 如果categoryId存在，就去获取当前页面默认展示的商品数据
    if(categoryId){
        currentCategory = await mysql('nideshop_category').where({
            'parent_id': categoryId
        }).select()
    }

    ctx.body = {
        'categoryList': data
    }
}

// 点击左侧菜单获取的分类商品数据（右侧）方法
async function currentAction(ctx) {
    const {id: categoryId} = ctx.query

    const data = {}
    const currentOne = await mysql('nideshop_category').where({
        'id': categoryId
    }).select()
    const subList = await mysql('nideshop_category').where({
        'parent_id': currentOne[0].id
    }).select()
    data.currentOne = currentOne[0]
    data.currentOne.subList = subList

    ctx.body = {
        'data': data
    }
}

module.exports = {
    categoryNav,
    indexAction,
    currentAction
}