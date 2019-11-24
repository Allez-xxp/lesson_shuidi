const arr = [];
arr.push('建宁');   //push 向数组之中添加一个元素
arr.push('曾柔');
arr.push('双儿');
arr.push('阿珂');
//队列，
//栈stack,对栈顶进行插入;先进后出的数据结构
console.log(arr);
const ake= arr.pop();  //出栈
console.log(arr);
arr.unshift(ake);  //数组的基本操作,把定义元素放在数组第一位
console.log(arr);
arr.unshift('苏泉');
console.log(arr);
const sq = arr.shift();
arr.push(sq);
console.log(arr);


