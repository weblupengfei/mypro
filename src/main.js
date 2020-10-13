import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from  './assets/http'
axios.defaults.withCredentials=true
Vue.prototype.axios=axios

import qs from 'qs'
Vue.prototype.qs=qs

//切换路由时点同一个路由报错，解决：
const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
