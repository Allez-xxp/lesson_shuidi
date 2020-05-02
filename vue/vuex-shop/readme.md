# vuex modules 官方文档（源码）
- 创建后台项目 shop-backend
    - 初始化 npm init -y；使项目变成node项目
    - routes目录 路由设计
        - index.js 根路由
    - models目录 模型文件
    - app.js 入口文件

# 购物车中商品数据增减，总金额计算，清空购物车
- 创建前端项目 vuex-shop
    - 选择vue全家桶配置，vue create vuex-shop
    - store目录下添加modules目录，再创建相关的模块文件
        - cart.js  相关购物车操作
        - products.js 相关商品操作
    - 在src下创建api目录
        - shop.js 商品信息所在处，使用回调函数向外输出商品信息
    - 在component下创建与模块文件对应的组件文件
        - ProductsList.vue 对应products.js
        - ShoppingCart.vue 对应cart.js 
    - index.js
        - 声明模块 modules:{cart,products}
        - 引入模块文件cart.js，products.js

- 解释 state cart products 之间关系
    - state为根节点，cart和products为叶节点（左右）
    - 叶节点都可以调用其他模块的方法，用commit提交一个mutation，利用命名空间去到目标模块。
    - {root:true} 回到根节点
- getters 重新计算state
    - reduce(): 就是将数组一项项消灭,消灭之前留下结果 之前的total 当前商品product
- methods 方法
    - store通过dispatch触发一个状态，派遣一个动作
- observer 可以被监听，订阅的对象