// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import ElementUI from 'element-ui'
import 'lib-flexible'
import '@/utils/directives'
import '@/utils/editImg'
import 'jquery'
// import {format} from './utils/timeUtil'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
// import "html2canvas"
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(api)
Vue.use(ElementUI)
// Vue.prototype.format = format

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
