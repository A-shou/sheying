// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../static/animate.css'

Vue.use(axios)


axios.defaults.baseURL = 'http://148.70.186.100:8227/api/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  Vue.prototype.$http = axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
