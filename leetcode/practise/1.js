// 判断一个整数是否是回文数。
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
var isPalindrome = function(x) {
    let st = 0;
    let y = 0;
    st = x;
    while (st >= 1) {
        y = y * 10 + st % 10;
        st = Math.floor(st / 10)
    }
    return y == x;

};