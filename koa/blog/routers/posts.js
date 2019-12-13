//文章路由
const router = require('koa-router')(); //定义一个路由
//函数
const controller = require('../controller/c-posts');

router.get('/', controller.getRedirectPosts);
router.get('/posts',controller.getPosts);
module.exports = router;