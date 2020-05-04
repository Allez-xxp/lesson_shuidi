# 实现全文检索
- vue：search组件 
方法：element ui: input + icon=search
- 如何支持全文检索？
    - mongodb：本身支持全文搜索
    - mysql中的like也可以解决部分检索问题
    - elastic_search 支持全文搜索软件（重量级）

- 数据库操作
    - mongod --dbpath "F:MongoDB\data\db"
    - 打开数据库 mongo, 进入MongoDB shell（交互）
    - 切换到blog use blog
        - users 用户表
        - posts 文章表
    - 对posts插入数据
    db.posts.insert({title:"I love javascript"});等
    - 查询数据（现在这样搜是没有东西的，因为这里的查询是===查询）
    db.posts.find({title:"love"}); 
    - 如何实现模糊查询？（与关键字相关）
    构建一个索引，用ensureIndex 给标题字段添加一个索引，添加一个文本索引，就会把标题里面的内容索引化。
    db.posts.ensureIndex({"title":"text"});
    - 模糊查询的具体操作
      db.posts.find({$text: {$search: "love"}});
        - '$text',在mongodb中表示指令
        - {$search: "love"}：搜索与love相关的文章
    - 在mongodb中，使用Ctrl+enter,可以进行换行

- 创建后台项目 search_node
    - 初始化 npm init -y
    - 安装引用的插件 yarn add express mongoose
    - 运行一下能否连接数据库 node app.js
    - app.js 入口文件
        - 引入express，数据库文件db.js，路由文件index.js
        - 启动路由 router(app)
        - 监听3000端口 app.listen('3000', ()=>{})
    - routes 路由文件
        - index.js 
        - search.js 
            - 引入express，，模型文件post.js
            - 由express来生成路由对象 express.Router()
            - search.get('/:keyword',(req,res)=>{}) 动态路由获取keyword
                - 进行文字查询 .find({ $text:{$search: keyword}})
                - 执行操作 .exec((err, posts)=>{ res.json(posts)})
                - 输出查询结果 module.exports = search;
    - db db.js  相关操作：
        - mongoose.connect  连接数据库
        - mongoose.set('useCreateIndex', true) 创建索引功能
        - useNewUrlParser: true,  使用url的协议，定位机器在哪里
        - useUnifiedTopology: true 使用统一的资源定位
        - db.once('open',()=>{})  执行成功的回调函数
    - models 模型文件 相关操作：
        - 声明引入mongoose
        - 引用mongoose.Schema()
        - 定义一个模型 const postSchema = new Schema({})
          - 知识点：添加一个文本索引，用于模糊查询
        - 重新定义一个模型 
        const Post = mongoose.model('Post',postSchema);
        - 输出  module.exports = Post;

