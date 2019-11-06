//fileSystem 内置模块
const fs = require('fs');
//引入aip图片分类客户端
const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;
//console.log('hello node');
//读取数据时等待数据读取完，同步写法
const image = fs.readFileSync('1.jpg').toString("base64");
//console.log(image);
const client = new AipImageClassifyClient('17711773',
'mKvw3SbXIdLviUjT1bedwpTO','OOd0fwzzBohGn4b7sQFaX1GNVd8hu8bP');
client 
 .carDetect(image)
 .then(function(result){
     console.log(result)
 })
//AipImageClassifyClient
//回调函数
//文件在哪？ 磁盘
//js在哪里运行？ 内存（分配变量，CPU调度）I/O操作
//fs.readFile('./textdff.txt',function(err,data) {
  //if(err){
      //return console.error(err);
  //}
  //console.log(data.toString());

//})
