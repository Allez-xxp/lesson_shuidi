// 启动严格模式,防止乱指
'use strict';

//predicate 比较函数。这个函数是可以交给用户自定义的
function findIndex(array,predicate,context){
    for(var i=0;i<array.length;i++)
    {
        // js中当函数运行时要考虑上下文环境，所以最好用.call
        // if(predicate(array[i],i))
        // {
        //     return i;
        // }

        // context限定作用域。上下文环境
        if(predicate.call(context,array[i],i))
        {
            return i;
        }
    }
    return -1;//先写
}
// 手写findIndex(),返回符合条件的元素下标，未找到则返回-1
// 在js中,函数可以作为参数,js中函数是一等对象（可以被执行的一个对象，所以可以作为一个参数传递）
// i为下标，item是每一项
console.log(findIndex([1,2,3,4],function(item,i){
    
    console.log(this);
    if(item==3) return true;
},[1,2,3,4]));
// ,[1,2,3,4]不传（要在函数中传）就是undefined