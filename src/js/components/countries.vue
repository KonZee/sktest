<template lang="pug">
  div
    common-header
    .grid-container
      .grid-x
          .cell
            h1 Countries

          .cell.small-5
            select(v-model="region")
              option(value='') All Regions
              template(v-for="item in regions")
                option(:value="item.name") {{item.name}}
          .cell.small-5.small-offset-1
            select(v-model="subregion")
              option(value='') All Subregions
              template(v-for="item in subregions")
                option(:value="item") {{item}}



          .cell
            table
              thead
                tr
                  th
                    a(href="" @click.prevent="setSort('name')") Name
                  th Capital
                  th
                    a(href="" @click.prevent="setSort('region')") Region
                  th
                    a(href="" @click.prevent="setSort('sub_region')") Subregion
                  th
                    a(href="" @click.prevent="setSort('population')") Population
                  th Top Level Domains
                  th
              tbody
                tr(v-for="country in list")
                  td {{country.attributes.name}}
                  td {{country.attributes.capital}}
                  td {{country.attributes.region}}
                  td {{country.attributes.sub_region}}
                  td {{country.attributes.population}}
                  td {{[country.attributes.top_level_domains].join(", ")}}
                  td
                    router-link(:to="{name: 'country', params: {id: country.id}}" tag="a" class="button aestetic-no-margin") Подробнее
            // Empty state
            div(v-if="list.length === 0")
              h3 Пока еще нет данных для показа, дождитесь, пожалуйтста, загрузки
          .cell
            nav
              ul.pagination
                li(v-if="page > 1")
                  a(href="" @click.prevent="toPage(1)") 1
                li.ellipsis(v-if="page > 3")
                li(v-if="page > 2")
                  a(href="" @click.prevent="toPage(page - 1)") {{page - 1}}
                li.disabled You are on page {{page}}
                li(v-if="page < meta.pages - 1")
                  a(href="" @click.prevent="toPage(page + 1)") {{page + 1}}
                li.ellipsis(v-if="page < meta.pages - 2")
                li(v-if="page !== meta.pages")
                  a(href="" @click.prevent="toPage(meta.pages)") {{meta.pages}}
    common-footer
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { reduce, debounce } from 'lodash';

import commonHeader from './header.vue'
import commonFooter from './footer.vue'

export default {
  data () {
    return {
      regions: [
        {
          name: "africa",
          sub_regions: ["northern_africa", "southern_africa", "western_africa", "eastern_africa", "middle_africa"]
        },
        {
          name: "americas",
          sub_regions: ["northern_america", "south_america", "central_america", "caribbean"]
        },
        {
          name: "asia",
          sub_regions: ["southern_asia", "western_asia", "eastern_asia", "south_eastern_asia", "central_asia"]
        },
        {
          name: "europe",
          sub_regions: ["northern_europe", "southern_europe", "western_europe", "eastern_europe"]
        },
        {
          name: "oceania",
          sub_regions: ["polynesia", "australia_and_new_zealand", "micronesia", "melanesia"]
        },
        {
          name: "polar",
          sub_regions: []
        },
      ],
      subregions: [],
      firstLoad: true,
      page: 1,
      region: '',
      subregion: '',
      sort: 'name',
      order_asc: true,
    }
  },
  watch: {
    region () {
      this.changeSubregions();
      if (!this.firstLoad) {this.page = 1}
      this.getCountries();
    },
    subregion () {
      if (!this.firstLoad) {this.page = 1}
      this.getCountries();
    }
  },
  mounted () {
    if (!!window.localStorage) {
      let result = window.localStorage.getItem('dataSettings');
      if (result) {
        result = JSON.parse(result);
        this.page = result.page;
        this.region = result.region;
        this.subregion = result.subregion;
        this.sort = result.sort;
        this.order_asc = result.order_asc;
      }
    }
    this.getCountries();
  },
  methods: {
    ...mapActions(['getList']),
    changeSubregions () {
      if (this.region !== '') {
        this.subregions = reduce(this.regions, (result, value) => {
          if (this.region === value.name) {
            return value.sub_regions;
          } else {
            return result
          }
        }, [])
      } else {
        this.subregions = [];
      }
      this.subregion = '';
    },
    toPage (page) {
      this.page = page;
      this.getCountries();
    },
    setSort (type) {
      if (!this.sort || this.sort.length === 0) {
        this.sort = type;
        this.order_asc = true;
      } else {
        if (this.sort === type) {
          this.order_asc = !this.order_asc
        } else {
          this.sort = type;
          this.order_asc = true;
        }
      }
      this.getCountries();
    },
    getCountries: debounce(function () {
      this.putDataInStorage();
      let sort = this.order_asc ? '' : '-';
      sort += this.sort;
      this.getList({page: this.page, region: this.region, sub_region: this.subregion, sort: sort})
      this.firstLoad = false;
    }, 150),
    putDataInStorage () {
      if (!!window.localStorage) {
        const data = {
          page: this.page,
          region: this.region,
          subregion: this.subregion,
          sort: this.sort,
          order_asc: this.order_asc,
        }
        window.localStorage.setItem('dataSettings', JSON.stringify(data));
      }
    },
  },
  computed: {
    ...mapGetters(['list', 'links', 'meta']),
  },
  components: {
    'common-header': commonHeader,
    'common-footer': commonFooter
  }
}
</script>
