package main

import (
	"fmt"
)

func twoSum(nums []int, target int) []int { //括号后面的，是返回的值，传的参数和要返回的数记得写类型
	//返回下标的数组
	//go中定义一个hashMap
	h := make(map[int]int) //go语言中，用make申请一个hashMap地址,Go中hashMap就是一个map
	// h[2] = 0 make(map[int] int) //(map[int]这是下标key， int)这里是value
	//遍历O(n)
	for i, value := range nums { //range 展开数组 i是下标
		// if wanted, ok := h[value]; ok {
		// 	fmt.Println(wanted, ok)
		// } else {
		// 2  7 做为key放进去，
		// nums[i]  7  一对
		if wanted, ok := h[value]; ok { //ok为真执行// for
			fmt.Println(wanted, ok)
			return []int{wanted, i}
		} else {
			h[target-value] = i //9-2=7,当前值想要的对象下表为i
		}
		// fmt.Println(i, value)
	}
	// fmt.Println(h)
	// return []int{0, 1} //不能直接返回1，因为希望返回的是数组，Go语言中的数组形式
	return nil
}

func main() {
	fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
}
