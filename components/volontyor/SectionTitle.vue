<template>
  <div class="section-title">
    <h4>{{ title }}</h4>
    <nuxt-link v-if="linkUrl && link" class="section-title__link" :to="linkUrl">
      <p>
        {{ link }}
      </p>
      <icon-base class="section-title__icon" name="arrow-right-light" />
    </nuxt-link>
  </div>
</template>

<script>
import IconBase from './IconBase.vue'
export default {
  components: { IconBase },
  props: {
    title: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    linkUrl: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
}
</script>
