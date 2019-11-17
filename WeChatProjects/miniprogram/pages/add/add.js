const db = wx.cloud.database();  //上云
const productsCollection = db.collection('products');
 //表 collection
Page({
    addData() {
        //api
            productsCollection.add({
                data: {
                  title: `Product ${(Math.random() * 100).toString()}`,
                  price: Math.random() * 1000,
                  color: 'blue',
                  tags: ["羽绒服", "国际品牌"],
                  view: Math.random() * 10,
                  image: 'https://image.so.com/i?q=%E7%BE%BD%E7%BB%92%E6%9C%8D%E5%9B%BE%E7%89%87&listsrc=sobox&listsign=44cc212e426339ef696ae171e7a11dd5&src=360pic_strong#/'
            }
        }).then(res=>{
            console.log(res);
        })
           
    }
})