// 定义所有接口；路由层
// 项目除了需要路由，还得要控制层，用来分别控制不同的功能需要用到的代码
// 完成路由的分发（分布式操作）
const router = require('koa-router')({
    // prefix就是给路由加路由前缀
    prefix:"/lm"
})
 //访问页面得知道端口路由
//在前端写了host，在后端引入koa-router的时候就要修改了
//const router=new Router()  这样我们就有路由可以用了,加了prefix就不用new了，直接使用我们引入进来的koa-router,不用new实例

// 我们在routes引用的controller其实就是controllers的index.js，所以在家index
const controllers = require('../controllers/index') //只引入到controllers，然后修改router.get()
// 现在的引入过来的其实是个箭头函数，我们抛出去的就是一个mapDir(就是个箭头函数)拿到的是个对象(tree），对象当中可以拿到文件的绝对路径


// router.get('/index/index',(ctx,next)=>{  //get是koa路由自带的，假设我请求任何路径*（可以是别的路径，可自定义）
//     // ctx上下文环境，body是koa自己的方法
//     ctx.body='hello,world'
//     //从数据库获取数据返回给前端
// })  

//首页相关的接口
// 为了将项目更加地模块化通常会将(ctx,next)那个箭头函数写成一个控制层（专门用来写具体要干嘛的）。去controller(建home->index,js)
router.get('/index/index',controllers.home.index) //此刻原来的箭头函数就被controller层替代了

// 专题相关接口
// 1. 获取专题列表数据方法
router.get('/topic/listAction',controllers.topic.index.listAction)
// 2. 获取专题商品详情数据方法
router.get('/topic/detailAction',controllers.topic.index.detailAction)

// 分类相关接口
// 1. 获取分类列表商品数据（导航栏）方法
router.get('/category/categoryNav',controllers.category.index.categoryNav)
// 2. 获取分类页面的菜单列表数据
router.get('/category/indexAction',controllers.category.index.indexAction)
// 3. 点击左侧菜单获取的分类商品数据（右侧）方法
router.get('/category/currentAction',controllers.category.index.currentAction)

// 搜索相关的接口
// 2. 热门搜索接口，去定义controllers/search/index.js indexaction方法
router.get('/search/indexaction',controllers.search.index.indexAction)

// router.post('/search/addhistoryaction', (ctx,next)=>{
//     // ctx.request....请求到的参数
//     ctx.body={
//         // hello 往页面上面输出....
//     }
// })逻辑是这样的，但我们不这样写：
// addhistoryaction得去定义它，来到controllers/search/index.js
// 当用户请求当前这个接口的时候就意味着用户输入的内容（search/index里面的openId,keyword)会被插入到后端数据库中去
// 1. 历史记录接口，去定义controllers/search/index.js addhistoryaction方法
router.post('/search/addhistoryaction',controllers.search.index.addHistoryAction) 

// 清空历史记录的接口
router.post('/search/clearhistoryaction',controllers.search.index.clearHistoryAction) 

// 搜索提示接口
router.get('/search/helperaction',controllers.search.index.helperAction)

// 商品相关接口
// 1. 商品详情
router.get('/goods/detailAction',controllers.goods.index.detailAction)
// 2. 商品列表
router.get('/goods/goodsList',controllers.goods.index.goodsList)

// 收藏相关的接口
router.post('/collect/addcollect',controllers.collect.index.addCollect)

// 订单相关的接口
// 1.立即购买的订单数据操作方法
router.post('/order/submitAction',controllers.order.index.submitAction)
// 2.获取收货地址相关信息方法
router.get('/order/detailAction',controllers.order.index.detailAction)


// 购物车相关接口
// 1. 添加购物车方法
router.post('/cart/addCart',controllers.cart.index.addCart)
// 2. 获取购物车列表数据方法
router.get('/cart/cartList',controllers.cart.index.cartList)

// 收货地址相关的接口
// 1. 获取收货地址列表方法
router.get('/address/getListAction',controllers.address.index.getListAction)
// 2. 获取详细地址方法
router.get('/address/detailAction',controllers.address.index.detailAction)
// 3. 添加或更新收货地址方法
router.post('/address/saveAction',controllers.address.index.saveAction)

//把router导入出去,app.js的router的引入才有用 
module.exports = router
