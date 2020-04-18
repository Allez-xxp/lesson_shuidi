// 检验是否是相同的二叉树
const p = Array[1,2,3];
const q = Array[1,2,3];
var isSameTree = function(p, q) {
    if(p == null && q == null) 
        return true;
        
    if(p == null || q == null) 
        return false;
    if(p.val != q.val) 
        return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
console.log(isSameTree);

