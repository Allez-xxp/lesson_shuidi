[1,2,3,1] ?
答题要求
1.不能够相邻的偷；
2.最多的钱？

分析
1 如果偷
2 不能偷
3 或 1 偷

动态规划算法---ABCD
选择A    不选择A
 CD        BCD
          B  CD


每个位置中最大的值决策是这样的？
Math.max() 如何表达？
i=0 Math.max( , )

假设数组dp[i],则
nums [1,2,3,1]
dp[i]=Math.max(nums[i]+dp[i-2],dp[i-1])