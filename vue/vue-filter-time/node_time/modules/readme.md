时间处理在 后台时
数据存储 mongodb date

- 启动mongodb
mongod --dbpath "f:MongoDB\data\db" 

- Date()和new Date()的区别 
 1. 输出日期格式不一样
 2. 类型不同：Date()为string类型，new Date()为object类型
 3. 输出时间相差8小时（时区）

- 格林尼治时间 ISODate() 国际时间
 new Date()输出的时间格式为格林尼治时间ISODate()

- mongodb 时间命令
  - Date() 查看当地时间
  - newDate()
  - typeof Date()  查看Date()的类型
  - ISODate("2020-04-18T12:30:00.080Z").valueOf()  返回时间戳
  - ISODate("2020-04-18T12:30:00.080Z").toLocaleString();  返回当地时间

  - 打开数据库
  use tests;
  - 插入一个时间（tb1为表名）
  db.tb1.insert({mydate: ISODate("20191105 09:56:23")})
  - 显示插入记录
  db.tb1.find();
  - 查找大于某时间的日期 $gt 大于，$lt 小于
  db.tb1.find({mydate: { $gt: new Date(1572947782000)}});


- 订单表 order
  某个月的订单，求总金额（根据时间）
  1. dump.tar.gz 文件
    - 26.3M 订单表数据
    - .tar.gz linux压缩文件
    - 导入mongodb，进行复杂运算
  2. 解压dump.tar.gz 文件
    - 解压命令 tar -zxvf dump.tar.gz
    目录：
      1. dump/   数据库目录
      2. dump/mock/   mock db 数据库
      3. dump/mock/orders  collection 表
      4. dump/mock/orders.metadata.json  订单数据
      5. dump/mock/orders.bson  数据库实体文件，文档数据类型
  3. 导入压缩文件
    - 打开mongodb
    mongod —dbpath f:MongoDB/data/db
    - 在解压文件的路径下导入文件dump
    mongorestore -h 127.0.0.1:27017 dump  127.0.0.1:27017 本地IP端口号
    - 成功后检验
      1. show dbs 查看是否添加mock
      2. use mock 进入mock
      3. show collections 查看mock中的数据表
      4. db.orders.count(); 查看表的数据量
    - 删除数据库
    db.dropDatabase();
  4. 所有订单的总销售额
    - db.orders.findOne(); 查看订单表的一条记录
    - db.orders.find();  查看所有（一页20条）
    - it  查看下一页
    - 查找在第一季度的某时间段的订单信息：
    db
      .orders
      .findOne({
          orderDate:{ //对这个字段的约束条件，因为有多条约束吗，所以用花括号
              $gte:ISODate("2019-01-01"), //以$开头的就是我们的查询条件
              $lt:ISODate("2020-04-01")
          }
          status: 'created' // 订单状态，刚刚下单
      });
    在mongodb中以$开头的就是我们的查询条件，像我们vue里面的指令一样v-if,v-for。
    $gte大于等于equal 没有e就是不能等于。
    $lt 小于。
    - 根据某一时间段的订单状态查找订单信息
    db.orders.find({orderDate:{$gte:ISODate("2019-01-02"),$lte:ISODate("2019-03-04")},status:{'created'});
  5. 所有订单的总金额
    - 适用情况：每一条记录的都要,大数据，mongodb很适合,具有图形工具。
    - 聚合 aggregate([ ])
    db
      .orders
      .aggregate([ //聚合所有数据,中括号表示aggregate可以接受多个约束
          {
      ...    $group: { //$开头的都是指令，这按某个字段进行分组
      ...       _id: null, //id，不按任何字段分组 也可以_id: 'state'
      ...       total: { $sum: "$total"} //将分组中的total字段求和
      ...      }
      ...    }
      ... ])
      { "_id" : null, "total" : NumberDecimal("44019609") }
      ])
  6. 查询2019年已完成订单的总金额和订单总数
    - 条件：
      1. 时间
      2. status状态 completed
      3. $sum 求总和
    - filter过滤器：上个数据的结果示下一个的输入
    - + aggregate 聚合查询

    - $group--》group by
    - $match -->where 用于过滤数据，只输出符合条件的文档
    - $project 修改输入文档的结构，重命名，增加或删除域
  7. 第一季度，已完成的订单：
    - 已完成订单数量
    db.orders.aggregate([
    ... { $match:{
    ...   status: "completed",
    ...   orderDate: {
    ...   $gte: ISODate("2019-01-01"),
    ...   $lt: ISODate("2019-04-01")
    ... }
    ... }
    ...
    ... }])
    - 订单总金额
    db.orders.aggregate([
    ... {
    ...  $match: {
    ...    status: "completed",
    ...    orderDate:{
    ...     $gte: ISODate("2019-01-01"),
    ...     $lt: ISODate("2019-04-01")
    ...    }
    ...  }
    ... },
    ... {
    ...   $group:{ //分组并计算
    ...     _id: null, //没有要分组的字段，所以为null
    ...     total: { $sum: "$total"}, //把分好组的total加在一起
    ...     shippingFee: { $sum: "$shipping"},  //邮费；
    ...     count: {$sum :1}, //每次都加一
    ...   }
    ... },
    ... {
    ...   $project: { //选择要输出哪些
    ...    grandTotal:{ //要输出grandTotal是这两个的和，就是第一季度所有的收入
    ...     $add:["$total","$shipping"]    //总额=订单金额加上邮费
    ...   },
    ...   count: 1, //为1，就是要输出的字段
    ...   _id: 0 //为0就是不输出
    ... }
    ... }
    ... ])
    



