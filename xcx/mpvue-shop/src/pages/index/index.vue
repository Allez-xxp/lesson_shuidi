<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品" />
        <!-- 放大镜位置，放置图片，用position定位到input输入框中 -->
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <!--swiper用于轮播图；indicator-dots：用于是否展示轮播图上的点 
          autoplay: 是否自动轮播；interval：轮播时间；
          circular：循环不间断轮播；duration: 轮播图之间的切换时间
      -->
      <swiper class="swiper-container" 
      indicator-dots="true"
      autoplay="ture"
      interval="3000"
      circular="true"
      duration="500">
        <!-- block : 用于for循环 
          swiper-item: 每一张轮播图
          -->
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div >
    <div class="channel">
      <div v-for="(item, index) in channel" 
      :key="index"
       @click="categroyList(item.id)">
        <img :src="item.icon_url" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商直供
      </div>
      <div class="content">
        <div v-for="(item, index) in brandList" 
        :key="index" 
        @click="branddetail(item, id)">
          <div>
            <p>{{item.name}}</p>
            <p class="price">{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="" >
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>人气推荐
            <span></span>
            好物精选</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item,index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>￥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true"> 
            <li v-for="(item, index) in topicList" :key="index" @click="topicdetail(item.id)">
              <img :src="item.item_pic_url" alt="">
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>
                  {{item.price_info}}元起
                </div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div v-for="(subitem,subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="">
            <p>{{subitem.name}}</p>
            <p>{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from '../../utils/amap-wx.js'
import {mapState, mapMutations} from 'vuex'
import { get } from '../../utils'     // 导航的banner图我们采用get方法，那么导入get
export default {
  data() {  //数据源
    return {
      // cityName: "南昌",
      banner:[],
      channel:[],
      brandList:[],
      newGoods:[],
      hotGoods:[],
      topicList:[],
      newCategoryList:[]
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  mounted() {
    this.getData()
    this.getCityName()
  },
  methods: {
    ...mapMutations(['update']),
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
      var myAmapFun = new amapFile.AMapWX({key:'d92113c576d7ac584dcf72d12fb534e2'});
      myAmapFun.getRegeo({   //高德地图中获取地址的方法：getRegeo()
        success:function(data){
          //成功回调
          console.log(data)
          
        },
        fail:function(info){
          //失败回调
          console.log(info)
          // _this.cityName='北京'
          _this.update({cityName:'北京'})
        }
      })
    },
    // 获取banner数据方法; 异步
    async getData() {
      // 调用封装接口请求
      // wx.request 封装接口请求，去utils/index.js: 封装接口请求
      // 这里是取数据源的，那就应该调用刚写的接口，那么就需要在当前页面引入get,post这两个方法
      // 此时的get的url可以写成任何样子，因为此处的路径是等会做后端开发时自己定义的路径，记得等会要与后端的一致
      const data = await get('/index/index') //后端必须有一个http://localhost:5757/lm/index/index
      // 这里的get方法是封装的请求
      // 拿数据
      console.log(data)//现在还看不到拿到的数据是什么，因为还没写后端的项目
      // 那么开始后端 用koa2提供/index/index接口给我们这里使用
      // 数据库的数据能输出了之后，接下来打通banner图的前后端协作连接，将数据成功渲染到页面中去。
      //把拿到的数据给到数据源中的banner[]
      this.banner = data.banner,
      this.channel = data.channel,
      this.brandList = data.brandList,
      this.newGoods = data.newGoods,
      this.hotGoods = data.hotGoods,
      this.topicList = data.topicList,
      this.newCategoryList = data.newCategoryList
    },
    toSearch() {
      wx.navigateTo({ 
        url: '/pages/search/main' 
      });
    },
    categroyList(id) {
      wx.navigateTo({ //小程序：跳转下一个页面：navigateTo()
         url: '/pages/categroyList/main?id=' + id  // 跳转路径绑定传递id
      });
    },
    branddetail(id) {
      wx.navigateTo({ 
        url: '/pages/branddetail/main?id' + id 
      });
    },
    tobrandList() {
      wx.navigateTo({ 
        url: '/pages/brandList/main' 
      });
    },
    goodsList(info) {
      if(info == 'hot') {
        wx.navigateTo({ 
          url: '/pages/newgoods/main?isHot=' + 1 
        })
      } else {
        wx.navigateTo({ 
          url: '/pages/newgoods/main?isNew=' + 1 
        })
      }
    },
    topicdetail(id) {
      wx.navigateTo({ 
        url: '/pages/topicdetail/main?id' + id 
      });
    }
  }
}
</script>

<style lang="less" scoped>
// scoped样式私有化; 引入样式文件style.less
@import "./style.less";
</style>