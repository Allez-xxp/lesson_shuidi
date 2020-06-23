var reverseBetween = function(head, m, n) {
    const originList = new ListNode(0)
    originList.next = head
  
    let listNode = originList
  
    for (let i = 0; i < m - 1; i++) {
      listNode = listNode.next
    }
  
    let prev = null
    let cur = listNode.next
  
    for (let i = 0; i < n - m + 1; i++) {
      let next = cur.next
      cur.next = prev
      prev = cur
      cur = next
    }
  
    // 将 m 的 next 指向 n 指针的 next, 同时将排在 m 前面一位的指针的 next 指向 n
    listNode.next.next = cur
    listNode.next = prev
    return originList.next
}
  
  