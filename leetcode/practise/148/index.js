var sortList = function(head) {
    let mergeList = (left,right) => {
        let res = new ListNode(0);
        let pre = res;
        while(left && right){
            if(left.val <= right.val){
                pre.next = left;
                left = left.next;
            }else{
                pre.next = right;
                right = right.next;
            }
            pre = pre.next;
        }
        pre.next = left ? left : right;
        return res.next;
    }
    let mergeSort = (node) => {
        if(!node || !node.next) return node;
        let mid = node;
        let fast = node.next;
        while(fast && fast.next){
            mid = mid.next;
            fast = fast.next.next;
        }
        let rightList = mid.next;
        mid.next = null;
        let left = node;
        let right = rightList;
        return mergeList(mergeSort(left),mergeSort(right));
    }
    return mergeSort(head);
};

