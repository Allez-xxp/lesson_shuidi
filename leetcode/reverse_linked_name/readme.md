# 反转链表

两种解法，三种语言
# 通过前驱结点级后继结点的概念，使用遍历完成算法
    当前结点的next指向它的前驱结点
    之前的前驱结点变成当前结点
    当前结点变成原结点的后继结点
    如果为null，完成遍历
# 递归
    - 把复杂类似的变成简单的重复
    - 退出条件
        指向为null
    简单公式：n个结点需要反转 1个结点
    结点cur，它的next指针指向的结点的next，指向当前结点的next，就反转了
