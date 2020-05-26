const { mysql } = require('../../mysql')

// 接口请求准备工作
// 2.获取热门搜索记录（包含默认关键字和热门关键字；历史记录）
async function indexAction(ctx){
    //因为我们index.vue里面传参是用路由后面拼接问号传的，所以是query
    const openId = ctx.query.openId  
    // 默认关键字(有一张专门存关键字的表nideshop_keywords)
    const defaultKeyword = await mysql('nideshop_keywords').where({
        is_default:1
    }).limit(1).select()
    
    // 因为当前我们的接口(routes/index里的get('search/indexaction))是要做成既能取热门搜索，又能取搜索历史的，所以现在这里两个都要设置。
    // 热门关键字
    // .distinct(不同的keyword)取出（去重），Column分类
    const hotKeywordList = await mysql('nideshop_keywords')
    .distinct('keyword').column('keyword','is_hot').limit(10).select()
  
    // 获取搜索历史记录
    const historyData = await mysql('nideshop_search_history').where({
        'user_id':openId //必须要根据openId,因为是你自己的数据就只有自己能取出来，不会看到别人的历史
    }).limit(10).select()
    
    ctx.body = {
        'defaultKeyword':defaultKeyword[0],  //类型为数组
        'hotKeywordList':hotKeywordList,
        'historyData':historyData
    }
}


// 1.添加搜索历史：只要在页面上面输入了内容并且去执行了搜索，那么输入的内容就要放到服务器，放到数据库被保存下来，以作下一次再点开搜索页面的搜索历史的展示
async function addHistoryAction(ctx){
    // 就是index.vue中searchWorlds方法里面的data数据，
    // 因为我们做接口请求传过来的参数就是被ctx.request.body拿到，然后再把拿到的两个参数解构出来
    const { openId,keyword} = ctx.request.body 
    //先获取到上一次的搜索记录(是有一张表（历史搜索记录）nideshop_search_history)
    const oldData = await mysql('nideshop_search_history').where({
        'user_id': openId, //就是传过来的this.words
        'keyword': keyword
    })
    console.log(oldData);
    // 如果有就去执行取出，有，就说明当前表中已经保存了这条数据了，也就是说其实我现在搜索的记录其实已经保存到数据库中了，
    // 也就是不用再做第二次保存了，这也是为什么要先查找匹配的原因
    if(oldData.length == 0){
        const data = await mysql('nideshop_search_history').insert({  // 插入数据insert()
            'user_id': openId,
            'keyword': keyword,
            'add_time': parseInt(new Date().getTime() / 1000) //转换成时间戳的格式保存起来
        })
        if(data){ //data存在，那就是插入成功
            ctx.body = {
                data:'success'
            }
        } else {
            ctx.body = {
                data:'fail'
            }
        }
    } else {
        ctx.body = {
            data:'已经有记录了'
        }
    }
}

// 清空历史记录的方法clearHistoryAction
async function clearHistoryAction(ctx) {
    // 可以拿到前端传来的openId
    const openId = ctx.request.body.openId  
    // console.log(openId)
    const data = await mysql('nideshop_search_history').where({
        // 判断user_id和openId的值是否相等
        'user_id': openId
    }).del() //若相等则删除; 返回值是删除了多少条数据
    if(data) {
        ctx.body = {
            'data': '清除成功'
        }
    } else {
        ctx.body = {
            'data': 'null'
        }
    }
}

// 搜索时匹配搜索相关内容方法helperAction
// 包含输入提示语方法，获取商品列表数据order
async function helperAction(ctx) {
    // 使用get方法传参，使用query接收
    // 应该做一个防抖，防止输入数据过多，之后再做
    const keyword = ctx.query.keyword
    // console.log(keyword)
    var order = ctx.query.order
    if(!order) {
        order = ''
        orderBy = 'id'
    } else {
        orderBy = 'retail_price'
    }

    const keywords = await mysql('nideshop_goods').orderBy(orderBy, order)
    .column('id','name','list_pic_url','retail_price')  // column：按照什么分段
    .where('name','like','%' + keyword + '%').limit(10).select() // where: 是否存在什么什么的数据输出；关键字相关查询
    if(keywords) {
        ctx.body = {
            keywords
        }
    } else {
        ctx.body = {
            keywords: []
        }
    }
}

//模板抛出，先把方法抛出去，以保证routes/index的相关接口能获取到
module.exports = {
    addHistoryAction,
    indexAction,
    clearHistoryAction,
    helperAction
}