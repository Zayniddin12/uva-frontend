<template>
  <div
    class="container about-index-section grid grid-cols-3 b:grid-cols-2 e:grid-cols-1 gap-[24px] mb-[-140px]"
  >
    <div v-for="arg in about" :key="arg.id" class="about-card z-10">
      <h3 class="line-clamp-1 text-2xl sm:text-x e:text-xl">
        <span class="blue-circle" />{{ arg.title }}
      </h3>
      <p class="line-clamp-3 min-h-[57px]">{{ arg.content }}</p>
      <nuxt-link
        :to="
          localePath(
            arg.link === '/possibilities/initiative-groups' && !$auth.user
              ? arg.link2
              : arg.link
          )
        "
        class="outline-button"
      >
        <span class="mr-[4px] !text-blue-600">{{ arg.btnText }}</span>
        <icon-base name="arrow-right" />
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
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      about: [
        {
          id: 1,
          title: this.$t('our_goal'),
          content: this.$t('our_goal_text'),
          btnText: this.$t('about_us'),
          link: '/about',
        },
        {
          id: 2,
          title: this.$t('join_us'),
          content: this.$t('join_us_text'),
          btnText: this.$t('join'),
          link: '/possibilities/initiative-groups',
          link2: '/auth/',
        },
        {
          id: 3,
          title: this.$t('projectss'),
          content: this.$t('projectss_text'),
          btnText: this.$t('our_projects'),
          link: '/possibilities',
        },
      ],
    }
  },
}
</script>
