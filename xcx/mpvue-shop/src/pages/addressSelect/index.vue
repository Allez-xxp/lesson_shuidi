<template>
  <!-- 选择收货地址页面 -->
  <div class="address">
    <!-- scroll-view：滚动条，scroll-y="true"：y轴方向滚动（数据过多）
         tyle="height:100%"：行内样式，高度100%
    -->
    <scroll-view  scroll-y="true" class="addcont" style="height:100%">
      <!-- 放置地址信息 -->
      <div class="item" v-if="listData.length !==0">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist">
            <!-- 左中右三边的div 
                左边放姓名，默认地址；中间放收件人信息（电话，具体地址信息），右边为图标 修改（点击）
            -->
            <div>
              <span>{{item.name}}</span>
              <div class="moren" v-if="item.is_default ===1">默认</div>
            </div>
            <!-- 点击中间，跳去上一个页面，并且把所选中的地址带回上一个页面 -->
            <div class="info" @click="selectAddress(item.id)">
              <p>{{item.moblie}}</p>
              <p>{{item.address+item.address_detail}}</p>
            </div>
            <!-- 传递实参，点击跳转到修改地址信息页面 -->
            <div @click="toDetail(item.id)"></div>
          </div>
        </div>
        
      </div>
      <!-- 用于第一次使用，没有添加过地址的HTML结构，与item是if-else关系 -->
      <div class="center" v-else>
        <p>收货地址在哪里？</p>
      </div>
    </scroll-view>
    
    <!-- 底部栏：两个盒子并列 -->
    <div class="bottom">
      <!-- 绑定同一个方法，怎么区分它是新建还是一键导入？上面那个传个实参 -->
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>  
  </div>
</template>

<script>
import {get, getStorageOpenId} from '../../utils'
export default{
  data() {
    return {
      listData: [],  // 地址列表
      openId: ''
    }
  },
  onShow() {
    this.openId = getStorageOpenId()
    this.getAddressList()
  },
  methods: {
    // 点击修改图标，跳转到信息修改页面；但是要将已经显示的数据也显示到修改页面，所以传实参id
    toDetail(id) {
      wx.navigateTo({ 
          url: '/pages/addAddress/main?id=' + id
        });
    },
    // 判断参数index,有值就是新建，没有就是一键导入
    wxaddress(index) {
      if(index === 1) {
        wx.navigateTo({
          url: '/pages/addAddress/main' //之前创建过这个页面
        })
      } else {
          // 获取微信信息的方法，小程序中有一个api
          wx.chooseAddress({
            // Es5的方法，回调函数中的回调参数，去编码一下
            success: function(res) {
            // console.log(res) //??只有张三？
            // 重新编码一下
            let result = encodeURIComponent(JSON.stringify(res)); //因为数据格式的问题，需要格式化一下
            console.log(result);
            // 还是要跳转，要跳去编辑地址页面，然后确认保存后这条数据才会被保存到数据库中去
            wx.navigateTo({
              url: '/pages/addAddress/main?res=' + result //把拿到的地址带过去
            })
          }
        })
      }
    },
    // 向后端进行接口请求，获取地址列表信息
    async getAddressList() {
      // 绑定this的作用域
      let _this = this
      const data = await get('/address/getListAction',{
        openId: _this.openId  // 传递参数给后端，才知道是哪个用户的地址列表
      })
      console.log(data)
      // 将从后端拿到的数据放入数据源中
      _this.listData = data.data
    }, 
    // 跳去上一个页面，并且把所选中的地址带回上一个页面(支付页面)
    selectAddress(id) {
      //将当前这条地址信息的id存到本地（上一个页面order中有一个get)
      // 从这里条回去的时候order页面，就一定能获取到当前address的id
      wx.setStorageSync('addressId', id) 
      
      wx.navigateBack({
        dalta: 1 //返回一层
      })
    }
  }
  
  
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>