// 唯一的入口，做唯一一次es5的模块化
// babel-core:npm包，引用register功能
// 挂载es6高级能力; 使用es6的模块化
require("@babel/register");
require('./app.js');