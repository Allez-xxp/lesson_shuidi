var flatten = function(root) {
    if(!root) return null
    const stack = []
    while(root.left || root.right || stack.length>0){
        if(root.right) stack.push(root.right)
        if(root.left){
            root.right = root.left
            root.left = null
            
        }else{
            root.right = stack.pop()
        }
        root = root.right
    }
};

