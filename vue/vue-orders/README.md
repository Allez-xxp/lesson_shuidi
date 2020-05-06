# vue实战 进阶（第二阶段）
- 前后端分离
    1. 前端：不写node；前端有个mock ,后端若没传数据时，前端需要用到
    2. 后端：后端不写vue
    3. 前后端之间有一个数据流通问题：有文档，有约定(Mock)

- 应用场景：要解决的问题 
产品经理，订单 做个报表 看到订单数据 （用户看不到，是后台数据）
table一页展示20条数据，分页 多少页？
- 根据月份，地区，商品进行数据的筛选，怎么做？
    1. 要把订单数据展示出来，element-ui
    el-table 将数据通过表格的方式展示
    el-pagination 分页器
    2. 数据在哪里？node? 实际开发中，前端不会用node而是mock模拟一下
    3. mock 的牛逼在于，未来只要且一个url,就可以上线

- el-table + el-table-column 集合组件和子组件的关系
  展示数据；数据可视化canvas echart
  将:data="list"中的数据循环展示
    - 分水岭，会不会做，是不是高手
    1. table pagintation 联动
    数据的 ajax page list 动起来了
    前后端分离，
    前端模拟真实数据，mockjs
    我们现在和后端是分的，界面开发和后端api开发是异步的，不能等接口，也不能自己写node，可能会达不到需求，不能上线的
    mokejs是业内的解决方案，等到后端给接口，只要改一下url，甚至不用改，就能无缝连接上线
    - 引入mockjs yarn add mockjs
    在main.js中引入，在项目中添加mock文件
    - 引入axios yarn add axios http请求
    改了main.js内容，就要重启项目
    
# 数据库操作
- 导入文件：
mongorestore -h 127.0.0.1:27017 D:\lvmeng\dump
前端 等后端接口时，运用mock模拟数据
mock 本地数据库
开发业务mock

- 真实的后端数据：node/node-orders
将mock的数据变成与数据库相匹配的
chrome里的插件jsonview
// import Mock from '@/mock'  //拿到真数据 mock就能注销了
但是还要加一个vue.config.js解决跨域问题
Axios中可以改回get了