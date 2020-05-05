package main //把文件打包
// 安装go的email模块
import (
	"log"
	"net/smtp"
	"github.com/jordan-wright/email"
)

func main() { //运行入口函数
	e := email.NewEmail() //:=定义并且赋值
	e.Form = "xxp <2811632058@qq.com>"
	// []表示数组，可以同时给多个用户发邮件；{}表示集合
	e.To = []string{"754211506@qq.com", "543882743@qq.com"}
	e.Subject = "你在家还好吗？" //邮件标题
	// byte； go语言有byte类型；
	e.Text = []byte("临安思故里，故里归临安") //邮件内容
	e.Send("smtp.qq.com:25", smtp.PlainAuth("", "2811632058@qq.com", "ppwiluvvzmqedhcc", "smtp.qq.com")
	if err != nil {
		log.Fatal(err)
	}

}
