// 给定一个非空字符串 s，最多删除一个字符。
// 判断是否能成为回文字符串: 正读和反读相同
function isPali(s, l, r) { // 辅助函数
    while (l < r) { // 指针相遇 结束循环
      if (s[l] !== s[r]) { // 一票否决
        return false 
      }
      l++ // 指针挪动，相互逼近
      r--
    }
    return true // 没有遇到不同，返回true
  }
  var validPalindrome = function (s) {
    let l = 0, r = s.length - 1 // 创建双指针
    while (l < r) { 
      if (s[l] !== s[r]) { // 转为判断删掉左右指针字符之一的字串，是否是回文串
        return isPali(s, l + 1, r) || isPali(s, l, r - 1)
      }
      l++
      r--
    }
    return true
  };
  console.log(isPali('aba'));
  