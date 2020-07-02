var twoSum = function(numbers, target) {
    let len=numbers.length
    if(len<2) return []
    //对撞指针
    let left=0;
    let right=len-1
    while(left<right){
        if(numbers[left]+numbers[right]===target){
            return [left+1,right+1]
        }
        else if(numbers[left]+numbers[right]<target){
            left++
        }else{
            right--
        }
       
    }
    return []
};

