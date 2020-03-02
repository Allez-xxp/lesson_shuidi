Golang,云开发时代的C语言（结构体，指针）
node迁移到go
koa借鉴gin，web框架

# go 初体验
1. 每个文件都是一个独立的模块
- 声明main：package main
- 程序入口: func main() { }
2. go 内置模块
import(
    "fmt"
    "net/http"
)
3. if 不需要括号
4. 变量直接写，:= 定义和赋值
5. resp,err := http.Get("http://baidu.com")
- 返回结果交给resp,出错交给err
- 同步，没有回调函数；GO开生多核
- resp,err 相当于es6解构
	