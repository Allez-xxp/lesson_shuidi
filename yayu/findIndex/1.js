//es6支持的
// 手写findIndex ->找到符合条件的下标
function isBigEnough(element){
    console.log(element);
    return element >=15;
}

// [12,5,8,130,44].findIndex(isBigEnough);
console.log([12,5,8,130,44].findIndex(isBigEnough));