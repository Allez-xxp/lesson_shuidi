<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div>{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <!-- 放大镜位置，放置图片，用position定位到input输入框中 -->
        <span><input class="icon"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "南昌",
    }
  },
  methods: {
    toMappage(){
      //授权否？通过wx.getSetting先查询一下用户是否授权"scoped.record"
      let _this=this
      wx.getSetting({
        success:(res)=>{
          //如果没有同意授权则打开设置
          // console.log(res)
          if(!res.authSetting['scope.userLocation']){
            // wx.openSetting 打开授权位置信息
            wx.openSetting({
              success:res=>{
                //获取授权位置信息
                _this.getCityName()
              }
            })
          }else{
            wx.navigateTo({
              url:'/pages/mappage/main',
            });
            // _this.cityName='北京'
            // _this.getCityName()
          }
        },
        fail:(err)=>{
          console.log(err)
        },
        complete:()=>{}
      });
    },
    getCityName(){
      let _this=this
      var myAmapFun = new amapFile.AMapWX({key:'947040d1a5c8185746d3cd82f38f24c3'});
      myAmapFun.getRegeo({
        success:function(data){
          //成功回调
          console.log(data)
          // ......
        },
        fail:function(info){
          //失败回调
          console.log(info)
          // _this.cityName='北京'
          _this.update({cityName:'北京'})
        }
      })
    }
  }
}
</script>

<style lang="less">
// scoped样式私有化; 引入样式文件style.less
@import "./style.less";
</style>