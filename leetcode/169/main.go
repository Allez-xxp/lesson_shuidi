package main //声明包

import "fmt"

// 类型声明的静态语言
func majorityElement(nums []int) int { //返回值的类型也是int 后面那个
	majority, count := nums[0], 1 //赋值，声明变量：':='
	for i := 1; i < len(nums); i++ {
		if count == 0 {
			majority = nums[i]
		}
		if nums[i] == majority {
			count++
		} else {
			count--
		}
	}
	return majority
}

// main函数
func main() {
	fmt.Println(majorityElement([]int{1, 2, 2, 3}))
}
