var isPalindrome = function(s) {
    let str = s.replace(/\W|_/g, '').toLowerCase()
    let left = 0
    let right = str.length - 1
    while(left < right){
      if(str[left] !== str[right]) return false
      left++
      right--
    }
    return true
};
