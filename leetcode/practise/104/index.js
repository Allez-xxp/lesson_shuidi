var maxDepth = function(root) {
    if(!root) {
        return 0
    }

    const left = maxDepth(root.left)
    const right = maxDepth(root.right)

    return Math.max(left, right) + 1
}

