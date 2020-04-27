// 旋转数组
var rotate = function(nums, k) {
    var n = nums.length;
    var tmpEnd = 0;
    var tmpPrev = 0;
    for(var i = 0;i<k;i++){
        tmpEnd = nums[n-1];
        for(var r = 0;r<n;r++){
            tmpPrev = nums[r];
            nums[r] = tmpEnd;
            tmpEnd = tmpPrev;
        }
    }
};

