import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 数据管理，财务部 node -> api -> vuex (四大家族 )->
// 共享状态 超越父子，兄弟关系； 不再由组件私有，所有中央来调配
// lbs 应用， 经纬度共享
export default new Vuex.Store({
  state: {
    latitude: 115.950531,
    longitude: 28.549066, 
    // 不应该放在state，用import导入
    // shops:[]  //实习项目OK，商业项目不可以，为什么？ 不应该放在state
  },
  mutations: {
  },
  actions: {
  },
  // vuex应用将大型化，数据管理：
    // 分库：大仓库分成许多小仓库；细化设计
  modules: {
    shops
  }

})
