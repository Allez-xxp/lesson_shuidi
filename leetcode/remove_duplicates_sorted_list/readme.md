# 删除排序数组中的重复项
读题：
    sortedArr[1,1,2] 数组长度为3
    删除重复项 return length 2

- 一次遍历
    res []  空间复杂度 O(n)
    for 
    排好序，后面的项一定会大于或等于前面的项；若等于要原地删除
    抽象，数理逻辑

- 动图 LeetcodeAnimation
两个指针 pre cur
cur:一直往前跑，一次循环的每一项遍历
pre：后面追
pre cur arr 前一个，后一个 不等于时pre+1，相等时pre不走，会慢下来
如果cur,pre不一样，那么pre+1值等于cur的值
数组从头到尾是排好序的不重复数
任务：每个位置放什么数？
pre指针没有跟上cur指针的速度，表示有重复数
pre和cur之间会有n个空位
pre+1的空位删除，把当前的cur交给pre

- 快慢指针
    1. 一次循环，cur一直跑
    2. cur跟pre，在arr[]中，不等的话，pre++;相等的话，pre不动
    3. cur再走的时候，继续比较新的cur跟旧的pre；不等时，pre++并且把cur的值给新的pre（把之前重复空出来的位置填上）
    4.cur >length

-数据结构 链表
    LinkedList next
    1 1 1 next 指向1, 改指向2

    把数组要维持位置的任务完成啦，快慢指针好理解
