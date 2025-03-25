<template>
  <div class="post px-[24px] pb-[24px] pt-[12px]">
    <icon-base name="logo" class="post__logo mx-auto" />
    <div class="post__content">
      <p class="pb-[24px]">
        {{ $t('want_popular_volunteer') }}
      </p>
      <nuxt-link :to="localePath('/volunteer')">
        {{ $t('join') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
  },
}
</script>
