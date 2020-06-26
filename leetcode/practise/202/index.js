var rotateString = function(A, B) {
    // 方法一:
    if(A===B) return true
    let count = 0
    while(count<=A.length-1){
      A = A.slice(1) + A.slice(0, 1)
      if(A===B) return true
      count ++
    }
    return false
  
}