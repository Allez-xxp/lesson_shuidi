/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var smallestRangeI = function(A, K) {
    let max = Math.max(...A)
    let min = Math.min(...A)
    if(max - K < min + K){
      return 0
    } else {
      return max - K - (min + K)
    }
};
