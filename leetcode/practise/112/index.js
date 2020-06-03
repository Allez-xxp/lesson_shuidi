var hasPathSum = function(root, sum) {
    if (root === null) return false;  //如果根节点为空，返回false
    //  如果根节点的左右子节点为空，那根节点的值等于目标和
    if (root.left === null && root.right === null && root.val === sum)
      return true;
    
    let left = hasPathSum(root.left, sum - root.val);
    let right = hasPathSum(root.right, sum - root.val);
    return left || right;
  };