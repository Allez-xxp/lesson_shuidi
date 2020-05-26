<template>
<!-- 搜索页面 -->
    <div class="search">
        <div class="head">
            <!-- 就像我们消息的键盘右下角有发送或者是搜索，这个状态只可以自主更改的。confirm-type只能在type=”text”的时候才能设置。
            focus="true" 是允许聚焦。
            @focus绑定一个focus,即聚焦事件：当搜索牙刷时显示了牙刷商品，当再次点击input框时，收起商品展示，回到搜索条。
            @input=""再绑定input事件，在小程序中input事件展示搜索提示信息。
            @confirm="searchWords"就是当点击搜索的时候，执行searchWords事件。
            v-model="words" 绑定数据源，当点击热门搜索或历史记录的div，执行searchWords时，input框中的value值发生改变，即数据源发生改变-->
            <div>
                <img src="http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/search2-2fb94833aa.png" alt="">
                <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
                <img @click="clearInput" class="del" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3594958599,3080810534&fm=26&gp=0.jpg" alt="">
            </div>
            <div @click="cancel">取消</div>
        </div>
        
        <!-- 1. 有和没有所搜索的商品，两个div应该是只能存在一个的，所以放v-if 
             2. v-if和v-for不能放在一个dom结构上，不能一起使用
        -->
        <div class="searchtips" v-if="words">
          <div v-if="tipsData.length != 0">
            <div v-for="(item, index) in tipsData" :key="index" >
                {{item.name}}
            </div>
          </div>
          <div class="nogoods" v-else>数据库暂无此类商品.....</div>
        </div>

        <div class="history" v-if="historyData.length!==0">
            <div class="text">
                <div>历史记录</div>
                <!-- 垃圾桶 清空历史记录 -->
                <div @click="clearHistory"></div>
            </div>
            <div class="context">
                <div v-for="(item, index) in historyData" 
                :key="index" @click="searchWords" :data-value="item.keyword">
                  {{item.keyword}}
                </div>
            </div>
        </div>
        
        <div class="history hotsearch">
            <div class="text">
                <div>热门搜索</div>    
            </div>
            <div class="context">
              <!-- 动态添加类名，给第一框添加样式；:class="{active: item.is_hot===1}
                   页面上每一个div都有data-value值，双向绑定div中的keyword值
              -->
                <div  v-for="(item, index) in hotData" 
                :key="index" :class="{active: item.is_hot===1}"
                @click="searchWords" :data-value="item.keyword">
                  {{item.keyword}}
                </div>
                
            </div>
        </div>

        <!-- 商品列表 -->
        <div class="goodsList" v-if="listData.length !==0">
          <div class="sortnav">
            <div @click="changeTab(0)" :class="[0 === nowIndex ? 'active': '']">综合</div>
            <div @click="changeTab(1)" :class="[1 === nowIndex ? 'active': '']" class="price" >价格</div>
            <div @click="changeTab(2)" :class="[2 === nowIndex ? 'active': '']">分类</div>
          </div>
          <div class="sortlist">
            <div class="item" v-for="(item, index) in listData" :key="index">
              <img :src="item.list_pic_url" alt="">
              <p class="name">{{item.name}}</p>
              <p class="price">￥{{item.retail_price}}</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {get, post} from '../../utils'  //引入get，post的封装方法
