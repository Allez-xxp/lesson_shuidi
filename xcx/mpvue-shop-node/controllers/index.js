// 控制层
// 项目除了需要路由，还得要控制层，用来分别控制不同的功能需要用到的代码
// 配置一个灵活性的，自动读取本地目录结构的方法。
// lodash是js的一个库，封装了一些js的更好用的方法
const _ =require('lodash')
const fs= require('fs') //要读取文件必不可少
const path = require('path') //path模块

//映射某(d)文件夹下的文件为模块 

const mapDir = d =>{
    //因为他拿到的可能是一个文件DOM树
    const tree ={}

    //获取当前文件夹下的所有文件夹和文件，分成两组，文件夹一组，文件一组
    //_是_.LoDash的方法；
    // fs.readdirSync(d)读d文件夹,去执行一个划分的方法partition；
    // 以什么形式划分呢->参数p;
    // statSync就是返回一个stat数组，跟node的stat是一样的；
    // path.join(d,p)：把d和p拼接成数组；
    // isDirectory()：判断是否是文件夹是返回true
    const [dirs,files] = _(fs.readdirSync(d)).partition(p =>fs.statSync(path.join(d,p)).isDirectory())
    //如果是，就要映射文件夹
    //文件夹中肯定很多文件啊，所以要forEach遍历
    dirs.forEach(dir => {
        //往tree加dir文件，然后递归(因为要看看下面还有没有文件夹)，再次调用本身，然后把它下一次的路径传进去
        tree[dir] = mapDir(path.join(d,dir))
        //第二次递归传进来的d就是home了
    });
    //映射文件
    files.forEach(file =>{
        //拿到很多文件，因为我们只拿js文件就好了，所以获取文件后缀名字：path.extname(file)
        if(path.extname(file) === '.js'){
            tree[path.basename(file,'.js')] = require(path.join(d,file)) //把d和file文件引入进来
        }
    })
    //tree这个对象就包含了某一个文件夹下的所有的文件
    return tree
}

//抛出去mapDir，再放一个参数__dirname(某一个文件的绝对路径)，有了这个mapDir方法才能对routes的index.js进行再操作
//这里就是默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname))