# vuex 读·写操作
- partOne
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
 