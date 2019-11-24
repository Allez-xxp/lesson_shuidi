// 设计一个栈 Stack,一种数据结构
// 支持pop top(请返回栈顶的元素)?
// 实现获得这个栈之中的最小值
function MinStack() {
    this.stack = [];  //使用数组模拟栈
    this.min = Number.MAX_VALUE;
}
MinStack.prototype.push = function(x) {
    if(x<this.min){
        this.min = x;
    }
    return this.stack.push(x);
}
MinStack.prototype.pop = function() {
    const item = this.stack.pop();
    return item;
}
MinStack.prototype.top = function() {
    return this.stack[this.stack.lenght-1];
}
MinStack.prototype.getMin = function() {
    return this.min;
}
MinStack.prototype.toString = function() {
    return this.stack.join(',');
}
const stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log(stack.toString());
console.log(stack.getMin());