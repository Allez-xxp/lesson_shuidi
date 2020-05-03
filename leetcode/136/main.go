package main

import "fmt" //fmt: go语言内置的格式化库
func singleNumber(nums []int) int {
	// 第一种解法 hashMap
	// // return 0
	// // make像内存中开辟了一块区域出来,用make申请一个空间 定义map key是整型，value也是
	// m := make(map[int]int)
	// //  下划线表示占位符，没有会报错
	// for _, v := range nums {
	// 	// fmt.Printf("%d", v) //"412120" 按格式打印
	// 	// fmt.Println(v)  //不按格式打印，会自动换行，想快速看到结果的就行
	// 	_, ok := m[v] //检测一下 hashMap 有这个Key吗？hash表会花费空间
	// 	if ok {
	// 		//如果出现过两次
	// 		// 每个数出现两次，就删除hashMap中的值，以v作为key的
	// 		delete(m, v)
	// 	} else {
	//		//前面map[]中还是空的，所以要加值进去
	// 		// =1为真就好，出现过就好
	// 		m[v] = 1 //"map[4:1]   0"  4->key 1->value  map后面的类型是针对value类型的约束
	// 	}
	// 	//遍历hash表，他只会拿key进行遍历

	// }
	// for k := range m {
	// 	// fmt.Println(k)
	// 	return k
	// }
	// // fmt.Println(m)
	// return 0

	// 第二种解法 用异或运算
	res := 0
	for _, n := range nums {
		// fmt.Printf("%d\n", n)
		//相同为0，不同为一 二进制计算 ^与 &或
		res ^= n //相同的消掉

	}

	return res
}

func main() {
	// Printf可以像C语言一样有一个占位符; 一定要有类型声明！
	fmt.Printf("%d", singleNumber([]int{2, 1, 2}))

}
