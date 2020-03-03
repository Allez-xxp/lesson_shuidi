const Model = require('../model');  //mvc,引入模型层
const { Manufacturer, Product } = Model; //解构模型对象

const manufacturerController = {
    all(req,res) {
        res.json({
            manufacturers: []
        })
    },
     //创建一家公司
    create(req, res) {
        const requestBody = req.body; //请求体， 表单
        // {name: '小米', } object mapping ORM
        // console.log(requestBody, '++++');
        const newManufacturer = new Manufacturer(requestBody) 
    //底层怎么存的， 不用管 mongoose帮你忙
        newManufacturer.save((err, saved) => {
            res.json({
                mes: 'ok'
            })
        })
    }
}

module.exports = manufacturerController;