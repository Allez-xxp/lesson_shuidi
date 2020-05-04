# 数据流设计 小型电商应用（mall）
- vue + node + mongodb +  vuex + vue-router
  当你去做一个小型的电商应用（mall），如何去设计你的架构？
    - 使用vuex，便于中央管理数据，利于组件间共享数据。
    - 不使用modules，不需要分模块（小型的电商应用）
    - 采用vuex的另一种架构方式：将mutations和actions分离，从外部引入

- 如何实现vuex的另一种架构方式？
    - 编写顺序：首先编写state和mutations，再写actions(操作较复杂)
    - store目录下index.js 
        - 定义一个vuex store, 主写state
        - 引入mutations和actions
    - 在store目录下创建action.js
    - 在store目录下创建mutations.js
        - 围绕状态，设计修改（根据数据表的需求）
        - 引入mutations-types.js， vuex的语法要求
        - 针对状态修改需求，定义相关函数（函数名需大写）
        [ADD_CART] (state, {productId}) {},
    - 在store目录下创建mutations-types.js
        - 改变的清单，开发者看这个就知道网站状态的改变有哪些？
        - 定义常量，向外输出的是常量
        export const CHECKOUT = 'CHECKOUT';


- 创建后台项目 mall-backend
    - 创建models 模型层
        - user.js 用户模型对象
            - 引入mongoose
            var mongoose = require('mongoose');
            - 使用mongoose.Schema生成模型对象userSchema,定义相关数据类型
            const userSchema = new mongoose.Schema({})
            - 知识点：杂糅（mongodb是文档型(doc);第三范式要求没有那么强，可以杂糅，包容性好）
            "cartList":[{}]
            - 输出
            module.exports = User;

- vue-router的守卫状态
    - 重定向 "/" -> "/home"
    - 创建父子组件 children:[{}]
    - 引入子组件 
    - 路由钩子：跳转之前捕获路由（全局前置守卫）
        router.beforeEach(function(to, from, next){ next(); })
        - 分析当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处于等待中。
        每个守卫方法接收三个参数：
        1. to：Route：即将要进入的目标路由对象。
        2. from：Route：当前导航正要离开的路由。
        3. next：Function：一定要调用该方法来resolve这个钩子。执行效果依赖next方法的调用参数。
        - next()：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed(确认的)。
        - next(false)：中断当前的导航。如果浏览器的URL改变了(可能是用户手动或浏览器后退按钮)，那么URL地址会重置到from路由对应的地址。
        - next('/')或者next({path: '/'})：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向next传递任意位置对象，且允许设置诸如replace: true、name: 'home'之类的选项以及任何用在router-link的to prop或router.push中的选项。
        - next(error)：如果传入next的参数是一个Error实例，则导航会被终止且该错误会被传递给router.onError()注册过的回调。


