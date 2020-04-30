// hashMap
function hash(key){
    let length = key.length;
    return key.substr(length-2, length); //倒数第二个位置,开始，截出来
}

console.log(hash('030340'));

// hashmap是基于table的散列key:value
// hash('030340')=>40