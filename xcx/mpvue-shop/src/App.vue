<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    //我们的openId,avatarUrl是微信头像
    var userInfo = {
      openId: "oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
      nickName: "蜗牛",
      gender: 1,
      language: "zh_CN",
      city: "Changping",
      province: "Beijing",
      country: "China",
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132",
      watermark: { timestamp: 1535513485, appid: "wx601ce71bde7b9add" } //就是登录微信开发者工具的那个id
    };
    var openId = userInfo.openId; //单独取出来id
    wx.setStorageSync("userInfo", userInfo);
    wx.setStorageSync("openId", openId); //把openId单独作为key值为openId,value值为openId存到小程序的本地存储localStorage里面，并且把userInfo也存了一份
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
page{
  background: #f4f4f4;
  height: 100%;
}
button{
  background: none;
  padding:0;
  font-weight: normal;
  font-size: 32rpx;
  box-sizing: content-box;
}
button::after{
  border: 0;
}
view, text {
  font-size: 28rpx;
  color: #333333;
}
.wxParse .p {
  margin: 0 !important;
}
.wxParse .img{
  display: block !important;
}
</style>
