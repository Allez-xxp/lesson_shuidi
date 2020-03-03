const express = require('express');
const router = express.Router(); //得到路由对象
const manufacturerController = require('../../controllers/manufacturer');

//通过路由获取所有商家；有路由向控制器过渡
router.get('/manufacturers',manufacturerController.all); //控制器,分层
// 通过路由添加一个商家
router.post('/manufacturers',manufacturerController.create);
// router.get('/product')
module.exports = router;