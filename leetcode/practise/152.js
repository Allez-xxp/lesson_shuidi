// 给定一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
var maxProduct = function(nums) {
    let max = nums[0]
    let max1 = 1
    let min = 1
    for(let num of nums) {  //循环遍历输出nums的值
      if(num < 0) { //若值小于0，max1与min互换值
        [max1, min] = [min, max1]
      }
      max1 = Math.max(num, num * max1)
      min = Math.min(num, num * min)
      max = Math.max(max1, max)
    }
    return max
  };
  
  
console.log(maxProduct([-2,0,-1]));