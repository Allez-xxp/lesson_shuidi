// 函数声明
package main  
import (//引入内置模块
	"fmt"  //=node中require('fs')
	"net/http" //=node中require('http')
	"io/ioutil"
 )
//Go是新时代的C语言
// python,人工智能时代的语言
// js运行在数组
func main() { //程序入口文件
	fmt.PrintIn("hello world!")
	// 爬虫，go和node的对比性学习
	// cheerio,第三方npm;go get 安装
	// http模块，发送请求；fs模块，把结果写入文件
	// 相当于node中http.get,但请求结果使用回调方式
	// go，同步,会阻塞；node,异步
	resp,err := http.Get("http://baidu.com") //:= 赋值;返回结果交给resp,出错交给err
	if err != nil{  //node null = nil 不要括号
		fmt.PrintIn("http get error",err)
		return 
	}
	// fmt.PrintIn(resp)
	// 网络IO，通过端口进入
	// 文件IO，读入文件
	// resp为响应号；Body为响应体
	body,err := ioutil.ReadAll(resp.Body) //ioutil是go的库
	if err != nil {
		fmt.PrintIn("read over")
		return
	}
	fmt.PrintIn(string(body))
}