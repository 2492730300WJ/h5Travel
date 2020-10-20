import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false

App.mpType = 'app'
// Vue.prototype.$Url = 'http://localhost:9999/api';
Vue.prototype.$Url = 'http://47.102.121.70:9999/api';

const app = new Vue({
	...App
})
app.$mount()
