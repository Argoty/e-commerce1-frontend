import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store'
import 'font-awesome/css/font-awesome.css'
import { formatNumberWithCommas } from './helpers';

Vue.prototype.formatNumberWithCommas = formatNumberWithCommas;

axios.defaults.baseURL = "https://ec1-vuexpress.vercel.app/"

Vue.config.productionTip = false

new Vue({
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
