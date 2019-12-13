exports.getPosts = async ctx =>{
    //中间件处理函数
    // ctx.body = 'hello,posts';  //向外返回一个文本文件
    // ctx.body = {  //返回json
    //     posts:[]
    // } 
    await ctx.render('posts',{  //
        
    })
}

exports.getRedirectPosts = async ctx =>{
    ctx.redirect('/posts');
}