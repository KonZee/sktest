import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import List from '../components/countries.vue';
import Country from '../components/country.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: List
  },
  {
    // Why not country?
    path: '/countries/:id',
    name: 'country',
    component: Country
  }
];

export default new VueRouter({
    routes
});
