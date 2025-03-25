<template>
  <div>
    <BreadCrumbs :links="links" />
    <div class="initiative">
      <div class="initiative__cards"></div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/BreadCrumbs'
export default {
  layout: 'pages',
  components: {
    BreadCrumbs,
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('opportunities'),
          url: `initiative-groups`,
        },
      ]
    },
  },
}
</script>
