import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
// 下拉刷新操作  //花括号空格打！
export default { 
    config: {
        enablePullDownRefresh: true
    }
}