export default {
  data (){
    return {
      words:'',
      openid:'',
      hotData:[], //热门搜索
      historyData:[],  //历史记录
      tipsData:[],  //输入提示语
      order:'',
      listData:[],  //商品列表
      nowIndex:0   //默认标红
    }
  },
  mounted (){
    //？？this.openid往本地存储（getStorageSync）把openId取出来,小程序其他页面要用也要把openId取出来用
    this.openid = wx.getStorageSync('openId') || ''; 
    this.getHotData() //先看下效果，去页面搜索/search/indexaction
  },
  methods:{
    clearInput(){
      this.words=''
    },
    //取消，即返回上一级
    cancel(){  
      wx.navigateBack({
        delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
      });
    },
    // 清空历史记录；做接口请求
    async clearHistory(){  
      const data = await post('/search/clearhistoryaction',{
        openId: this.openid
      })
      if(data) {
        // 判断数据是否被删除，若被删除则令historyData重置为空数组--》页面上直接除去历史记录内容，不需要再次刷新
        this.historyData = []  
      }
      // console.log(data,123) //测试数据是否删除成功

    },
    //点击搜索框input，再次聚焦（出现刚刚查询的记录）
    inputFocus(){  

    },
    // 在input框中但凡有内容发生变化都会触发tipsearch事件
    // 获取input框中数据，进行实时的接口请求, 异步操作
    async tipsearch(){
      const data = await get('/search/helperaction', {
        // 获取input框中的数据，即双向绑定数据源的this.words
        keyword: this.words  
      })
      this.tipsData = data.keywords
      console.log(data)
    },

    // 搜索方法
    async searchWords(e){ // 因为是要做接口请求的方法，所以直接写成异步方法
      // 是有两种方法是可以拿到input框中的值的：1.this.words,拿到数据源中的值（vue中的语法，双向数据绑定）2.我们用的这个（小程序当中的语法）
      // console.log(e) //看看这个事件参数中会存在什么东西(电脑上直接回车看结果)
      // 考虑到兼容性问题，还是用这个：（小程序语法）
      let value = e.currentTarget.dataset.value
      this.words = value || this.words //有value就用，没有就用vue的双向数据绑定
      // 然后用this.word作为参数（用户输入内容）去做接口请求。
      // 添加历史搜索记录的接口（请求的路径）；请求到的数据要做的操作是？第二个操作传参数(data)
      const data = await post('/search/addhistoryaction',{
        // 把openId和keyword这两个参数传给当前接口addhistoryaction
        openId:this.openid, //用来区分不通用户的搜索记录
        keyword:value || this.words //搜索框搜索的内容
      })
      console.log(data) // 现在还不能在控制台看到data,因为当前的接口还未被定义出来，那么我们去后端。
      // routes/index.js->search/index写完给数据库添加搜索记录的接口之后，去浏览器5757/lm/search/addhistoryaction看看 not found,接口是需要传入参数的，所以我们在放上一个取历史搜索记录的方法。
      // 获取历史搜索记录(应该是实时出现的，也就是存的同时也要拿出来展示)
      this.getHotData()
      this.getlistData()
    },

    // 获取历史搜索记录(应该是实时出现的，也就是存的同时也要拿出来展示)
    async getHotData(first){
      // this.openid从哪里来？所以要在数据源放上一个id
      const data = await get('/search/indexaction?openId=' + this.openid) 
      //openId是之前定义的一个参数的key值，跟数据源无关，openid是我们需要去取到的用户的身份信息
      //取出热门搜索，历史记录
      this.historyData = data.historyData
      this.hotData = data.hotKeywordList
      console.log(data)  
      //然后我们先去后端把indexaction接口定义出来。
    },
    // 获取商品列表，调用接口请求：将商品数据展示获取回来
    async getlistData(){
      const data = await get('/search/helperaction', {
        keyword: this.words,   //关键字，查找相应数据
        order: this.order
      })
      //为数据源放数据
      this.listData = data.keywords
      // 如果商品列表已经出现页面上就不需要展示我们的输入补全, 则清空tipsData设置为空
      this.tipsData = []
      // console.log(data)
    },
    changeTab(index) {
      // 数据源中放上一个初始数据nowIndex:0 
      //默认一进来就是综合,要标红，意味着要给综合加上active类名（样式中是这个）
      this.nowIndex = index
      //对于价格，还需要：
      if( index === 1) { 
      //将数据源中的重新赋值
      //再判断当前数据源中order是否等于'asc', 然后根据结果，两个图片才会来回切换
        this.order = this.order == 'asc'? 'desc' : 'asc' 
      } else {
        //只有价格没被点击的时候，才都不显示
        this.order = '' 
      }
      //每次点击tab,都会去重新做接口请求
      this.getlistData()
    }
  }
}
</script>

<style lang='less' scoped>
@import './style';
</style>