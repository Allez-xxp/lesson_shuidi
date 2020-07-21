var uniqueOccurrences = function(arr) {
    // 解题思路：
    // 1，统计每个值出现次数
    // 2，出现的次数是否唯一
    let x = new Map(); // 这里使用Map是为了方便取所有出现次数
    for (let n of arr) {
      x.set(n, (x.get(n) || 0) + 1);
    }
    let y = {};
    for (let n of x.values()) {
      if (n in y) { // 这里使用in关键字，而不是y[n] !== undefined
        return false;
      }
      y[n] = true;
    }
    return true;
};
  
  