var s1 = 'get-element-by-id';

// 编写一个函数，getElementById
var f = function(s) {
    // replace 接受正则; /-[a-w]/ ''
    return s.replace(/-\w/g,function(x) {
        // '-'不要，把第二个字符变成大写
        // return x.charAt(1).toUpperCase();  第一种
        // return x[1].toUpperCase();  第二种
        return x.slice(1).toUpperCase();  //第三种
    })
}
console.logf(s1);