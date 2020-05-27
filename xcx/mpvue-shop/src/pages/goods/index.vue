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

    </div>
</template>
<script>
import {get,post} from '../../utils'
export default{
    data() {
        return{
            gallery:[],  //banner图
            id:'',
            openId:'',
            info: {},  // 对象
            brand: {},
            showpop: false
        }
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
        },
        showType() {
            // 点击一下出现，再点击一下消失
            this.showpop = !this.showpop
        }
    }
}
</script>

<style lang='less' scoped>
@import './style';
</style>