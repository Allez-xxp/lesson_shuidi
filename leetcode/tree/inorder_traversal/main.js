// 一线公司面试，中序遍历，栈（先进后出）
// 遍历二叉树不用递归，缺点：性能不行
function TreeNode(val){  //形成一棵树的节点
    this.val = val;
    this.left = this.right = null; //左指针，右指针
}

//完全二叉树，满二叉树
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

var inorderTraversal = function(root) {
    //栈，表示只有它的左子树，右指数都解决了，它就可以出栈
    var stack = [], //栈
        result = [], //数组
        cur;
    cur = root;
    // 循环一次,若栈里有节点，继续
    while(stack.length > 0 || cur != null) {
        if(cur != null) {
            stack.push(cur); //入栈
            cur = cur.left;
        }else {
            cur = stack.pop();  //出栈
            result.push(cur.val); //进入结果数组
            cur = cur.right; // cur为null
        }
    } 
    return result;
}
console.log(inorderTraversal(a1));