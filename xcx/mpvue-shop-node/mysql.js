// 获取基础配置
// 还得要一个启动mysql的文件config.js（先写）
const configs=require('./config')

// knex是MySQL查询构建器
var knex=require('knex')({
    client:'mysql', //用什么写什么；连接数据库
    connection:{
        host: configs.mysql.host,
        port: configs.mysql.port,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db,
    }
})
//是个mysql的辅助，Knex.js是为MSSQL，MySQL等设计的“包含电池”SQL查询构建器
// 之前都是我们自己要创建线程磁链接knex.js脚本可以帮我们创建
//将基础配置和knex的sdk.config合并，导出初始化完成的sdk配置，然后去app.js
module.exports={ mysql:knex }