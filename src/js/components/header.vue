<template lang="pug">
  .grid-container
    .grid-x
      .cell
        router-link(:to="{name: 'index'}" tag="a")
          h3 Logo
        h6 Common header
</template>

<script>
export default {
}
</script>
