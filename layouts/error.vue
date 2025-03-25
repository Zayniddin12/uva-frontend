<template>
  <div>
    <Header />
    <div class="not-found">
      <icon-base name="error404" class="not-found__img" />
      <h4 class="not-found__title">{{ $t('not_found_title') }}</h4>
      <p class="not-found__subtitle">{{ $t('not_found_subtitle') }}</p>
      <nuxt-link :to="localePath('/')" class="not-found__btn btn btn--blue">{{
        $t('not_found_btn')
      }}</nuxt-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
import IconBase from '~/components/volontyor/IconBase.vue'

export default {
  layout: 'empty',
  components: {
    Header,
    Footer,
    IconBase,
  },
}
</script>

<style lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  text-align: center;
  &__img {
    margin: 100px auto 0;
    @media (max-width: 768px) {
      margin: 0 auto;
      width: 250px;
    }
    svg {
      width: 100% !important;
    }
  }
  &__title {
    //font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 44px;
    color: #2c2d33;
    margin-top: 40px;
    @media (max-width: 768px) {
      margin-top: 0 !important;
      font-size: 20px;
    }
  }
  &__subtitle {
    //font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #90a1b5;
    margin-top: 12px;
    @media (max-width: 768px) {
      margin-top: 0 !important;
      font-size: 12px;
    }
  }
  &__btn {
    max-width: 420px !important;
    margin: 40px auto;
    @media (max-width: 768px) {
      max-width: 240px !important;
    }
  }
}
</style>
