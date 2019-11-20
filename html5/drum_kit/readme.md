-页面先写结构
 类名语义化，.key,.sound
 从外到内，
 良好的结构是页面的基础

-写结构时不用考虑样式
-样式
 -块级元素（占据一整行）block
 -行内元素
 -弹性布局 display:flex；
 1.所有子元素的块级能力被干掉
 min-height: 100vh; 全屏高度（vh相对高度（单位））
 align-items: center; 垂直居中
 justify-content: center; 水平居中

-html 默认字体大小是16px
  -rem 
  相对单位,相对于html的字体大小
  0.4rem=16px*0.4=6.389px
  在手机端 px不准确 
  适配所有手机
  -盒子模型
  margin + border + padding + content =div

   transform: scale(1,1); 变形

   const 定义一个常量
   document.querySelector('.key') 查找选择器中第一个key
   document.querySelectorAll('.key')  返回数组