var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Array(s.length); // 存：子问题的状态（指针）和子问题的解
    const check = (s, wordSet, start, memo) => {
    if (start > s.length - 1) return true; // 指针越界，结束递归
    if (memo[start] !== undefined) return memo[start];  // memo中有，直接返回它
    for (let end = start + 1; end <= s.length; end++) { // 固定start 考察所有的end
      const word = s.slice(start, end); // 前缀单词
      if (wordSet.has(word) && check(s, wordSet, end, memo)) {//前缀单词是单词表里的
        memo[start] = true; // 并且递归剩余子串的结果也是true，则为true
        return true;        // 当前子问题的结果true 存入memo
      }
    }
    memo[start] = false;    // 当前子问题的结果是false
    return false; // end遍历了右侧字符都没有返回true，则返回false
  };
  return check(s, wordSet, 0, memo); // 递归的入口
};


  
  