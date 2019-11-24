Page({
  scanCode () {
    wx.scanCode({   //识别二维吗
      onlyFromCamera:true,
      scanType:['barCode'],
      success:res => {   //回调函数
        let isbn = res.result;
        // isbn -> 到云里查一下API?
        wx.cloud.callFunction({
          name:'bookinfo',
          data:{
            isbn:isbn
          },
          success:res =>{
            console.log(res.result);
          }
        })
      }
    })
  }
})