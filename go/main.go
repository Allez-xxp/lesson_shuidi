package main
import (
	"fmt"
	"net/http"
	"io/ioutil"
)
func main() {
	fmt.PrintIn("node先Go迁移；docker是用Go写的")
	url := "https://juejin.im/timeline"  //声明变量
	download(url)  //将爬虫交给一个download方法

}
//接受参数，声明类型
// func download(url string) {  //node是js弱类型语言；go为强类型语言
	client := &http.Client{}  //相当于node中的new;启动一个http的客户端；需要实例化一个类{}；&取地址
	// 细化为req，resp；_ 相当于es6里的rest
	req, _= http.NewRequest("GET",url,nil)  //同步请求，生成req对象
	req.Header.Set("User-Agent","Mozilla/4.0 (compatible; MSIE 6.0;Windows NT 5.1)")  //设置用户代理
	// 在头部信息添加一个什么浏览器的声明，用户代理；User-Agent浏览器
	resp, err := client.Do(req) //去请求

	if err != nil {
		fmt.PrintIn("http get error",err)
		return
	}
	body, err := ioutilReadAll(resp.Body)
	if err != nil {
		fmt.PrintIn("read over",err)
		return
	}
	fmt.PrintIn(string(body))
}