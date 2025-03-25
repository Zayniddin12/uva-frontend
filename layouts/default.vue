<template>
  <div>
    <Header />
    <v-app class="main-bg">
      <nuxt />
    </v-app>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
export default {
  components: {
    Header,
    Footer,
  },
  fetch() {
    this.getData()
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

<style>
html {
  font-family: 'Open Sans', Arial, sans-serif;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
