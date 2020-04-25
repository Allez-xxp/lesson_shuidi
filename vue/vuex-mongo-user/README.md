# vuex mongodb 索引
- partOne 读·写操作
1. 数据流通（了解意义）
    - 数据绑定(vue) -》数据流(vuex)
    - vuex 作用相当于三峡
    - mongodb -> api -> vuex -> component
    组件数据流通
2. 设计一个应用场景，带着vuex的设计思考；mongodb的索引
    - 新建一个node-user目录(node代码，跟数据库进行通信)
        - 初始化npm init -y 
        - 引入mongoose yarn add express mongoose
    - 数据流源头在mongodb(数据服务器，提供web服务接口)中，使用Express跟数据库服务器通信。
    
3. store中的state有两种获取方式
    - this.$store.state
    - 需要计算一下的时候用
    computed中mapGetters方法，可以对state进行读操作；dispatch api派发动作
4. vuex是组件之间共享数据统一管理（中央）
    - 地方申请数据，中央发放数据
    - 地方使用computed申请中央数据；不使用data（私有数据，不共享）
5. store中四个属性
    - state  数据，相当于data
    - mutations  数据写操作处理
    - actions   api通信操作处理
    - getters   提供计算函数，相当于computed
6. 在vuex中，根组件的部分属性作用
    - computed  中央数据来源  ...mapGetters([''])  提前声明
    - methods  针对于vuex的actions  ...mapActions([''])
    - mounted  使用生命周期取数据

- partTwo 数据如何跨越流通
1. 数据库操作
    - 先插入数据 db.collection.insert({""})
    - 查找数据 db.collection.find({})
    - 清空表数据 db.collection.drop()
2. 跨域配置 
vue.config.js 解决端口不一致问题
3. node-user目录(node代码，跟数据库进行通信)下各目录作用
    - db  db.js  相关操作：
        - mongoose.connect  连接数据库
        - db.once('open',()=>{})  执行成功的回调函数
        - db.on('error',function(error){mongoose.disconnect();})  执行失败的回调函数
    - models user.js 模型文件 相关操作：
        - 声明引入mongoose
        - 引用mongoose.Schema()
        - 定义一个模型 const userSchema = new Schema({})
        - 输出  module.exports = User;
    - routes index.js 路由文件，连接数据库和模型文件
        - 引入express，数据库文件db.js，模型文件user.js
        - 引用express.Router()
        - user.get('/', async(req, res)=>{}) 取出数据库数据
    - app.js 入口文件
        - 引入express，数据库文件db.js，路由文件index.js
        - 监听3000端口 app.listen('3000', ()=>{})
4. 数据流通的过程
    - 源头：node 
        - 通过 User.find() 全部查询，得到:3000/users/ 
        - 通过 User.find({tags: tag} 查询条件，得到对应的:3000/users/tag/:tag
        - 解决代理，跨域问题proxy vue.config.js；前后端通信搞定
    - 来到API层 通信
        - fetchUsers
        - fetchUsersByTag
    - vuex 大型项目必备，接管数据
        - 读数据 this.$store.state.users
        - 触发actions this.$store.dispatch('fetchUser')
        - 写操作 mapActions('queryTag',evt)
        委托给queryTag去做，并传evt参数，得到tag 去改变数据
    - component App.vue

- partThree mongodb -优化查询性能：
    - 分析查询：执行的状态分析
    db.users.find({tags: 'coding'}).explain("executionStats");
        "tags" : {
           "$eq" : "coding"  数组中只要有一项相等就可以
        }
        "winningPlan" : {
                    "stage" : "COLLSCAN",   //表示collectionScan检索整个集合
                    "filter" : {
                            "tags" : {
                                    "$eq" : "coding"
                            }
                    },
                    "direction" : "forward"
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 0,
                "totalKeysExamined" : 0, //当前没有利用上任何索引
                "totalDocsExamined" : 4, //总共查询了4条
        },
    - 解释：查询的效率，不仅只是把Users查出来，还要能按喜好，把用户查出来，，如果这个变成了主要查询，那就要考虑加索引。添加explain看看它的执行效率高不高。
    检索了整个表，查询就会很慢，为主要查询的，建一个索引
    - 为tags集合建一个索引：
        - db.users.ensureIndex({"tags":1) 添加一个索引，为1,做一个升序的索引
        - 再次执行db.users.find({tags: 'coding'}).explain("executionStats");
        "winningPlan" : {
                    "stage" : "FETCH",
                    "inputStage" : {
                            "stage" : "IXSCAN", //变成了这个
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 2,
                "executionTimeMillis" : 2, 
                "totalKeysExamined" : 2, //用了索引了
                "totalDocsExamined" : 2, //现在只会检查两个文档
        },
    - 查看所有的索引   
    db.users.getIndexSpecs();
    [
        {
            "v" : 2,
            "key" : {
                        "_id" : 1  //默认一定会有一个_id的自增索引
            },
            "name" : "_id_",
            "ns" : "test.users"
        },
        {
                "v" : 2,
                "key" : {
                        "tags" : 1 //这个是我们建的 ，升序
                },
                "name" : "tags_1", //名字，删除的时候用
                "ns" : "test.users"
        }
    ]
    - 删除索引
    db.users.dropIndex("tags_1");
    { "nIndexesWas" : 2, "ok" : 1 }

    - 落实到node中
    vuex-mongodb-user的models中（设计模型的时候）
    "tags": [
        { type: String,index: true}
    ],

    - PS D:\LESSION_SHUIDI\vue\vuex-mongo-user\node-user> nodemon app.js运行node项目后
    只要一保存，就会加上索引

 
     
   