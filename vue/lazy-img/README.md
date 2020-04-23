# 头条面试题 图片的延迟加载 浏览器性能优化
数据  简历 文章 发npm 竞赛  算法 

- 图片 延迟加载
http请求中，img并发；而 chrome 并发量有限
在PC端，wifi的情况下图片的下载会很快；但手机 4G  要考虑流量问题 
他要做的优化是  由于http请求， img并发太多， 所以图片加载之间会竞争，会阻塞，会使页面打开速度下降。（浏览器的并发量影响页面打开速度）
- axios 用于请求ajax 封装
- 小程序的图片懒加载
yarn add vue-lazyload
- 优化地方？
    1. 图片类型有哪些？
    jpg jpeg svg png gif bmp webp
    - banner位（广告）， 色彩丰富的平面设计稿  jpg/jpeg 
    - webp  代替jpg, google 新的图片格式标准;在效果一样的前提下， 省28%-40%的大小，网页性能提升 , webp 代替 jpg 
        - webp 有些浏览器不支持 
        - node 图片处理  .jpg   .webp  新的压缩方案
        里面的像素点还是一样的 jd   提供了两套图片
    2. 上线流程  webp  引入webp-converter库
    .jpg old    .jpg.webp chrome new 这两个浏览器都支持
    3. png:支持透明图，圆角，占位更大；jpg:不太适合做大图 ,适合图标图片
    4. gif: 动图，相同表达情况下更大
    5. 雪碧图：由几张图片组成的 css的position，有效地将http 的请求数降下来
    6. base64化：png小图标可以base64化（谷歌推出新的格式），完全用编码表示，更小  vue 
    
    - jpegtran
    - lqip
