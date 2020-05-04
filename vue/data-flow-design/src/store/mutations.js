// 写项目先写mutation和state,action后面写
// 围绕状态，设计改变;要有一定设计模式 mutation
// 两种状态：1.围绕user；2.围绕cartList或products
// 根据state，获取修改； 如login由false变为true

// vuex的语法
import {
    RECORD_USERINFO,
    ADD_CART,
    INCREMENT_QUANTITY,
    CHECKOUT
} from './mutation-types'

export default {
    // 关于user的：
    // 注册用户信息的函数（es6）
    //login接口返回{avatar:'',username:''}
    [RECORD_USERINFO](state, info) {  //mutation中vuex会提供state
        state.userIfo = info;  //页面头像
        state.login = true  //是否登录了
    },
    // 如何设计cartList？
    [ADD_CART] (state, {productId}) {
        
    },
    [INCREMENT_QUANTITY](state) {

    },
    [CHECKOUT]() {

    }
}