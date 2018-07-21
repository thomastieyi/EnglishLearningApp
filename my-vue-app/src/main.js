// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import $ from 'jquery'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from "axios";
import helloworld from '@/components/HelloWorld.vue'
import list from '@/components/list'
import card from '@/components/card'
//Vue.use($);
Vue.use(iView);
Vue.use(helloworld);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
Vue.component('list',list);
Vue.component('helloworld',helloworld);
Vue.component('card',card);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
