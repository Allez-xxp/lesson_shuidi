<template>
<!-- 商品详情页 -->
    <div class="goods">
        <!-- swiper用于轮播图 -->
        <div class="swiper">
            <!--indicator-dots：用于是否展示轮播图上的点 
                autoplay: 是否自动轮播；interval：轮播时间；
                circular：循环不间断轮播；duration: 轮播图之间的切换时间
            -->
            <swiper class="swiper-container" indicator-dots="true"
             autoplay="true" interval="3000" duration="1000">
                <!-- block：无实际意义，用于for循环 -->
                <block v-for="(item, index) in gallery" :key="index">
                    <!-- swiper-item: 每一张轮播图 
                     1.没给swiper-item这个容器放样式，因为这个容器会被编译，
                     他是一个块级容器，相当于默认也有一个继承，宽高是继承父容器的 -->
                    <swiper-item class="swiper-item">
                        <img :src="item.img_url" alt="" class="slide-image" />
                    </swiper-item>
                </block>
            </swiper>

            <!-- 小程序分享按钮 -->
            <!-- 手机上手指触摸屏幕的高亮显示，通常我们回去干掉这个操作：hover-class="none" -->
            <!-- 当手机触摸屏幕的时候，会被添加上一个为none的类名， -->
            <!-- 有关小程序的分享，必须要使用button按钮，这是小程序官方文档规定的，还不能是普通的，得加上一个open-type="share" 这个属性-->
            <!-- 只有加了open-type这个属性，小程序才会认可当前这个按钮能够触发分享功能 -->
            <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
        </div>

        <!-- 轮播图下的介绍（优点） -->
        <div class="swiper-b">
            <div class="item">30天无忧退货</div>
            <div class="item">48小时快速退款</div>
            <div class="item">满88元免邮费</div>
        </div>

        <!-- 商品描述 -->
        <div class="goods-info">
            <div class="c">
                <p>{{info.name}}</p>
                <p>{{info.goods_brief}}</p>
                <p>￥{{info.retail_price}}</p>
                <!-- v-if="brand.name"：有则输出，没有则不输出 -->
                <div class="brand" v-if="brand.name">
                    <p>{{brand.name}}</p>
                </div>
            </div>
        </div>
        
        <!-- 选择规格数量栏 -->
        <div class="section-nav" @click="showType">
            <div>请选择规格数量</div>
            <!-- 空div用于放置箭头图片 -->
            <div></div>  
        </div>
        <!-- 选择规格的弹出层 -->
        <!-- 这个pop作为遮罩层显示, 遮罩层是默认不出现的  -->
        <!-- 因此pop这个盒子用一个v-show="showpop",
        (v-if：用它来控制现实和隐藏的时候，是直接控制html结构是否被编译，如果被编译，编译与不编译都会触发浏览器的重塑和回流操作，所以如果有一块DOM结构是频繁出现和消失的时候，用v-if就会加大浏览器的性能消耗，
        v-show：只是在修改css的显示与隐藏，不会触发html结构的重塑和回流，） -->
        <!-- 然后点击遮罩层和叉叉都能把弹出层叉掉，遮罩层绑定一个点击事件 @click="showType"-->
        <div class="pop" v-show="showpop" @click="showType"></div>
        <!-- 动态绑定一个类名，用来修改弹出层的样式，同时，弹不弹出有遮罩层出没出来决定 -->
        <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
            <div class="top">
                <div class="left">
                    <img :src="info.primary_pic_url" alt="">
                </div>
                <div class="right">
                    <div>
                        <p>价格￥{{info.retail_price}}</p>
                        <p>请选择数量</p>
                    </div>
                </div>
                <div class="close" @click="showType">x</div>
            </div>
            <div class="bottom">
                <p>数量</p>
                <!-- 加减的输入框 -->
                <div class="count">
                    <div class="cut" @click="reduce">-</div>
                    <!-- v-model="number": 双向绑定数据源
                         disabled="false"：不可以手动修改，只能通过加减改变数量
                     -->
                    <input type="text" class="number" v-model="number" disabled="false">
                    <div class="add" @click="add">+</div>
                </div>
            </div>
        </div>

        <!-- 商品参数 -->
        <div class="attribute">
            <div class="head">
                商品参数
            </div>
            <div class="item" v-for="(item, index) in attribute" :key="index">
                <div>{{item.name}}</div>
                <div>{{item.value}}</div>
            </div>
        </div>

        <!-- 商品图片展示 -->
        <div class="detail" v-if="goods_desc">
          <!-- 放上一个微信自带的标签，做图片预览功能-->
          <!-- 需要放上一个content参数（渲染内容），里面放的内容是需要展示的数据内容 -->
          <!-- 当前这个wxParser这个标签我们是没有的，要做一个额外的处理,要引入 他不是小程序自带的是mpvue中带的-->
          <wxParse :content="goods_desc" ></wxParse>
        </div>

        <!-- 常见问题 -->
        <div class="common-problem">
          <div class="head">
              <!-- 用一个小程序里的标签text -->
              <text class="title">常见问题</text>
          </div>
          <!-- 然后问题和答案作为一个模块,有4组，用一个for循环 -->
          <div class="bottom">
              <div class="item" v-for="(item,index) in issueList" :key="index">
                  <div class="question-box">
                      <!-- 首先前面有一个点，然后后面是问题 -->
                      <text class="spot"></text>
                      <text class="question">{{item.question}}</text>
                  </div>
                  <div class="answer">{{item.answer}}</div>
              </div>
          </div>
      </div>

      <!-- 大家都在看 -->
      <div class="common-problem">
          <div class="head">
              <!-- 用一个小程序里的标签text -->
              <text class="title">大家都在看</text>
          </div>
          <!-- 然后问题和答案作为一个模块,有4组，用一个for循环 -->
          <div class="sublist">
              <div v-for="(subitem, index) in productList" :key="index">
                  <img :src="subitem.list_pic_url" alt="">
                  <p>{{subitem.name}}</p>
                  <p>￥{{subitem.retail_price}}</p>
              </div>
          </div>
      </div>

      <!-- 底部栏footbar(收藏，购物车，立即购买，加入购物车（标红）) -->
      <div class="bottom-fixed">
          <!-- 点击后，collect能再加上一个类名 -->
          <div class="collect-box" @click="collect">
              <!-- 收藏 -->
              <div class="collect" :class="[collectFlag ? 'active': '']"></div>
          </div>
          <div class="car-box" @click="toCart">
              <!-- 购物车 -->
              <div class="car" >
                  <!-- 角标，就是有几件商品在购物车 -->
                  <span>3</span>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588136330960&di=e8c24af3df84caa2d5e3e87bbd9a4857&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F21%2F07%2F5b6aec225946c_610.jpg" alt="">
              </div>
          </div>
          <div @click="buy">立即购买</div>
          <div @click="addCart">加入购物车</div>
      </div>
    </div>
</template>
<script>
import {get,post} from '../../utils'
// 先安装插件，再引入。npm install --save mpvue-wxparse
//引入一个插件叫mpvue-wxparse,适用于mpvue的微信小程序富文本解析组件
import wxParse from 'mpvue-wxparse' 

export default{
    data() {
        return{
            gallery:[],  //banner图
            id:'',
            openId:'',
            info: {},  // 对象
            brand: {},
            showpop: false,
            number: 0,  // 默认数量为0
            attribute: [],  // 商品的规格参数
            goods_desc: '',  // 用于商品细节展示的数据内容（图片）
            issueList: [],  // 存放常见问题
            productList:[]  // 存放大家都在看内容
        }
    },
    components: {
        wxParse  //声明组件
    },
    // 商品分享配置标题和内容；小程序自带方法onShareAppMessage()
    onShareAppMessage() {
        // 商品的名字是在getDetail接口请求的时候能拿到的，而且商品的详情信息已经放到数据源中去了的
        console.log(this.info.name); //输出了undefined，没拿到，为什么？
        // 因为我们拿到的data中的info是个数组，然后里面的第一条信息才是我们的商品详情，
        // 所以我们在后端调整一下ctx.body中的info//现在后端输出就不再是一个数组，而是一个对象了
        // 然后数据源中之前定义的info:' '=>info:{} (一个对象)
        // 数据出来了，说明这个方法被触发了，然后可以做配置：小程序的语法
        return {
            title: this.info.name,
            // path: 想要将当前小程序的哪一个页面当作分享图片的看到的页面
            // this.info.id：后面的这个id是数据库中有的，当别人点击小程序进来这个页面的时候，没有这个id是看不到东西的，当前数据详情页的展示必须要用到id去做接口请求
            path: '/pages/goods/main?id' + this.info.id, 
            // imageUrl：设置限定一下分享的那个图片，不然会实时截屏小程序的页面当作我们分享的时候的图片 
            // this.gallery[0].img_url：直接放第一张图片作为分享的图片展示  
            imageUrl: this.gallery[0].img_url 
                
            
        };
    },
    mounted() {
        this.openId = wx.getStorageSync('openId') || '';
        this.goodsDetail()
    },
    methods:{
        // 用于获取详情页的数据的请求接口
        async goodsDetail() {
            const data = await get('/goods/detailaction',{
                id: 1009024,
                openId: this.openId  //用于区分用户身份信息
            })
            console.log(data)
            // 将从后端获取到的表示商品详情：info，放到vue的数据源data中。在数据源上也放上一个info:''
            this.info = data.info
            // 把从后端获取到的商品图片放到vue的数据源data中
            this.gallery = data.gallery
            // 将从后端获取到的商品规格参数放到vue的数据源data中
            this.attribute = data.attribute
            // 将从后端获取到的商品细节描述（图片）放到vue的数据源data中
            this.goods_desc = data.info.goods_desc
            // 将从后端获取到常见问题的数据放到vue的数据源data中
            this.issueList = data.issue
            this.productList = data.productList
        },
        showType() {
            // 点击一下出现，再点击一下消失
            this.showpop = !this.showpop
        },
        add() {
            this.number += 1
        },
        reduce() {
            // 数量减到1时，不需要继续减，返回false
            if(this.number > 1) {
                this.number -= 1
            } else {
                return false
            }
        }
    }
}
</script>

<style lang='less' scoped>
@import './style';
@import url('~mpvue-wxparse/src/wxParse.css');
</style>