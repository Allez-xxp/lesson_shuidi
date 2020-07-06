var rotatedDigits = function(N) {
    let ans = 0;
    let reg1 = new RegExp("3|4|7");
    let reg2 = new RegExp("2|5|6|9");
    for(let i=1; i<=N; i++) {
      if(!reg1.test(i) && reg2.test(i)) {
        ans++;
      }
    }
    return ans;
};
  


