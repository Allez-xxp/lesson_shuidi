let request = require('request-promise');
//引用request-promise时，需先安装request(否则无法找到模块request)
let cheerio = require('cheerio');
let fs = require('fs'); 
const main= async () =>{   //做异步处理时要引入async
    //进程
    let html = await request({
        url:'https://movie.douban.com/top250'
    });
    
    
    // console.log(html);
    //在内存中构建dom
    let $ = cheerio.load(html);
    let movieNodes = $('#content .article .grid_view')
    .find('.item');
    console.log(movieNodes);
    let movies= [];
    for(let i = 0; i < movieNodes.length; i++){
        let item = cheerio.load(movieNodes[i]);
        let titles = $('.info .hd span');
        titles =([]).map.call(titles,t=> {
            return $(t).text();
        })
        // console.log(titles);
        let bd = $('.info .bd');
        let info = bd.find('p').text();
        let score =bd.find('.star .rating_num').text();
        movies.push({
            'titles': titles,
            'info':info,
            'score':score
        })
    }
    console.log(movies);
    // 如何将数组存到文件中？存入文件的是字符串
    // 引入fs模块
    // fs.writeFile('./output.json',JSON.stringify(movies),
    // 'utf-8',
    fs.writeFile('./output.json',JSON.stringify(movies),
    'utf-8',(err) =>{
        if(err)
        console.log('写入失败');
        console.log('生成json文件成功，爬取完成');
    });
}
main();