<template>
  <!-- 购物车页面 -->
    <div class="cart">
      <!-- 头部栏 介绍特点（静态HTML） -->
        <div class="top">
            <div>30天无忧退货</div>
            <div>48小时快速退款</div>
            <div>满88元包邮</div>
        </div>
        <!-- 购物车商品列表，布局分为左右两部分 
            左边为勾选按钮和商品信息；右边为商品数量
        -->
        <div class="cartlist">
            <div class="item" v-for="(item,index) in listData" :key="index">
                <div class="con">
                    <div class="left">
                        <!-- 用来做勾选的 -->
                        <!-- 点击前面的圈圈的时候，要能勾选，给icon添加一个点击事件 -->
                        <!-- 传实参进去，表示当前点击事件选中的是哪个商品 -->
                        <!-- 动态加上类名，点击时候的效果:class="{Listids.index}"这个index是div的class为item中的index -->
                        <!-- for循环出来了很多个item,每个item都有自己的index -->
                        <div class="icon" @click="changeColor(index,item.goods_id)" 
                        :class="[Listids[index] ? 'active': '']"></div>
                        <div class="img">
                            <img :src="item.list_pic_url" alt="">
                        </div>
                        <!-- 商品名称和价格 -->
                        <div class="info">
                            <p>{{item.goods_name}}</p>
                            <p>￥{{item.retail_price}}元</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="num">x {{item.number}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!--相对于屏幕进行定位 底部栏：左：全选按钮；右：总价，下单； -->
        <div class="fixed">
            <div class="left" @click="allCheck" :class="{'active': allcheck}">
                全选({{isCheckedNumber}})
            </div>
            <div class="right">
                <div>￥{{allPrice}}</div>
                <div @click="orderDown">下单</div> 
            </div>
        </div>
    </div>
</template>

<script>
import { get,post,getStorageOpenId} from "../../utils";
export default {
    data() {
        return {
            openId: '',
            listData: [], //存储购物车列表的商品数据
            Listids: [],  //用于存储商品id
            allcheck: false  //全选，勾打不打通过这个来控制
        }
    },
    // 小程序自带的生命周期：onShow()
    onShow() {
        this.openId = getStorageOpenId()
        this.getListData()
    },
    methods: {
        // 用于页面初始化时请求购物车数据方法，做接口请求
        async getListData() {
            const data = await get('/cart/cartList',{
                openId: this.openId
            })
            console.log(data);
            this.listData = data.data  //后面再加一个data是因为后端请求的时候返回时用了一个data
        },

        // 单选,点击勾选按钮，变颜色
        // 当点击按钮的时候，判断当前listids下面的index,
        // 比如点击第一条数据，此刻的index是0，然后就判断当前数组中的第1条数据，也就是下表为0的数据，是否存在，
        // 存在就把这条数据的id添加到当前数组中去，就是vue的方法this.$set，当前数组就会放上电极的这件商品的id,然后动态类名就会生效，
        // 再点一次的话就是当前数组中已经有这个id，所以走if那里的逻辑，修改里面的值，把下标为0的这条数据直接置为false,
        changeColor(index, id) {
            // 首先要去判断一个东西 先去数据源中放上一个数据 listids 
            if (this.Listids[index]) {
                // 用vue中的一个方法 往this.Listids中植入一个index和false
                // 这个就是通过js去修改数据源
                this.$set(this.Listids, index, false)
            } else {
                // 有id就改成false,没有id就加上id
                this.$set(this.Listids, index, id)
            }
            // 然后想让他变颜色，动态给class再加上一个active 
        },
        // 全选
        allCheck() {
            // 更全面的考虑问题:
            // 当上面的单选选中了某几个或者应给都没选，点击全选的时候要让所有内容都选中，
            // 1. 不管前面有几个选中了，先全部都清空掉，然后去统一做所有数据的选中
            // 清空选择操作，就是再取消全选的时候会执行这个
            this.Listids = [];
            if(this.allcheck) {
                this.allcheck = false;
            } else {
                this.allcheck = true;
                // 全部选择
                // 也就是再重复地做单选
                for(let i = 0; i < this.listData.length; i++) {
                    const element = this.listData[i] //element就代表着每一条数据,是一个数组
                    this.Listids.push(element.goods_id) //我们只放id
                }
            }
            //全选自己的动态变化有了，然后是点击全选，全部选中的问题 
            //如果页面上没有被全部都选中的话，全选本身是不能被打勾的，再要点击全选的时候就是想要让页面上所有的数据都打上勾
            //这个操作应该放在else中，就是全选按钮本身之前没有打勾的时候
            // 利用vue提供的index下标
            // 当只选中了几个的时候，再选择全选做两件事：
            // 先清空前面已经选择了的，然后再去全选
            // 还有当已经手动选了全部的的时候，全选这个按钮也应该亮起来，所以再加一个逻辑，当单独做勾选操作的时候
            // 用一个计算属性
        },
        // 点击下单
        async orderDown() {
            // 1. 用户没有选择商品时，点击下单，要弹出提示框：提示用户选择商品
            // 2. 成功下单的商品要移出购物车
            if(this.Listids.length === 0) {
                wx.showToast({
                  title: '请选择商品', //提示的内容,
                  icon: 'none', //图标,
                  duration: 2000, //延迟时间,
                  mask: true, //显示透明蒙层，防止触摸穿透,
                  success: res => {}
                })
                return false
            }
            // 去除数组中空的false
            let newgoodsid = []  // newgoodsid存储的才是真正要下单的商品
            for(let i = 0; i<this.Listids.length; i++) {
                const element = this.Listids[i]
                if(element) {
                    newgoodsid.push(element)
                }
            }
            // 拼接为数组格式，元素以逗号隔开
            let goodsId = newgoodsid.join(',')
            const data = await post('/order/submitAction',{
                goodsId: goodsId,
                openId: this.openId,
                allPrice: this.allPrice
            })
            console.log(data)
            if(data) {
                wx.navigateTo({ 
                    url: '/pages/order/main' 
                });
            }
        }
    },
    // 计算属性，里面的方法都要有return
    computed: {
        //全选
        isCheckedNumber() {
            let number = 0;  //累计页面上有多少条数据被单选勾上了的
            // 循环Listids,看里面到底放了几个
            for(let i = 0; i < this.Listids.length; i++) {
                if(this.Listids[i]) {
                    // 说明已经有这个数据了，数组中有一个值就加一
                    number++
                }
            }
            if(number === this.listData.length && number !== 0) {
                // 说明当前页面上数全部被勾选了
                this.allcheck = true;
            } else {
                // 要加上否则，因为这个是一个计算属性，根据数据源中的数据发生变化作响应式处理
                // 也就是一条数据都没有的时候全选按钮自动不被勾选，这样手动取消任意个的时候全选按钮的也会响应式的被取消
                this.allcheck = false
            }
            return number
            // 全选后面加上选中了几条 计算属性中的方法是当作数据源中的数据一样使用的，所以上面的括号里面可以直接放上计算属性中的值
        },
        //计算总价格
        allPrice() {
            let Price = 0;  // 存储总价格
            // 注意要计算的是被勾选的商品的总价格
            // 它的长度就是当前被勾选的件数，数组中存放的数据就是当前这件商品的id
            for(let i = 0; i < this.Listids.length; i++) {
                if(this.Listids[i]) {
                    // 记得是拿listData这个数组，因为Listids里面放的是id,里面没有价格和数量
                    Price += this.listData[i].retail_price * this.listData[i].number;
                }
            }
            return Price
        }
    }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>