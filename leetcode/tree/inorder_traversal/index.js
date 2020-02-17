// ---二叉树的遍历，递归概念

function TreeNode(val){  //形成一棵树的节点
    this.val = val;
    this.left = this.right = null; //左指针，右指针
}
//二叉树
//如何形成a2的子树？利用递归的思想去形成？？
// 一个节点，左右指针指向另外两个节点；简单的事情。
// 递归执行，每个子节点（左边，右边）变成新的跟节点。
// 开枝散叶，退出条件是叶子节点。
var a1 = new TreeNode(1); //root,根节点
var a2 = new TreeNode(2);
var a3 = new TreeNode(3);  //三个节点可以形成一棵二叉树
a1.left = a2;
a1.right = a3;
var a4 = new TreeNode(4);
var a5 = new TreeNode(5);
a2.left = a4;
a2.right = a5;
var a6 = new TreeNode(6);
var a7 = new TreeNode(7);
a3.left = a6;
a3.right = a7;
// 如何打印这棵二叉树？ 打印规则：1 2 4 5 3 6 7
// 面试时使用递归方法写二叉树的遍历做法
var inorderTraversal = function(root) {
    let arr = []; //将节点结果放在数组中
    //运用inorder方法输出根节点
    // 定义一个函数，先将跟节点值放入数组中，其次是左节点，右节点
    const inorder = root => {
        if (root === null) return null; //退出条件
        arr.push(root.val);
        inorder(root.left); //沿着它的左子树一直递归
        inorder(root.right);//沿着它的右子树一直递归
    }
    inorder(root);
    return arr;
}
console.log(inorderTraversal(a1));