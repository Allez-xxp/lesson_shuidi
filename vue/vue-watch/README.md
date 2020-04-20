# vue 知识总结
- vue渐进式的开发框架，入手快速，进阶学习使用
  data,computed,filter， watch

 1. Hello 
  解决需求：全部大写
  方法：
       - filter toUpperCase()
  逆序：
       - computed reverse()
     
 2. 完善之前代码
    - @input 输入框输入执行，完成任务，满足渐进式应用开发的思路
    - 完善：有更好的解决方案（渐进式意义）
    - 怎么根据用户输入，进行ajax请求，把结果显示出来？
      watch
    - 防抖需求还是节流？
      防抖
 3. 引入axios，lodash
    - axios vue请求库
    - lodash vue最常用的工具库，相当于下划线；功能齐全
      防抖： _.debounce()
  


