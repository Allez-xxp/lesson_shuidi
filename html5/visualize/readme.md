-数据可视化
-使用requestAnimationFrame，请求运动帧
-游戏开发中使用requestAnimationFrame来代替setInterval
-调用animation函数：
 function animation(){
     console.log('------');
     requestAnimationFrame(function() { //限制调用次数
        animation();    //递归 内部调用本身函数（自己调用自己），造成内存泄漏 
     })
    
 }
 animation();

 -canvas,画布
 绘制API，画布的默认大小？
 canvas.style.width 标准的样式，需要数值和单位（100vw）
 canvas.width html属性，不接受单位，只接受数值
 ctx = canvas.getContext('2d');
 ctx.fillStyle = 'red';
 ctx.fillText(2,100,100);
 requestAnimation + clearRect();  //循环执行，清除内容