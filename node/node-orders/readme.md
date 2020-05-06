# vue-order的后端
Order.countDocuments({}, (err, count) => { //mongodb中的count查询 查总数，一般是独立于列表查询的
        //用一个回调函数，处理出现错误的情况
        if(err) {
            res.json({
                status: 400, //4开头的状态码是来自客户端的，5开头的是来自服务器端的
                msg: JSON.stringify(err)
            })
        }
    })
