<template>
  <div class="container breadcrumbs scroll-none">
    <ul>
      <li>
        <nuxt-link
          :to="localePath(`/`)"
          class="hover:text-[#52230F] duration-150"
        >
          {{ $t('index_page') }}
        </nuxt-link>
      </li>
      <li v-for="(item, index) in links" :key="index">
        <nuxt-link
          :to="localePath(`/${item.url}`)"
          class="truncate hover:text-[#52230F] duration-150"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.scroll-none {
  overflow: scroll;
  &::-webkit-scrollbar-thumb {
    display: none;
  }
}
</style>
