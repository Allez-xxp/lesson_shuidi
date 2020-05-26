var levelOrder = function(root) {
    // 判断根节点是否定义，没有定义返回空数组
    if(!root) return []
    // 定义一个数组，存储所有节点，输出res
    let res = []
    // 定义队列queue，最初数据为根节点
    let queue = [root]
    // 进行while循环，条件：队列queue的长度不为空
    while(queue.length) {
        // 定义一个子数组
        let subRes = []
        // 定义变量len，获取queue队列的长度
        let len = queue.length
        // for循环的次数取决于有多少节点
        for (let i = 0; i < len; i++) {
            // 定义变量，使当前层的节点出列shift()
            let cur = queue.shift()
            // 将出列的节点存储到子数组中
            subRes.push(cur.val)
            // 判断出列的节点是否有左右节点，有则一起输出到子数组中
            if(cur.left) 
            queue.push(cur.left)
            if(cur.right) 
            queue.push(cur.right)
        }
        res.push(subRes)
    }
    return res;
};
console.log(levelOrder([3,9,20,null,null,15,7]));