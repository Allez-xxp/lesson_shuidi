<template>
    <div class="mappage">
        <div class="section">
            <input type="text" placehodler="搜索" focus="true">
        </div>
        <!-- 上下滚动 :scroll-y="true"-->
        <scroll-view 
        :scroll-y="true" 
        class="addcont" 
        style="height: 500rpx;">
            <div 
            class="result" 
            v-for="(item,index) in tips" 
            :key="index">
                {{item.name}}
            </div>
        </scroll-view>
        <!-- 页面下面再放一张地图，用于显示当前自己的实时位置 -->
        <div class="map_container">
            <!-- scale：缩放级别（3-20），默认值16 -->
            <div class="title">显示当前位置：</div>
            <map 
            class="map" 
            id="map"
            scale="16" 
            :longitude="longitude"
            :latitude="latitude"
            :markers="markers">
            </map>
        </div>
    </div>
</template>
<script>
import amapFile from "../../utils/amap-wx" //引用高德地图的api
export default {
    data() {
        return {
            tips:[],
            longitude:0,  // 中心经度
            latitude:0,   // 中心纬度
            markers: []   // 标记点
        }
    },
    mounted() {
        this.getMapaddress()
    },
    methods: {
        let _this = this;
        var myAmapFun = new amapFile.AMapWX({
            key: 'd92113c576d7ac584dcf72d12fb534e2'
        })
        myAmapFun.getRegeo({
            iconPath: "static/tabs/home.png",//表示当前点的图标
            iconWidth: 22,
            iconHeight: 32,
            success: function(data) {
                console.log(data);
            },
            fail(info) {
                console.log(info);
            }
        })
    }
}
</script>
<style lang="less" scoped>
// scoped样式私有化; 引入样式文件style.less
@import "./style.less";
</style>