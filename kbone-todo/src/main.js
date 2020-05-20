import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router)
if (process.env.isMiniprogram) {
  wx.cloud.init({
    // env 参数说明：
    //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //   如不填则使用默认环境（第一个创建的环境）
    env: 'cqj-04kwq',
    traceUser: true,
  })
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
