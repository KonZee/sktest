<template lang="pug">
  div
    common-header
    .grid-container
      .grid-x
          .cell
            h1 Country
            p Sorry, but country data currently unaviable
          .cell
            router-link(:to="{name: 'index'}" tag="a" class="button aestetic-no-margin") Вернуться к списку
    common-footer
</template>

<script>
import commonHeader from './header.vue'
import commonFooter from './footer.vue'

export default {
  components: {
    'common-header': commonHeader,
    'common-footer': commonFooter
  }
}
</script>
