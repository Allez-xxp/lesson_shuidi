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



