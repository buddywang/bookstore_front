// import "babel-polyfill";
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.css'
import store from './store'
import moment from 'moment'

axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$ajax = axios;

Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
    return moment(input).format(formatString)
});

Vue.use(ElementUI, {
    size: 'small'
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
