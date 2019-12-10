什么是浏览器？
-浏览器又称上网代理,proxy
-https://movie.douban.com/top250,显示网页，对HTML进行渲染，render
-postman,response html?

爬虫，类似postman的功能
 -发出http请求,request_promise
 (异步的时候会用到promise)
 -request+promise,等到请求完之后then
 -分析得到HTML，扣字出来（寻找自己需要的）

 -cheerio,把html文档在内存中渲染成一个dom树

 - 如何将数组存到文件中？存入文件的是字符串
    - 引入fs模块
    - fs.writeFile('./output.json',JSON.stringify(movies), 'utf-8',
    -JSON.stringify(movies)，将数组转换为字符串

 -/top250,做一次爬取，得到pagination,
 获得a href
 得到url数组
 对数组进行for循环，然后request
 再加上最开始的for循环

 通过爬虫分析，了解豆瓣HTML界面设计