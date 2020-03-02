package main

import "github.com/gin-gonic/gin"  //安装了gin,web框架
import "fmt"
import "net/http" //status code

func main() {
	// 上传文件
	router := gin.Default()  //返回一个路由
	// context req + res ,koa ctx
	router.POST("/upload",func(c *gin.Context){
		file, _:=c.FormFile("file")  //得到真正的文件
		//返回的是String,res.end
		c.SaveUploadedFile(file,file.Filename)
		c.String(http.StatusOK,fmt.Sprintf("'%s' uploaded!",file.Filename))
	})
	router.Run("；8888")
	// r := gin.Default()  //相当于node中new Koa()，r相当于web app
	// r.GET("/ping",func(c *gin.Context){   //获取路由;*为指针，获取上下文
	// 	c.JSON(200, gin.H{  //返回JSON，gin.H：json格式化的简写
	// 		"message": "pong"
	// 	})
	// })  
	// r.Run(":8888")
}