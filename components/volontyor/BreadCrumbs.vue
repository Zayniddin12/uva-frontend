<template>
  <div class="container breadcrumbs scroll-none">
    <ul>
      <li>
        <nuxt-link :to="localePath(`/`)">
          {{ $t('index_page') }}
        </nuxt-link>
      </li>
      <li
        v-for="(item, index) in links"
        :key="index"
        class="last:pointer-events-none"
      >
        <nuxt-link :to="localePath(`/${item.url}`)" class="whitespace-nowrap">
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
      default: () => [],
    },
  },
}
</script>

<style lang="scss">
.scroll-none {
  overflow: scroll;
  &::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: transparent;
  }
}
</style>
