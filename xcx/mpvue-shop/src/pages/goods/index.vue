<template>
<!-- 详情页 -->
    <div class="goods">
        <div class="swiper">
            <!--swiper用于轮播图；indicator-dots：用于是否展示轮播图上的点 
                autoplay: 是否自动轮播；interval：轮播时间；
                circular：循环不间断轮播；duration: 轮播图之间的切换时间
            -->
            <div class="swiper-container" indicator-dots="true"
             autoplay="true" interval="3000" duration="1000"
            >
                <!-- block：无实际意义，用于for循环 -->
                <block>
                    <!-- swiper-item: 每一张轮播图 -->
                    <swiper-item class="swiper-item">
                        <img src="" alt="" class="slide-image" />
                    </swiper-item>
                </block>
            </div>
        </div>
    </div>
</template>
<script>
import {get,post} from '../../utils'
export default{
    data() {
        return{
            gallery:[],  //banner图
            id:'',
            openId:''
        }
    },
    mounted() {
        this.openId = wx.getStorageSync('openId') || '';
        this.goodsDetail()
    },
    methods:{
        // 用于详情页的数据请求接口
        async goodsDetail() {
            const data = await get('/goods/detailaction',{
                id: 1009024,
                openId: this.openId  //用于区分用户身份信息
            })
            console.log(data)
        }
    }
}
</script>

<style lang='less' scoped>
@import './style';
</style>