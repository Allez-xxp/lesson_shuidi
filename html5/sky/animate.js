// 流程式的，不适复用
// var tl = new TimelineMax({   //线性运动库
//     repeat:-1,
//     yoyo:true,
//     repeatDelay:1  //运动时间间隔
// })  
// tl.from(['#box1,#box3'],0.3,{x:'-=55%'});
// tl.from(['#box2'],0.3,{x:'+=55%'});

// 封装代码，尽量做成面向对象式,类更适合复用
var Animation = function(opts){
    //els 参数
    var dur = 0.3,
    amount = '55%',
    tl = new TimelineMax({   //线性运动库
        repeat:-1,
        yoyo:true,   
        repeatDelay:1,  //运动时间间隔
    });  //声明3个变量
    tl
    .add(
        fromLeft(
            opts.leftAnimated
            )
       )
       .add(
        fromRight(
            opts.rightAnimated
           )
       )
    function fromLeft(el){  //封装函数
        return TweenMax.from(el,dur,{x:"-=" + amount,autoAlpha:0.2})
    }
    function fromRight(el){  //封装函数
        return TweenMax.from(el,dur,{x:"+=" + amount,autoAlpha:0.2})
    }
}