var isUnivalTree = function(root, val) {
    val === undefined && (val = root.val)
    return !root.left && !root.right ? root.val === val : root.val === val && (root.left ? isUnivalTree(root.left, val) : true) && (root.right ? isUnivalTree(root.right, val) : true)
};
