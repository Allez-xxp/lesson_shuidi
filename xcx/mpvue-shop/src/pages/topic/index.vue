<template>
    <div class="topic">
        <ul class="list">
            <li v-for="(item, index) in topicList" :key="index" @click="topicDetail(item.id)">
                <div class="t-img">
                    <img :src="item.scene_pic_url" alt="">
                </div>
                <div class="info">
                    <p>{{item.title}}</p>
                    <p>{{item.subtitle}}</p>
                    <p>￥{{item.price_info}}元起</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {get} from '../../utils'
export default {
    data() {
        return {
            page: 1,  //用于标记下拉加载的页数
            topicList:[],  //存储从后端获取的列表数据
            total: ''  //存储页面数
        }
    },
    // 小程序自带的方法(默认支持，关闭)，下拉刷新商品数据方法
    // 但是需要一些操作完善，开启功能: 
    // 去APP.json中设置，在windoes中添加"enablePullDownRefresh": true
    onPullDownRefresh() {
        this.page = 1
        this.getListData()
        // 调用停止当前页面下拉刷新方法
        wx.stopPullDownRefresh()
    },
    // 上拉加载更多商品数据方法
    onReachBottom() {
        // console.log(6666)
        this.page = this.page + 1
        if(this.page > this.total) {
            return false
        }
        this.getListData()
    },
    mounted() {
        this.getListData(true)
    },
    methods: {
        // 用于获取专题列表的商品数据方法，做接口请求
        async getListData(first) {
            const data = await get('/topic/listAction',{
                page: this.page
            })
            console.log(data)
            this.total = data.total
            if(first) {
                 this.topicList = data.data
            } else {
                this.topicList = this.topicList.concat(data.data)
            }   
        },
        // 点击专题列表中的商品时，发生跳转，跳转到专题详情页面并传实参id
        topicDetail(id) {
            wx.navigateTo({ 
                url: '/pages/topicdetail/main?id=' + id 
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>