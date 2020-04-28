// 删除链表中的节点
var deleteNode = function(node) {
    node.val = node.next.val;
    node.next = node.next.next;
  };
  
  