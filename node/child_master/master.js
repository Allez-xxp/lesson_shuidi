//主进程，程序入口启动

//创建子进程；child_process：内置模块
const cp = require('child_process');  
//__dirname 返回物理路径；cp.fork:启动子进程
const child_process = cp.fork(__dirname + '/child.js');
child_process.send(' hah');  //发送消息；负责耗时任务
child_process.on('message',(str) =>{
    console.log('parent',str);
})