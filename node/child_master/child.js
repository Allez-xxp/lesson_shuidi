//process是node的进程全局对象
process.on('message',(str) => {
    console.log('child' + str);
    // 子进程，把活给干了后，偷偷跑到另外一个CPU，挂载一个进程；有利于将多核能力运用起来
    process.send('hehe');
})