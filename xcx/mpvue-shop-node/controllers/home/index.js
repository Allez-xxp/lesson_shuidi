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
    const brandList = await mysql('nideshop_brand').where({
        is_new: 1
    }).orderBy('new_sort_order','asc').limit(4).select()

    // 4. 新品首发
    const newGoods = await mysql('nideshop_goods').whereIn('id', [1181000, 1135002, 1134030,1134032]).andWhere('is_new',1).select()

    // 5. 人气推荐
    const hotGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price','goods_brief').where({
        is_hot: 1
    }).limit(5).select()
    //column:分别出字段；limit(5)：只查出5个数据

    // 6. 专题精选
    const topicList = await mysql('nideshop_topic').limit(3).select()

    // 类别列表（各种好物）
    const categoryList = await mysql('nideshop_category').where({
        parent_id: 0
    }).select()
    const newCategoryList = []

    for(let i = 0; i < categoryList.length; i++) {
        let item = categoryList[i]
        let childCategoryIds = await mysql('nideshop_category').where({
            parent_id: item.id
        }).column('id').select()
        childCategoryIds = childCategoryIds.map((item) => {
            return item.id
        })
        const categoryGoods = await mysql('nideshop_goods').column('id','name','list_pic_url','retail_price').whereIn('category_id',childCategoryIds).limit(7).select()
        newCategoryList.push({
            'id':item.id,
            'name':item.name,
            'goodsList':categoryGoods
        })
    }

    ctx.body={
        'banner':banner,
        'channel':channel,
        'brandList':brandList,
        'newGoods':newGoods,
        'hotGoods':hotGoods,
        'topicList':topicList,
        'newCategoryList':newCategoryList
    }
}
    