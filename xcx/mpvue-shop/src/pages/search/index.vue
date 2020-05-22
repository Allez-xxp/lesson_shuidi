<template>
    <div class="search">
        <div class="head">
            <!-- 就像我们消息的键盘右下角有发送或者是搜索，这个状态只可以自主更改的。confirm-type只能在type=”text”的时候才能设置。
            focus="true" 是允许聚焦。
            @focus绑定一个focus,即聚焦事件：当搜索牙刷时显示了牙刷商品，当再次点击input框时，收起商品展示，回到搜索条。
            @input=""再绑定input事件，在小程序中input事件展示搜索提示信息。
            @confirm="searchWords"就是当点击搜索的时候要做的事。-->
            <div>
                <img src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png" alt="">
                <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
                <img @click="clearInput" class="del" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3594958599,3080810534&fm=26&gp=0.jpg" alt="">
            </div>
            <div @click="cancel">取消</div>
        </div>
        
        <!-- 有和没有所搜索的商品，两个div应该是只能存在一个的，所以放v-if -->
        <div class="searchtips" v-if="words">
            <div>
                牙刷
            </div>
            <div class="nogoods">数据库暂无此类商品</div>
        </div>
        <div class="history">
            <div class="text">
                <div>历史记录</div>
                <div @click="clearHistory"></div>
            </div>
            <div class="context">
                <div>日式</div>
            </div>
        </div>
        <div class="history hotsearch">
            <div class="text">
                <div>热门搜索</div>    
            </div>
            <div class="context">
                <div class="active">日式</div>
                <div>日式1</div>
                <div>日式2</div>
                <div>日式3</div>
            </div>
        </div>
    </div>
</template>

<script>
import {get, post} from '../../utils'
export default {
  data (){
    return {
      words:'',
      openid:'',
      hotData:[],
      historyData:[]
    }
  },
  mounted (){
    this.openid = wx.getStorageSync('openid') || ''; //？？this.openid往本地存储把openid取出来,小程序其他页面要用也要把openid取出来用
    this.getHotData() //先看下效果，去页面搜索/search/indexaction
  },
  methods:{
    clearInput(){
      this.words=''
    },
    cancel(){

    },
    clearHistory(){

    },
    inputFocus(){

    },
    tipsearch(){

    },
    async searchWords(e){ //因为是要做接口请求的方法，所以直接写成异步方法
    //是有两种方法是可以拿到input框中的值的：1.this.words,拿到数据源中的值（vue中的语法，双向数据绑定）2.我们用的这个（小程序当中的语法）
    // console.log(e) //看看这个事件参数中会存在什么东西(电脑上直接回车看结果)
    //考虑到兼容性问题，还是用这个：
    let value = e.currentTarget.dataset.value
    this.words = value || this.words //有value就用，没有就用vue的双向数据绑定
    //然后用这个word去做接口请求。引入get,post接口才能继续逻辑开发
    //添加历史搜索记录的接口（请求的路径）；请求到的数据要做的操作是？第二个操作传参数(data)
    const data = await post('/search/addhistoryaction',{
      openId:this.words,
      keyword:value || this.words
    })
    console.log(data) //现在还不能在控制台看到data,因为当前的接口还未被定义出来，那么我们去后端。
    //routes/index.js->search/index写完给数据库添加搜索记录的接口之后，去浏览器5757/lm/search/addhistoryaction看看 not found,接口是需要传入参数的，所以我们在放上一个取历史搜索记录的方法。
    //取搜索记录(应该是实时出现的，也就是存的同时也要拿出来展示)
    this.getHotData()
    },
    async getHotData(first){
      const data = await get('/search/indexaction?openId=' +this.openid) //this.openid从哪里来？所以要在数据源放上一个id
      //openId是之前定义的一个参数的key值，跟数据源无关，openid是我们需要去取到的用户的身份信息
      //取出记录
      this.historyData = data.historyData
      this.hotData = data.hotData
      console.log(data) //然后我们先去后端把indexaction接口定义出来。
    }
  }
}
</script>

<style lang='less' scoped>
@import './style';
</style>