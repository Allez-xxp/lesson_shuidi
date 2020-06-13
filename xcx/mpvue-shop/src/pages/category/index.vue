<template>
  <!-- 分类页面 -->
  <div class="category">
      <!-- 头部搜索框设计 -->
      <div class="search" @click="toSearch">
          <div class="ser">
              <span class="icon"></span>
              <span>商品搜索，共239款好物</span>
          </div>
      </div>
      <div class="content">
          <!-- 左右布局 -->
          <!-- 左边：沿y轴上下滚动的菜单列表 -->
          <scroll-view class="left" scorll-y="true">
                <div class="iconText" v-for="(item, index) in listData" :key="index" 
                @click="selectItem(item.id, index)"
                :class="[index === nowIndex ? 'active' : '']">
                    {{item.name}}
                </div>
          </scroll-view>
          <!-- 右边：沿y轴上下滚动的商品类型 -->
          <scroll-view class="right" scorll-y="true">
              <div class="banner">
                  <img :src="detailData.banner_url" alt="">
              </div>
              <div class="title">
                  <span>-</span>
                  <span>{{detailData.name}}分类</span>
                  <span>-</span>
              </div>
              <div class="bottom">
                  <div class="item" v-for="(item,index) in detailData.subList" :key="index"
                  @click="categoryList(item.id)">
                      <img :src="item.wap_banner_url" alt="">
                      <span>{{item.name}}</span>
                  </div>
              </div>
          </scroll-view>
      </div>
  </div>
</template>

<script>
import { get } from '../../utils'
export default {
    data() {
        return {
            listData: [], //存储菜单列表数据
            nowIndex: 0,  //当前索引，指向哪个商品类型   
            id:'1005000' ,
            detailData: {}
        }
    },
    mounted() {
        this.getListData()
        this.selectItem(this.id, this.nowIndex)
    },
    methods: {
        // 点击搜索框，跳转到搜索页面
        toSearch() {
            wx.navigateTo({ 
                url: '/pages/search/main' 
            });
        },
        // 用于获取左边的菜单列表数据方法，做接口请求
        async getListData() {
            const data = await get('/category/indexAction')
            // console.log(data)
            this.listData = data.categoryList
        },
        // 用于获取右边商品的数据（对应菜单）方法，做接口请求
        async selectItem(id, index) {
            this.nowIndex = index
            const data = await get('/category/currentAction',{
                id: id
            })
            console.log(data)
            this.detailData = data.data.currentOne
        },
        // 点击右侧商品类型，跳转到对应的商品详情
        categoryList(id) {
            wx.navigateTo({ 
                url: '/pages/categorylist/main?id=' + id 
            });
        }
    }

}
</script>

<style lang="less" scoped>
@import './style.less';
</style>