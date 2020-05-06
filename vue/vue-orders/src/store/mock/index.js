import Mock from 'mockjs'

//假数据生产
// const dataList = []; //订单列表
// const dataList = {
//     'orders|100':[{ //一下就一百条
//         "_id|+1": 1, //id字段，自增，从1 开始
//         "name": "@cname", //会自动生成
//         "orderDate": "@dateTime", //@就是表示随机
//         "status|1": ["created","canceled","completed"], //如何在三种状态随机？？
//         "shoppingFee": "@float(0,8,0,2)",
//         "total":"@float(8,100,0,2)" //0-50，两位小数
//     }]
// }
//真数据
// mock的数据要尽量跟后端一样。url上，返回的结果上
const Random = Mock.Random
const total = 100;
const dataList= [];

for (let i = 0; i < total; i++) {
    const template = {
        "_id": i+1,
        "name": Random.name(), //是mock内置的随机的名字
        "orderDate": Random.date(),
        "status": Random.integer(-1, 1),
        "shippingFee": Random.float(0,8,0,2),
        "total": Random.float(10,100,0,2)

    }
    dataList.push(template)
}

// Mock.js
//模拟在哪个接口上请求 post
// url == node api url,后端拿来api后就能把mock注销了
// post方法访问
// Mock.mock('/api/orders', 'post', dataList)

// Mock 分页
// Mock不能接受动态路由吗？ /api/orders/:page/:limit
// Mock.mock(`/api/orders/${this.page}/${this.limit}`) ??
Mock.mock('/api/orders', 'post', (params) =>{
    //提供一个get请求
    console.log(params,'-------------');
    const info = JSON.parse(params.body)  //因为拿到的数据是字符串
    console.log(info); //"{params: {…}}"
    let {page=1, limit=20} = info.params
    console.log(page, limit); //"1 20"
    return {
        // page,
        // total
        
        // dataList,
        total,
        result: dataList.slice((page - 1)*limit, page*limit), //开始--结束
    }
})
//向外输出
export default Mock;