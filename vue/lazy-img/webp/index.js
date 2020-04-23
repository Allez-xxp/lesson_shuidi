// const webp = require('webp-converter');
// webp.cwebp("test.jpg", "test.webp","-q 80",
// function(status,error){
//     console.log(status,error);
// })

// 原图 10% 左右轮廓 ， lazyload 加载完成后 替换上去
// img  src  ->  loading.gif logo 
const lqip = require('lqip');  //生成轮廓图
const file = './in.png';
lqip
  .base64(file) //模糊的，转化为base64格式
  .then(res => {
    console.log(res);
  });