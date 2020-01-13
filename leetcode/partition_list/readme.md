# 分隔链表

LinkedList x
隔成两个区，每个节点的初始位置

1. 形成两个区？ 每个区都应该是链表
定义两个链表，smaller和bigger
2. 一次链表（遍历）
比x值小的，放在是smaller区；比x值大的，放在bigger区
3. 将这两个区连起来：smaller.next = bigger

总结：通过两个链表，分隔链表的不同区域的子链表；两个子链表组合起来形成一个新链表