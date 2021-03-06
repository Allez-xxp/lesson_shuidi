var maxSubArray = function(nums) {
    let pre = 0;
    let maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};

console.log(maxSubArray([1,-2,5,6]));

