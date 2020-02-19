//创建Wallet类,es5
// _id,私有属性的做法，约定（编程风格，eslint）
// 真正实现私有,闭包：函数里面包含一个函数
// 面向对象的private，外界不能访问，但是内部可以访问
var UUID = require('uuid');
var Wallet = (function() { //立即执行函数
    //闭合空间中,放私有属性，外界无法访问
    var id,createTime,balance,
    balanceLastModifiedTime;
    return function() {  //构成闭包，
        // 通过return返回新的对象，
        // 构造函数执行的使命就是返回一个新的对象,
        // this指向实例，默认this，return this；
        // 1.闭包结合构造函数，可以一直引用私有变量
        // 2.return,返回public的属性和方法
       id = UUID.v1().replace(/-/g,"");
       createTime = + new Date();
       balance = 0;
       balanceLastModifiedTime = + new Date();
       // 私有方法;封装检查的实现，外部不需要了解
       //封装-》私有，私有成就封装
       function checkAmount(amount) {
           if(isNaN(amount)) {
               return false
           }
           return true;
       }
       // public方法，才可以让外界使用这个对象上的方法和属性
       return {   // 返回对象，将id放在其中； 
            getId: function() {
                return id;
            },
            getCreateTime: function() {
                return createTime;
            },
            getBalance: function() {
                return balance;
            },
            getBalanceLastModifiedTime: function() {
                return balanceLastModifiedTime;
            },
            increaseBalance: function(amount) {
                if(!checkAmount(amount)) {
                    throw new Error('查询错误！');
                }
                balance +=amount;
                balanceLastModifiedTime = +new Date();
            },
            decreaseBalance: function(amount) {
                balance -=amount;
                balanceLastModifiedTime = +new Date();
            }
        }
    }
}) ()

var hywallet = new Wallet();
console.log(hywallet.getId());
hywallet.increaseBalance(200);
hywallet.decreaseBalance(100);
console.log(hywallet.getBalance());
// 利用闭包，创建类;闭包的升级学习