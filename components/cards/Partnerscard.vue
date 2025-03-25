<template>
  <a :href="data.link || ''" onmousedown="return false" target="_blank">
    <div class="partner-card">
      <div class="partner-card__image">
        <img :src="data.logo" alt="" />
      </div>

      <icon-base name="partner-svg" class="partner-card__bg" />
    </div>
  </a>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
