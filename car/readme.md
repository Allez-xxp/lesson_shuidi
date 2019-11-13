-小程序
 最廉价的App开发，简单，快速，高效
 前端入门最合适的综合应用
知识点
-插件概念
 组件 增强了html标签（二十几种）
 swiper是小程序提供的组件，滑动页面
 ·indicator-dots="{{true}}"  属性，表示面板指示点，模板编译符，插入值用--"{{}}"
 -数据绑定
 小程序的Page架构
 index.wxml 视图结构view（模板）
 index.wxss 样式 类名
 {{}} 为模板绑定数据 
 slides 在js的data里定义可以被模板访问到 循环输出
 wx:for="{{slides}}" 循环解析 item.image 显示
 js Page({
     data:{
         
     }
 })
 swiper-item
 
 view=div 盒子

index.wxml,wxml是界面的后缀
index.wxss,wxss是界面的样式
section 区块
vh 相对单位 不管什么设备，设计响应用户手机（100vh）
-看文档是最好的学习方式
