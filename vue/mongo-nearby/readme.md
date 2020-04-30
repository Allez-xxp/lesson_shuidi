# 深入vue + mongodb学习
- 目标：全栈的开源项目/商业项目/创业项目
1. 仿应用（美团）
    - 简历里介绍项目
    - 如何显示利用经纬度查询附近商家？ 知识点
    1. 前端 h5 手机或电脑的lat lng的
      navigator 

- 前后端分离
  - node_shops 后台项目
    - db db.js  相关操作：
      - mongoose.connect  连接数据库
      - mongoose.set('useCreateIndex', true) 创建索引功能
      - db.once('open',()=>{})  执行成功的回调函数
    - models 模型文件 相关操作：
        - 声明引入mongoose
        - 引用mongoose.Schema()
        - 定义一个模型 const shopSchema = new Schema({})
          - 知识点：添加一个location属性，用于定位 经纬度（2d）
        - 输出  module.exports = Shop;
    - routes index.js 路由文件，连接数据库和模型文件
        - 引入express，数据库文件db.js，模型文件user.js
        - 引用express.Router()
        - shop.get('/', async(req, res)=>{}) 取出数据库数据，流向前端
        - shop.post('/', async(req, res) => {}) 手动添加数据
        - module.exports =  (app) => {app.use('/shops', shop); }  输出 路径为localhost:3000/shops
    - app.js 入口文件
        - 引入express，数据库文件db.js，路由文件index.js
        - 监听3000端口 app.listen('3000', ()=>{})

  - vue-meituan-shops 前端项目 
    - 引用axios yarn add axios
    用来替代fetch 负责数据的接口通信
    - store目录下index.js
      - 在state中添加经纬度属性并赋值：latitude，longitude
    - app.vue
      - 以插值的方式输出经纬度 {{$store.state.latitude }}

- 为什么使用mongodb？
  - MySQL 应用于几十万条数据
  - mongodb 应用于千万条，亿数据
- 数据库操作
  - mongod dbpath "f:\data\db" 打开数据库
  - mongo 进入数据库
  - db.collection(表名).getIndexes(); 查询所有索引
  
- 性能优化，查询需求
  - use tests 切换到tests数据库
  - show collections 查看所有表
  - db.inventory.insertMany([  一次插入多条记录
    {"item": "f1","type":"food",quantity:500},
    {"item": "f2","type":"food",quantity:100},
    {"item": "p1","type":"paper",quantity:200},
    {"item": "p2","type":"paper",quantity:150},
    {"item": "f3","type":"food",quantity:300},
    {"item": "t1","type":"toys",quantity:500},
    {"item": "a1","type":"apparel",quantity:250},
    {"item": "t2","type":"toys",quantity:50},
    {"item": "f4","type":"food",quantity:75},
  ]);
  - 根据商品库存量100-200进行查询
  db.inventory.find(
    { quantity:{
      $gt:100,
      $lte:200
    }
  });
  - 根据商品库存量100-200进行查询详细信息(查找整个表，效率低)
  db.inventory.find(
    {quantity: {
      $gt:100, 
      $lte:200
    }
  }).explain("executionStats")
  - 创建索引，以库存量创建，查询更快
  db.inventory.createIndex({quantity:1});
  - 查看所有索引
  db.inventory.getIndexes();
  - 创建复合索引，库存和类型
  db.inventory.createIndex({quantity:1,type:1});
  - 根据商品库存，类型查询
  db.inventory.find({quantity: {$gt:100, $lte:300}, type: "food"});
  - 创建复合索引，类型和库存 查询有区别：时间，查询的记录
  db.inventory.createIndex({type:1,quantity:1});