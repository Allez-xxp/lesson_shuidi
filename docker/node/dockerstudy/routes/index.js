const router=require('koa-router')();

// ctx访问文件的上下文环境
router.get('/',async(ctx,next)=>{
    // 把模板读取到内存之中IO操作，是异步的所以要有await,再用pug->模板的编译
    await ctx.render('index',{title:'首页'});
});
router.post('/form', async(ctx, next) =>{
    console.log('form');
    ctx.body = ctx.request.body
});
//commonjs规范
module.exports=router;