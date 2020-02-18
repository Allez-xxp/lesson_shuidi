# vue

- 字符串考题
 正则，核心能力
  1.()--表示分组
  2.\w/g，匹配一切字符，全局匹配

 - '-'不要，把第二个字符变成大写
    第一种  return x.charAt(1).toUpperCase();  
    第二种  return x[1].toUpperCase();  
    第三种  return x.slice(1).toUpperCase(); 

- vue 语法
 1.v-model
 设计数据项，books:[],book:{}--一个表单维护一个对象
 2.方法放在{}里
 3.数据驱动，{{单向}}，v-model
   数据 -》compile template -> html +methods +css ->html/css/js
   v-cloak:设置一个loading，正在准备中...
   
