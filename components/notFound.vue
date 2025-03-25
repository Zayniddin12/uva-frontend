<template>
  <div>
    <div class="no-data">
      <icon-base name="notFound" class="no-data__img" />
      <h4 class="no-data__title">{{ $t(title) }}</h4>
      <p class="no-data__subtitle">{{ $t(subtitle) }}</p>
    </div>
  </div>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'

export default {
  components: {
    IconBase,
  },
  props: {
    title: { type: String, default: () => 'no_data_title', required: false },
    subtitle: {
      type: String,
      default: () => 'no_data_subtitle',
      required: false,
    },
  },
  layout: 'empty',
}
</script>

<style lang="scss">
.no-data {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 35px;
  &__img {
    margin: 0 auto;
    @media (max-width: 768px) {
      margin: 0 auto;
      width: 250px;
    }
    svg {
      width: 100% !important;
    }
  }
  &__title {
    font-family: Open Sans, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 44px;
    color: #2c2d33;
    margin-top: 30px;
    @media (max-width: 768px) {
      margin-top: 0 !important;
      font-size: 20px;
    }
  }
  &__subtitle {
    font-family: Open Sans, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #90a1b5;
    margin-top: 5px;
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
._mini {
  min-height: 250px;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  .no-data {
    &__img {
      width: 50% !important;
      margin: 0 auto;
      svg {
        height: unset !important;
      }
    }
    &__title {
      font-size: 16px;
      line-height: 18px;
      margin-top: 20px;
      @media (max-width: 768px) {
        margin-top: 10px !important;
        font-size: 14px;
        line-height: 16px;
      }
    }
    &__subtitle {
      font-size: 12px;
      line-height: 14px;
      @media (max-width: 768px) {
        margin-top: 10px !important;
      }
    }
  }
}
</style>
