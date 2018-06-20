import Vue from 'vue';
import Vuex from 'vuex';
import superagent from 'superagent';

Vue.use(Vuex);


const state = {
  list : [],
  links: {},
  meta: {},
  country: {}
}

const getters = {
  list: state => state.list,
  links: state => state.links,
  meta: state => state.meta,
  country: state => state.country
}

const actions = {
  getList({commit}, {page, region, sub_region, sort}) {
    const req = {};
    if (page) {req["page[number]"] = page}
    if (region) {req["filter[region]"] = region}
    if (sub_region) {req["filter[sub_region]"] = sub_region}
    if (sort) {req["sort"] = sort}

    superagent.get('https://api.openfintech.io/v1/countries')
      .query(req)
      .end((error, response) => {
        if (error) { return console.log(error) }
        if (response.body) {
          commit('listSuccess', {list: response.body.data});
          commit('linksSuccess', {links: response.body.links});
          commit('metaSuccess', {meta: response.body.meta});
        }
      })
  },
  getCountry({commit}, countryId) {
    // NOTE Currently request return 404 for any ID
    superagent.get('https://openfintech-openfintech-io-v1.p.mashape.com/countries/'+countryId)
      .query({})
      .end((error, response) => {
        if (error) { return console.log(error) }
        if (response.body) {

        }
      })
  }
}

const mutations = {
  listSuccess (state, { list }) {
    state.list = list;
  },
  linksSuccess (state, { links }) {
    state.links = links;
  },
  metaSuccess (state, { meta }) {
    state.meta = meta;
  },
  countrySuccess () {}
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
