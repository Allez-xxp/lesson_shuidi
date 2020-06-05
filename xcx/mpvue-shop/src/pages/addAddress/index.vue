<template>
  <div class="addaddress">
      <!-- 输入姓名 -->
      <div class="item">
          <input type="text" placeholder="姓名" v-model="userName">
      </div>
      <!-- 输入电话 -->
      <div class="item">
          <input type="text" placeholder="手机号码" v-model="telNumber">
      </div>
      <!-- 选择省市县地址，这里要用到一个级联选择组件聚焦的时候弹出来一个选择地址的picker -->
      <div class="item">
          <!-- mode默认值是selector,我们改成级联组建region 要用省市区的就必须设置成这个-->
          <!-- bind 原生小程序是这么绑定方法的 -->
          <!-- value的值是一个数组 -->
          <!-- 可为每一列的顶部添加一个自定义项 -->
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
              <input type="text" placeholder="身份、城市、区县" v-model="address">
          </picker>
      </div>
      <!-- 填写详细地址信息 -->
      <div class="item">
          <input type="text" placeholder="详细地址，如楼道、楼盘号等" v-model="detailaddress">
      </div>
      <!-- 选择是否为默认地址 -->
      <div class="item itemend">
          <!-- 多选框 -->
          <checkbox-group @change="checkboxChange">
              <label class="checkbox">
                  <!-- :checked="checked"默认选中状态 color="#b4282d"选中后的颜色 -->
                  <checkbox class="box" value="true" :checked="checked" color="#b4282d">设置为默认地址</checkbox>
              </label>
          </checkbox-group>
          <div @click="wxaddress">一键导入微信</div>
          
      </div>
      <!-- 底部保存修改的数据 -->
      <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { get,post,getStorageOpenId} from "../../utils";
export default {
    data() {
        return {
            userName: '',
            telNumber: '',
            address: '',
            region: [],
            customItem: '全部',
            detailaddress: '',
            openId: '',
            res: '', //存放从上一个页面接受过来的数据
            id: '', //上一个页面传过来的地址id
            checked: false
        }
    },
    mounted() {
        this.openId = getStorageOpenId()
        // 判断一下从上一个页面调过来的时候是不是带了参数
        // 首先要去获取一下从上一个页面带过来的参数
        // 如果它存在的化那一定是从上一个页面带过来的
        
        if(this.$root.$mp.query.res) {
            // 传过来之前JSON.stringfy了，现在转回来parse,然后编码也转回来（之前是encode),decode
            this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
            // console.log(this.res) //点击一键导入测试一下
            // 如果是一键导入过来的，是可以直接放到页面上面展示的（放到addaddress的input框中）
            this.userName = this.res.userName
            this.telNumber = this.res.telNumber
            this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
            this.detailaddress = this.res.detailInfo  //详细地址
        }
        // 从编辑按钮点过来的传的是id
        if(this.$root.$mp.query.id) {
            this.id = this.$root.$mp.query.id //根据这个地址的id，把当前的地址的完整地址请求回来放到页面上展示
            // 这里也可以像前面一样再上一个页面跳转过来的时候带过来，因为上一个页面已经请求了，
            // 这里直接执行一个接口请求
            this.getDetail() //获取地址信息
        }
    },
    methods: {
        // 目前只是样式上看着是打了勾，但是js上要手动实现，拿到值
        checkboxChange(e) {
            // checkbox上的默认参数本来是应该有这个值的，现在没有，有点问题，checkbox绑定的事件不能是click事件，要是change事件
            // console.log(e)
            // 勾选了mp.detail.value[0]就是true,没勾选就没有值
            // 改一下数据源中的值
            this.checked = e.mp.detail.value[0]
        },
        wxaddress() {
            // 调用小程序的api
            wx.chooseAddress({
                success: (result) => {
                    console.log(result);
                    this.userName = result.userName
                    this.telNumber = result.telNumber
                    this.address = `${result.provinceName} ${result.cityName} ${result.countyName} `
                    this.detailaddress = result.detailInfo
                }
            })
        },
        // picker，取选中的值也是通过一个事件参数取的
        bindRegionChange(e) {
            // console.log(e);
            let value = e.mp.detail.value
            this.address = `${value[0]} ${value[1]} ${value[2]}`
            // 我们在组件中绑定了v-model="address" 先在页面上也能显示出来
        },
        //保存  
        async saveAddress() {
            // 把页面上新增的字段传给后端
            const data = await post('/address/saveAction',{
                userName: this.userName,
                telNumber: this.telNumber,
                address: this.address,
                detailaddress: this.detailaddress,
                checked: this.checked, //是否是默认地址
                openId: this.openId, //每一条被保存到数据库中的数据都有一个id,是保存数据到数据库的时候手动添加进去的id，是地址的id
                // 点击新增，我们这个页面是没有id的，点击编辑，进来这个页面是有id的
                // 还是需要传一个id
                addressId: this.id
            })
            // console.log(data);
            // 插入或者修改成功，我们自己返回了一个data:true
            if(data) {
                // 弹出一个提示
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,
                    mask: true, //遮罩层
                    success: (result) => {
                        // 成功就返回上一个页面
                        // 有一个问题 遮罩层是两秒了，但是toast提示 没有
                        setTimeout(()=> {
                            wx.navigateBack({
                                delta: 1
                            })
                        },2000)
                        //因为不能控制回调函数也能在2秒后再执行，需要手动控制一下
                    }
                })
            }
        },
        // 通过获取id得到对应用户的收货地址信息
        async getDetail() {
            // 用地址id去做接口请求
            const data = await get('/address/detailAction', {
                id: this.id
            })
            // console.log(data);
            let detail = data.data
            this.userName = detail.name
            this.address = detail.address
            this.telNumber = detail.mobile
            this.detailaddress = detail.address_detail
            // 当本来就是默认地址的时候，跳到这个页面来的时候多选框应该打上勾
            this.checked = detail.is_default === 1 ? true: false
        },
        
        // 在返回新建地址的时候，这是addaddres的输入框应该要是为空的，（此时是没有消失的，因为页面没有刷新，所以缓存下来了上一个的地址）
    }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>