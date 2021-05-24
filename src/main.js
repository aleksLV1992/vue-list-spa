import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

import App from './App.vue';
import store from './store';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
