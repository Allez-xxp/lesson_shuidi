// 设置启动端口，一些正常的操作
const CONF={
    //创建一下当前服务的端口
    port:'5757', //记得跟utils里面封装的要一样！
    mysql:{
        host:'localhost',
        port:3306,  //这个是mysql的端口
        user:'root',
        db:'nodemysql',  //要连接的是mysql当中的哪个库
        pass:'admin',//自己的mysql的密码
        char:'utf8mb4'  //编码类型
    }
}

module.exports=CONF //模板导出