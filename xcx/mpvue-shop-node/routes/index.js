// 定义所有接口；路由层
const router = require('koa-router') ({
    // 添加路由前缀
    prefix: '/lm'
})

const controllers = require('../controllers/index')
router.get('/index/index', controllers.home.index)

// 输出路由
module.exports = router
