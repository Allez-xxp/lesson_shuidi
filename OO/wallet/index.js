// 钱包
const UUID = require('uuid'); //uuid,可以生成唯一的id
// 类定义
class Wallet {
    constructor() {
        // replace功能，替换字符串，g:全局
        // 在js中，对private属性支持不太好；使用编程的约定:_id(不可改)
        // uuid，返回用户id，唯一的，加密生成的，后端开发中
        // id生成的技能项
        this._id = UUID.v1().replace(/-/g,"");
        this._createTime = + new Date(); //时间 
        this._balance = 0; //金额，初始值
        this._balanceLastModifiedTime = + new Date();
        
    }
    // 可读不可写
    getId() {
        return this._id;
    }
    getBalance() {
        return this._balance; //便于存储 long int
    }
    getCreateTime() { //不可以修改
        return this._createTime;
    }
    getBalanceLastModifiedTime() { //可以修改
        return this.getBalanceLastModifiedTime;
    }
    // 加的数量
    increaseBalance(increasedAmount) {
        // 需要先检查金额数量
        // 封装
        if(increasedAmount < 0) {
            throw new Error('错误的金额')
        }
        this._balance += increasedAmount;
        this._balanceLastModifiedTime = + new Date();
    }
    // 花钱
    decreaseBalance(decreaseAmount) {
        if(decreaseAmount > this._balance) {
            throw new Error('没有足够的钱')
        }
        this._balance -= decreaseAmount;
    }
}
//构建钱包类
// 在区块链技术中，钱是一串不可被改变的数字
// 1.每个人的钱包，要有一个不可变的id
const jayWallet = new Wallet();
// 使用类
// jayWallet._id = 'aaaa';  //id可以被随意修改
// id生成后，不能被修改--private
//js语言对面向对象支持部那么大语言化，原型式
console.log(jayWallet.id);
// 收到红包
jayWallet.increaseBalance(20);
jayWallet.decreaseBalance(10);
console.log(jayWallet.getBalance());
 