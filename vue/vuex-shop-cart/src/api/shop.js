// 卖什么？ vuex是大型应用用到的
// 大型应用，物流会独立开来 
// vue 页面就相当于店前台，时间交互，数据驱动，现在单独放数据{{}}，放仓库store；vuex就是仓库
// 数据从这里来
//如何送到页面中去？流向界面App.vue
//模拟的backend(后端) 本来是:3000/api/products
// 假数据
const _products = [
    {"id": 1, "title": "ipad4 Mini","price":500.01,"inventory":2},
    {"id": 1, "title": "H&M T-shirt White","price":10.01,"inventory":20},
    {"id": 1, "title": "Charli XCX-Suker CD","price":59.01,"inventory":5},
];
//本来是:8080/ proxyTable,然后进行跨域问题的解决
export default {
    //从这里向后端请求，提供一个接口
    // App.vue中的回调函数，就是我们这里的cb
    getProducts(cb){ //接口.cb（callback）
        //模拟Ajax的过程
        console.log(cb);
        setTimeout(()=>cb(_products),1000)
        // return  new Promise((resolve,reject)=>{}),然后App.vue中用.then
    }
}