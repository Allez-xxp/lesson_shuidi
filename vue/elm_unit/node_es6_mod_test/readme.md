- 将node的模块化带入es6的世界
生产线上的转换器
1. babel工具(中介)
js编译器：将最新版本的js编译成当前环境可以执行的js
写的时候用最新的语法，执行的时候也可以执行
2. 转译
安装（版本）
yarn add @babael/cli  编译命令行；
yarn add @babel/core  编译核心代码，es6编译为es5
yarn add @babel/register  按照环境预处理
yarn add @babel/preset-env  注册功能；babel将node编译为es6