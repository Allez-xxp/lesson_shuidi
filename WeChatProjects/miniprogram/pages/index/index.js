//小程序很简单，都是有Page构成
//wxml wxss js json
Page({
  navigateToAdd:function() {
    wx.navigateTo({
      url:'../add/add'
    })
  },
  navigateToList:function(){
    wx.navigateTo({
      url:'../list/list'
    })
  },
})