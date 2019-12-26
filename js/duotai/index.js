function Person(name,age) {
    this.name = name;
    this.age = age;
}
//在原型链上添加toString方法,字符串化；
// 覆盖了Object上原有的toString方法---多态
Person.prototype.toString = function() {
    return 'I am a Person,my name is ' + this.name;
}

function Man(name,age) {
    console.log(arguments,'----');
    //Person:构造函数；
    // 实现继承：Man类需要把父类的构造函数执行一下,继承父类拥有的属性
    Person.apply(this,arguments);
}
//再创建一个新的对象，是实现继承原型的一种方法
Man.prototype = Object.create(Person.prototype);
var cxc = new Man("陈新初",19);
//将原来toString方法覆盖
Man.prototype.toString = function() {
    return 'I am a 007,my name is ' + this.name;
}
console.log(cxc + "");

var person = new Person('黄梅',18);
//类型转化，对象变成字符串，主动调用toString方法
console.log(person + "");  
const arr = ['陈新初','陈方闻'];  
//.call():借用其他的方法;apply()类似
console.log(Object.prototype.toString.call(arr));  //Object为空对象{}

