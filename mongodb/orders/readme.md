# 数据库 10万条数据 订单表orders
- mongodb 跟 mysql的本质区别：
    - sql 关系型数据库 三大范式
    - noSql 以doc（文档）为主，允许一定的存储冗余

- 在orders表中，放入user_id和name，便于： 
    1. 展示订单
        - 需求：数据按分页查询
        - 查询：element-ui(pc端用) PC后台 -》运营部门及老板看的；
        - 关心的是总数；每季度的订单；最佳单品。。。
    2. 对用户来说，最多的查询是什么？   查询量更大
        - price -> products 推荐(相关性查询) 
        - orders 我的订单 通过uesr_id name查询 不需要关联user表，做了冗余

- 总销量 total（必备字段）
    - orders表字段设计：orderLines（数组类型）
    - orders表里面专门设计一个total字段，为了便于查询，便于用户查询
    - total -> order；_id(每个商品都有一个total，以_id为关键字)
    - $sum -> total

- 数据库操作：
 - db.orders 
- 聚合aggregate([ ])
    > db.orders.aggregate([//中括号是说明有很多步
    ... {
    ...   $group: {
    ...      _id: null, //不按id分组，所有信息都要
    ...      total: {
    ...           $sum: "$total"  //对分组中每一个字段加法计算
    ...      }
    ...    }
    ... }]);
    { "_id" : null, "total" : NumberDecimal("44019609") }

- 计算第一季度，每个州销量最多的sku（商品唯一号）的第一名 
  1. 第一季度  关联的字段：orderDate ISODate()  用$lt $gt 找出季度
  2. 每个州    关联的字段：$state  是分组的依据，以州统计销量最多 $group  state
  3. 销量最多  关联的字段：orderLines有sku和 quality；orderLines.sku 进行分组$group,分完组后是对数量求和$sum  orderLines.qty
  4. sku(商品的号码)第一名：排序；按照州排序 降序orderby
  - 上一次查询的结果是下一次查询的输入，这是一个aggregate的应用场景
  分组同时按照州、sku一起分组。

  
- 第一季度的销量
$match: {} //相当于where  条件放进去
status: "completed", //有效订单，传入
> db.orders.aggregate([
... {   //步骤一：匹配条件
...     $match: {
...         status: "completed",
...         orderDate: {
...              $gte: ISODate("2019-01-01"),
...              $lt: ISODate("2019-04-01")
...              }
...      }
... }
... ]);

state + sku 分组
每个订单中
$unwind:  展开 将orderLines展开
"$"某一个字段

> db.orders.aggregate([ 
    {    
        $match: 
        { 
            status: "completed",        
            orderDate:
            {               
                $gte: ISODate("2019-01-01"),  
                $lt: ISODate("2019-04-01")
            }      
        } 
    },
    {
        $unwind:"$orderLines" //展开 才能对每个州的每个sku进行分组
    }
    $group: {
            _id://根据哪几个字段分组
    }
]);

> db.orders.aggregate([ 
    {     
        $match: 
        {         
            status: "completed", 
            orderDate: 
            {               
                $gte: ISODate("2019-01-01"),
                $lt: ISODate("2019-04-01")              
            }      
        } 
    } ,
    { 
        // 步骤二：按订单行展开
        $unwind:"$orderLines" 
    },
    {
        // 步骤三：按sku汇总
        $group: {
            _id: {
                state: "$state",
                sku: "$orderLines.sku"
            },
        count: {
                $sum: "$orderLines.qty"
            }
        }
    }
]);
{ "_id" : { "state" : "Hawaii", "sku" : "orderLines.sku" }, "count" : 45817 }
{ "_id" : { "state" : "Washington", "sku" : "orderLines.sku" }, "count" : 50357 }
{ "_id" : { "state" : "West Virginia", "sku" : "orderLines.sku" }, "count" : 46399 }
...
Type "it" for more
$group 分组  _id 根据什么字段分组  $total $

> db.orders.aggregate([
     {     
         $match: 
         {         
            status: "completed",
            orderDate:
            {               
                $gte: ISODate("2019-01-01"),  
                $lt: ISODate("2019-04-01")            
            }     
        } 
    } ,
    { 
        $unwind:"$orderLines" 
    }, 
    {     
        $group: 
        {       
            _id: 
            {               
                state: "$state",
                sku: "orderLines.sku"
            },       
            count: 
            {               
                $sum: "$orderLines.qty"
            }      
        }  
    },
    {
        // 步骤4：按州和销量排序

        $sort: {
            "_id.state":1,//上一个输出的state 按州分组
            "count": -1
        }
    }
    ]);


> db.orders.aggregate([ 
    {     
        $match: 
        {         
            status: "completed",
            orderDate:
            {               
                $gte: ISODate("2019-01-01"),
                $lt: ISODate("2019-04-01")
            }      
        } 
    },
    { 
        $unwind:"$orderLines" 
    }, 
    {     
        $group:
        { 
            _id: 
            {
                state: "$state",
                sku: "$orderLines.sku"
            },       
            count: 
            {               
                $sum: "$orderLines.qty"
            }      
        }  
    }, 
    {    
        $sort: 
        {        
            "_id.state":1,
            "count":-1    
        } 
    } ,
    {
        // 步骤四： 取每个州的top1
        $group:
        {
            _id: "$_id.state", //上一个输出的state 按州分组
            sku: {  //生成新的sku
                    $first:"$_id.sku"  //拿出排在第一个的sku中的sku(上一个输出中有)
            },
            count:{  //马上进行计算州的sku
                    $first: "$count"  //第一条数据的 ，把上一条记录中的count拿来
            }
        }
    }
]);
{ "_id" : "Kentucky", "sku" : "orderLines.sku", "count" : 56124 }
{ "_id" : "Louisiana", "sku" : "orderLines.sku", "count" : 47248 }

db.orders.aggregate([ {     $match: {        status: "completed",        orderDate: {           $gte: ISODate("2019-01-01"),           $lt: ISODate("2019-04-01")        }     } } ,{ $unwind: "$orderLines" }, {   $group:{     _id:{       state:"$state",       sku:"$orderLines.sku"     },   count:{     $sum:"$orderLines.qty"   } } }, {   $sort: {     "_id.state" : 1, "count" : -1 } },{    $group:       {       _id: "$_id.state",       sku: {           $first: "$_id.sku"      },      count: {         $first: "$count"      } } }] )  ;
作业，   统计  SKU 销量件数     统计每个sku再第一季度销量的次数     不算取消状态的订单，   按销售数量降序排序
1. 
> db.orders.aggregate([
...  {
...      $match:{
...           status: "completed",
...           orderDate:{
...               $gte: ISODate("2019-01-01"),
...               $lt: ISODate("2019-04-01")
...              }
...        }
... }
... ]);

2. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } ,
... {
...   $unwind:"$orderLines"
... }
... ]);
3. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } , {    $unwind:"$orderLines" } ,
... {
...    $group: {
...       _id: {
...              sku: "$orderLines.sku"
...       },
...    count: {
...             $sum: "$orderLines.qty"
...            }
...    }
... }
... ]);
4. 
> db.orders.aggregate([  {       $match:{           status: "completed",           orderDate:{               $gte: ISODate("2019-01-01"),               $lt: ISODate("2019-04-01")              }        } } , {    $unwind:"$orderLines" } , {     $group: {       _id: {              sku: "$orderLines.sku"       },    count: {             $sum: "$orderLines.qty"            }    } } ,
... {
...   $sort: {
...           "count":-1
...          }
... }
... ]);