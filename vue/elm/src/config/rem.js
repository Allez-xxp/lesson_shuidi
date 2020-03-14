// rem的手动计算；配置
// console.log('rem');

//引入一个闭包，将document和window都传进去
(function(doc,win){
    // 闭包区域，立即执行函数（传实参）；不会污染外界
    // 动态计算html的fontSize，fontSize=当前宽度/16;
    // rem=1/16,由此得到栅格的能力，进行css的等比例计算
    var docEl = doc.documentElement,//得到HTML；','定义多个变量
        // 重新计算rem
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function() { 
            // 设备无差异计算出 16rem = 100% width
            var clientWidth = docEl.clientWidth; //得到窗口宽度
            if (!clientWidth) return;
            
            docEl.style.fontSize = 20 * clientWidth/320 + 'px';
            // console.log('clientWidth');
            // 设备可能由从纵向变成横向，尺寸发生变化
            win.addEventListener(resizeEvt,recalc,false);
        };
    /* DOMContentLoaded：DOM结构/HTML加载完成就会触发；
     而Loaded需要完成所有图片的加载才会触发*/
    //第二个参数：监听触发时，会调用recalc；
    //第三个参数（嵌套监听的执行顺序，是否向外冒泡）：false表示由内层（冒泡监听）向外层执行触发；true表示由外层（捕获监听）向内层执行触发
    doc.addEventListener('DOMContentLoaded', recalc, false);
    // docEl.style.fontSize = '13.5px'; //将html的fontSize固定
})(document,window) //立即执行函数（传实参）