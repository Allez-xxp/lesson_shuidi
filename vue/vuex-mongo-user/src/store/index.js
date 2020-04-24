import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index.js'

Vue.use(Vuex)
// store 单一状态树（返回一个对象）
export default new Vuex.Store({
  state: {
    users: [
        {
         "address": {
           "city": "Los Angeles",
            "state": 'California',
            "pincode": "123"
          },
          "tags": [
            "music",
            "blogs",
            "cricket"
          ],
          "name": "Tom Benzamin"
        },
        {
          "address": {
            "city": "赣州",
            "state": '江西',
            "pincode": "331000"
          },
          "tags": [
            "coding",
            "blogs"
          ],
          "name": "王志浩"
        },
        {
          "address": {
            "city": "九江",
            "state": '江西',
            "pincode": "331000"
          },
          "tags": [
            "coding",
            "swim"
          ],
          "name": "刘子民"
        },
        {
          "address": {
             "city": "赣州",
            "state": '江西',
            "pincode": "331000"
          },
          "tags": [
            "coding",
            "games"
          ],
          "name": "衷从海"
        }
        
    ]
  },
  mutations: {
    setUsers(state, payload) {  //vuex中对数据的写操作处理的唯一地方
      state.users = payload
    }
  },
  actions: {  //写入状态的第一步; 不能直接修改状态，可以去提交一个mutation, 这里只是一个动作可以请求api,但不能直接修改状态
    // 负责跟api通信
    fetchUsers(context) { //方法，传的也只是context上下文环境参数
      api
        .fetchUsers((users)=> {
          // console.log(users);
          // 拿到数据之后，写入state（要求严格）；修改数据，提交申请（按流程）
          context.commit('setUsers', users)   // setUsers由mutations定义
        })
    },
   
  },
  getters: { // 相当于state的computed函数；不需要计算
    //提供计算的函数，返回值是getters向页面组件提供的数据
    getUsers(state) {  //vuex的api会给getters一个state，读操作
      // return state.users
      // 做一个变形
      return state.users.map((user, index) => {
        user.id = user.address.pincode + index //邮箱地址+邮政编码+index
        return user //map之后要return一个新user
      })
    }
    },
  modules: {
  }
})
