<template>
  <div class="volunteer-card">
    <div class="volunteer-card__left">
      <h2 class="volunteer-card__title min-h-[66px]">
        {{ title }}
      </h2>
      <p class="volunteer-card__text">
        {{ text }}
      </p>
      <nuxt-link :to="localePath(href)">
        <button class="volunteer-card__link">
          {{ link }}
        </button>
      </nuxt-link>
    </div>
    <img :src="image" alt="" class="volunteer-card__img" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
}
</script>
