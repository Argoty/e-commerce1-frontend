import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import Snackbar from './components/Snackbar.vue';

axios.defaults.baseURL = "http://localhost:8000/"


Vue.config.productionTip = false
Vue.component('Snackbar', Snackbar);

new Vue({
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
