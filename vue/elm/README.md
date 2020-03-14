# vue超人气项目（开源）
1. 如何入手？ 快速入手的视野
2. 注意细节；vue大型项目的细节执行点

- rem
 定义：
 1. css的相对单位
 2. html的fontSize,所有设备自适应

vue单页应用中，你怎么去做rem适配？
 不能写死，16rem=100%（动态宽度的100%）
 16表示栅格系统；8:8(两列式)；4:4:4(三列式)
 对于不同手机，html的fontSize进行计算rem
 做法：
 1. 引入一个rem 生成框架；工具：阿里 flexible
 
- 设计组件 header组件
 1. head组件
  - css: common.styl负责reset
         mixin.styl负责css模块化，功能化封装（复用）
 2. 如何做一个满足各种需求的head组件？
 3. slot：让组件更能适合各种场景，灵活使用

