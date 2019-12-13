//向外输出
exports.getSignin = async (ctx) => {  //异步请求
    // ctx.body = 'form'
    await ctx.render('posts',{

    })
}
exports.postSignin = async (ctx) => {
    ctx.body = {
        mes:'登录成功'
    }
}