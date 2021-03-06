var num1 = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
  num2 = '901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890901234567890123456789012345678901234567890123456789090123456789012345678901234567890123456789012345678909012345678901234567890123456789012345678901234567890';
// console.log(num1 + num2);

//大数相加，数字超过语言的计算范围
// 数能在内存中表达，数字型Number，若超过范围为Infinity;
// 解决方法：去最后一位，相加

//将数字变成字符串类型
function addTwoNumber(str1,str2) {
    //1.字符串从尾部到首部，类似栈的数据结构
    //2.两个数的位数不一样，
    var carry = 0,  //进位，计算每一个回合的进位
    l1 =str1.length,
    l2 =str2.length,
    arr = [];      //存储结果
    var max = Math.max(l1,l2);  //比较数值大小，判断数的位数是否相等
    //最多进行多少次计算n
    for(var i = l1-1,j = l2-1,n = max-1; n >= 0;n--,i--,j--)
    {
        //每一次的相加和
        // 1.var sum = parseInt(str1[i]) + parseInt(str2[j]) + carry;  
        var sum = (+str1[i] || 0) + (+str2[j] || 0) + carry;
        // console.log(sum);
        // break;
        if(sum >= 10) {
            carry = 1;
            arr.push(sum-10);
        } else {
            carry = 0;
            arr.push(sum);
        }
    }

    //若最后一次还有进位：
    if(carry > 0)
    arr.push(carry);
    return arr.reverse().join('');  //将数组颠倒一下，字符串输出
}
console.log(addTwoNumber(num1,num2));