<template>
  <client-only>
    <div class="side-nav">
      <ul>
        <li class="side-nav__item side-nav__title">
          {{ $t('opportunities') }}
        </li>
        <li
          v-for="(item, index) in sideBar"
          :key="index"
          class="side-nav__item"
        >
          <nuxt-link :to="localePath(`/possibilities/${item.link}`)">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      sideBar: [
        {
          title: this.$t('initiative_groups'),
          link: 'initiative-groups',
        },
        {
          title: this.$t('inter_organ'),
          link: 'organization',
        },
        {
          title: this.$t('events'),
          link: '',
        },
      ],
    }
  },
}
</script>
