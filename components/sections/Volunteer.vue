<template>
  <section class="volunteer">
    <div class="container">
      <question-card
        v-for="(item, index) in volunteer"
        :key="index"
        :title="item.title"
        :text="item.text"
        :link="item.link"
        :href="
          item.href == 'possibilities' && !$auth.user ? item.href2 : item.href
        "
        :image="item.image"
      />
    </div>
  </section>
</template>

<script>
import QuestionCard from '../cards/QuestionCard.vue'

export default {
  components: { QuestionCard },

  data() {
    return {
      volunteer: [
        {
          title: this.$t('wanna_be_volunteer'),
          text: this.$t('volunteer_text1'),
          link: this.$t('need_help'),
          // href: 'auth',
          href: 'possibilities',
          href2: '/auth/',
          image: require('@/static/img/volunteer1.png'),
        },
        {
          title: this.$t('need_volunteer'),
          text: this.$t('volunteer_text2'),
          link: this.$t('find_volunteer'),
          href: 'volunteer',
          image: require('@/static/img/volunteer2.png'),
        },
      ],
    }
  },
}
</script>
