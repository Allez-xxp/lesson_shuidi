# 小程序全栈(网易严选)
- 结构：MPvue + koa2（后端接口） + mysql
- 初始化项目
    - node -v, vue -V; 检查node和vue的版本
    - vue init mpvue/mpvue-quickstart myproject
    - yarn 安装依赖

- mpvue-shop目录结构
    - build 配置文件
    - config  webpack配置文件
    - src 
        - app.json 整合vue和原生小程序的语法
        - app.vue  小程序的api调用
        - pages 小程序页面开发
        - index
            - index.vue 小程序首页
            - main.js 引用index.vue,打包webpack，实现效果
    - static 静态资源
    - npm run dev 生成dist 小程序项目结构

- mpvue-shop-node 用于koa后端接口
    - app.js
    - routes 路由层
        - index.js 定义所有接口
    - controllers 控制层
    - config.js  启动mysql端口
    - mysql.js   获取基础配置
    - 导入nodemysql.sql文件 所有数据