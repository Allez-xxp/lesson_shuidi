<template>
  <!-- 订单支付页面 -->
  <div class="order">
        <!--收件人相关信息  -->
        <!-- 1. v-if，v-else判断 是否存在默认地址:
             有则触发addressDOM结构；没有则触发seladdressaddressDOM结构.
             2. 如果存在默认地址，触发addressDOM结构，
             点击时触发toAddressList事件：跳转到地址列表页面：选择修改或新增地址
             3. 如果不存在默认地址，触发seladdressaddressDOM结构，
             点击时触发toAdd事件：跳转到添加地址页面：添加默认地址
        -->
        <div class="address" v-if="address.name" @click="toAddressList">
            <div class="item">
                <div class="list">
                    <div class="addresslist">
                        <div>
                            <span>{{address.name}}</span>
                            <div class="moren">默认</div>
                        </div>
                        <div class="info">
                            <p>{{address.mobile}}</p>
                            <p>{{address.address + address.address_detail}}</p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加默认收货地址 -->
        <div class="seladdress" v-else @click="toAdd">请选择默认地址</div>
        <!-- 支付详情 -->
        <div class="orderbox">
            <div class="item">
                <div>商品合计</div>
                <div>￥{{allprice}}</div>
            </div>
            <div class="item">
                <div>运费</div>
                <div>免运费</div>
            </div>
            <div class="item">
                <div>优惠券</div>
                <div>暂无</div>
            </div>
        </div>
        <!-- 下面的商品订单详情，购买数量 -->
        <!-- 如果是从底部的购物车页面选中了多个商品的 去到支付详情页面，这个地方展示的就是购物车中所有的数据，所以需要一个for循环 -->
        <div class="cartlist" v-for="(item,index) in listData" :key="index">
            <div class="item">
                <div class="con">
                    <!-- 左右两部分 -->
                    <div class="left">
                        <div class="img">
                            <img :src="item.list_pic_url" alt="">
                        </div>
                        <div class="info">
                            <p>{{item.goods_name}}</p>
                            <p>￥{{item.retail_price}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="num">x{{item.number}}</div>
                    </div>
                </div>
            </div>
        </div>    
        <!-- 底部栏 总价 -->
        <div class="bottom">
            <div>实付：￥ {{allprice}}</div>
            <div class="pay">支付</div>   
        </div>
  </div>
        
</template>

<script>
import { get, post, getStorageOpenId } from '../../utils'
export default {
    data() {
        return {
            address: {}, //地址
            price: '', //商品单价
            allprice: '', //商品合计，
            openId: '',
            addressId: '',
            listData: {} //订单列表
        }
    },
    // 小程序自带的onShow()方法，用于获取用户id
    onShow() {
        if(wx.getStorageSync('addressId')){
            this.addressId = wx.getStorageSync('addressId');
        }
        this.openId = getStorageOpenId()
        this.getDetail()
    },
    methods: {
        // 点击时跳转到地址列表页面，选择修改或新增地址
        toAddressList() {
            wx.navigateTo({ 
                url: '/pages/addressSelect/main' 
            });
        },
        // 点击添加收货地址事件，跳转去添加收货地址页面
        toAdd() {
            wx.navigateTo({ 
                url: '/pages/addAddress/main' 
            });
        },
        // 调用接口请求
        async getDetail() {
            const data = await get('/order/detailAction', {
                openId: this.openId,
                addressId: this.addressId
            })
            // console.log(data)
            if(data) {
            // this.allprice = data.price //还要更改
            this.listData = data.goodsList
            this.address = data.address
            }
            // 计算合计
            this.listData.map((item) => {
                this.allprice += item.retail_price*item.number
            })
        
        }
    }
}
</script>

<style lang='less' scoped>
@import './style';
</style>