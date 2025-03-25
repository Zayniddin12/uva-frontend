<template>
  <div>
    <pages-header />
    <v-app class="main-bg">
      <div class="offset" />
      <nuxt />
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/layout/Footer.vue'
import PagesHeader from '~/components/layout/PagesHeader.vue'
export default {
  components: { PagesHeader, Footer },
  async fetch() {
    await this.getData()
  },
  watch: {
    '$i18n.locale'() {
      this.getData()
    },
  },
  methods: {
    async getData() {
      await this.$getAction('/common_part/').then((response) => {
        this.$store.commit('setHeader', response.header)
        this.$store.commit('setFooter', response.footer)
      })
    },
  },
}
</script>

<style lang="scss">
html {
  font-family: 'Open Sans', Arial, sans-serif;
  box-sizing: border-box;
}
.offset {
  margin-top: 147.4px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
