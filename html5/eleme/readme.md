stylus,css预编译插件
json-server,将json文件转换成  接口
npm run命令，可以找到插件并运行它。如npm run api

-工作流
script脚本区域，强化我们的开发
dev，启动了http服务（web化）
styl stylus,编译为css样式
json-server,商家信息api（页面渲染需要的数据）


-dom api,是过去式
mvmm{{}},  {{}}模板需要编译部分：js data:


历史
-十年前，切图仔时代：php/java + html/css,<%= message%>,前端不需要了解数据后端
-八年前，js,web2.0时代：fetch/ajax,js可以主动请求数据；前后端分庭抗礼，通过DOM/api进行交互
-四年前，MVVM时代：vue/react +node +flutter(客户端) +go +docker(云开发),需要处理数据（全栈js+go）

小程序和Vue，一样的，MVVM
MVVM优点：
简单：-天生集成数据驱动，data字段，输出内容：绑定属性--data{{}}:src
     -页面是响应式的，数据变即页面变

-考点：inline-block
 inline没有设置宽高能力，只能兄弟间相安无事
 block 兄弟间换行
 两列式布局：inline-block;副作用：兄弟间会产生间隙,浏览器实现inline-block的天坑，换行符\n,有font-size决定的
 
 解决方法：1.找到父元素，设置font-size 0
          2.换行符首尾相连，影响结构的可读性

@media,媒体选择器
@media (-webkit-min-device-pixel-ration:3),(min-device-pixel-ration:3)；根据设备选择对应图片，括号里为条件.
[class^="icon-"],属性选择器

-stylus，向css提供了函数功能（利用返回值的叫函数）
 作用：1.要复用css代码，完成了css的模块化，称为mixin混合

-图片，手机的屏幕像素不一样
@media 条件,媒体查询；(-webkit-min-device-pixel-ration:3)：设备的最小像素密度比为3

手机中图片的命名为 ...@2x.png



数据驱动页面
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>饿了么</title>
    <link rel="stylesheet" href="./common.css">
</head>
<body>
<!--头部header  -->
<div id="root">
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <!--  :src="avatar"表示属性编译 -->
                <img width="64" height="64"
                :src="seller.avatar" alt="" id="avatar">
             </div><div class="content">   <!--首尾相连，不用设置font-size 0-->
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
            </div>
            <div class="description">{{seller.description}}/
                {{seller.deliveryTime}}
            </div>
            <div class="support" v-if="seller.supports">
                <span class="text">{{seller.supports[0].description}}
                </span>
            </div>
            <div class="support-count" v-if="seller.supports">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow-right"></i>
            </div>
        </div>
    </div>
    <!-- 等待被编译的模板 -->
    <!-- <div>{{message}}</div>   -->
</div>
    <!-- 引入Vue -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 页面就跟dom,api,说再见
    new Vue({
        el:'#root',  //先编译在输出（响应式）
        data:{
            // avatar:'https://img.36krcdn.com/20191215/v2_5604bdcc4a9c48ef8ac17d52ff290700_img_png',
            // message:'hello world'
            seller:{}
        },
        //页面显示后onLoad
        mounted(){
            // setTimeout(()=>{
            // this.avatar = 'https://img.36krcdn.com/20191215/v2_f2b476f433c14272a70dbfcd543b0b5c_img_png';
            // },2000)
            fetch('http://localhost:3000/data')
                .then(data =>data.json())
                .then(data =>{
                    this.seller = data;
                 
            })
        },
    })
    //等着数据输入
    // fetch('http://localhost:3000/data')
    // .then(data =>data.json())
    // .then(data =>{
    //     // console.log(data);
    //     // document.getElementById('avatar').src = data.avatar
    // })
    </script>
</body>
</html>