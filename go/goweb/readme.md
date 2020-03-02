node koa = go gin

curl -X POST http://localhost:8888/upload -F "file=@/Users/shunwuyu/Desktop/yb.jpeg" -H "Content-Type:multipart/form-data"