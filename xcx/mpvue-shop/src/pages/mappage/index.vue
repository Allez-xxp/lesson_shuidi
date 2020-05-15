<template>
    <div class="mappage">
        <div class="section">
            <input type="text" 
            placeholder="搜索" 
            focus="true"
            v-model="keywords"
            @input="bindInput">
        </div>
        <!-- 上下滚动 :scroll-y="true"-->
        <scroll-view 
        :scroll-y="true" 
        class="addcont" 
        style="height: 500rpx;">
            <div 
            class="result" 
            @touchstart="bindSearch(item.name)"
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
import amapFile from '../../utils/amap-wx' //引用高德地图的api
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            tips:[],
            longitude:0,  // 中心经度
            latitude:0,   // 中心纬度
            markers: [],   // 标记点
            keywords: ''
        }
    },
    mounted() {//生命周期(函数) 获取当前地理位置
        this.getMapaddress()//调用这个方法
    },
    methods: {
        ...mapMutations(['update']),  //解构mapMutations，获取update方法
        //调用高德地图，获取当前位置
        getMapaddress() {
            let _this = this//在高德地图中有回调函数，为防止this的作用域被修改先在这里保存一下
            // console.log(_this)
            //myAmpFun相当于获得了地理位置信息的高德地图的代表
            var myAmapFun = new amapFile.AMapWX({key:'d92113c576d7ac584dcf72d12fb534e2'});
            myAmapFun.getRegeo({   //高德地图中获取地址的方法：getRegeo()//是有一些参数支持的
                iconPath:"static/tabs/home.png",//表示当前点的图标
                iconWidth:22,
                iconHeight:32,
                // 回调函数
                success(data){
                    console.log(data) //先打印一下这个回调参数
                    let marker = [
                        {
                            id: data[0].id,
                            latitude: data[0].latitude,
                            longitude: data[0].longitude,
                            width: data[0].width,
                            height: data[0].height
                        }
                    ]
                    _this.markers = marker
                    _this.longitude = data[0].longitude
                    _this.latitude = data[0].latitude
                },
                fail(info) {
                    console.log(info);
                }
            })
        },
        bindInput(e) {
            // console.log(e);
            let _this = this;
            let keywords = _this.keywords;
             var myAmapFun=new amapFile.AMapWX({key:'d92113c576d7ac584dcf72d12fb534e2'})
            // getInputtips是用来搜索补全的
            myAmapFun.getInputtips({
                keywords: keywords,
                location: '',
                success:function(data){
                    // console.log(data)
                    if(data && data.tips){
                        _this.tips=data.tips//并且他是放在scroll-view中的，可以上下滚动的
                    }
                }
            })
        },
        bindSearch(cityName){
            this.update({cityName:cityName})
            wx.navigateBack({//返回页面
                delta:1  //1代表返回上1个页面，2代表返回上两个页面
            });
        }
    }
}
</script>
<style lang="less" scoped>
// scoped样式私有化; 引入样式文件style.less
@import "./style.less";
</style>