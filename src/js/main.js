import Vue from 'vue';

import router from './router'
import store from './store'

import main from './components/app.vue'

const app = new Vue ({
  router,
  store,
  render: h => h(main)
}).$mount('#app');
