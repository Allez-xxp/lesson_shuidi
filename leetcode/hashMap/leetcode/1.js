// 两数之和
// 1.形成一个散列表，将json object也就是hashmap
// 2.[2,7,11,15] 9可以由数组中的两个数相加得出，就输出两数在数组中的下标。
// 返回值；[0,1]
// leetcode思想之前，用逻辑解决，用两重循环，暴力法
// for i=0 i<nums.length
//   for j=1..nums.length
//      nums[i] + nums[j] == target
//      return [i,j]
// 时间复杂度是O(n^2)，如何降到O(n)？只用一个循环
// for i=0 i<nums.length
// dic [i] = nums[i];   生成一个hash散列表,这里的时间复杂度是O(n)
// target-nums[i] in dic (是否在某个字典中)
// [i, target-nums[i]]  要返回的值
// 用空间复杂度换取时间
// 何为散？

let arr = new Array(90); //数组O(1),下标查找
//散的意义
arr[40] = "13.23"; //散开的坑位上直接查找到物理地址
// 物理地址计算方法 start + 40
// 只要找到物理地址就能用它去o(1) &address
let studentObj = {};
studentObj['030340'] = '13.23';
