-WEB 跟桌面（单机）最大的区别？
 
localhost:1234;n个人均可输入（n有上限）：并发请求（300左右）；
分配给每个用户一个线程，fs 读取一个文件 index.html;导致I/O吃紧，物理设备
解决方法：多加机器，物理设备可以并联
ngnix（属于web服务器，进行负载均衡）可以分析哪些机器是空闲的，把用户送到这台机器的IP地址

如何充分发挥每台机器的性能？
1.多核
1234 =》node进程，=》一个进程。=》运行在一个CPU上
有很多，把CPU都用上