import Vue from 'vue'
import App from './App.vue'
import allezui from '../packages'

Vue.use(allezui)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
