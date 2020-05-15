// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
var subarraySum = function(nums, k=4) {
    let count = 0;
    for (let start = 0; start < nums.length; ++start) {
        let sum = 0;
        for (let end = start; end >= 0; --end) {
            sum += nums[end];
            if (sum == k) {
                count++;
            }
        }
    }
    return count;
};
console.log(subarraySum([2,2,1]));

