import Mock from 'mockjs'

// 假数据生产
// const dataList = []; //订单列表
const dataList = {
    'orders|100':[{ //一下就一百条数据，
        "_id|+1": 1, //id字段，自增，从1 开始
        "name": "@cname", //名字会自动生成
        "orderDate": "@dateTime", //@就是表示时间随机
        "status|1": ["created","canceled","completed"], //如何在三种状态随机？？
        "shoppingFee": "@float(0,8,0,2)",
        "total":"@float(8,100,0,2)" //0-50，两位小数
    }]
}
// Mock.js
//模拟在哪个接口上请求 post
// url == node api url,后端拿来api后就能把mock注销了
// post方法访问
Mock.mock('/api/orders', 'post', dataList)

export default Mock;