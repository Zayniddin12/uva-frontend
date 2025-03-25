<template>
  <div v-if="lastNews && lastNews.length" class="container news">
    <SectionTitle
      v-bind="{
        title: $t('last_news'),
        link: $t('all_news'),
        linkUrl:
          '/' + ($i18n.locale === 'uz' ? '' : $i18n.locale + '/') + 'news',
      }"
    />
    <div
      v-if="lastNews && lastNews.length"
      class="news__cards grid grid-cols-4 b:grid-cols-2 f:grid-cols-1 gap-[24px] gap-y-[36px] mt-[24px]"
    >
      <NewsCard
        v-for="item in lastNews"
        :key="item.id"
        class="news__main"
        v-bind="{
          img: item.photo,
          title: item.title,
          subtitle: item.body,
          date: $dayjs(item.posted_date).format('DD.MM.YYYY'),
          time: $dayjs(item.posted_date).format('HH:MM'),
          slug: item.slug,
        }"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NewsCard from '~/components/cards/NewsCard'
import SectionTitle from '~/components/SectionTitle'

export default {
  components: {
    NewsCard,
    SectionTitle,
  },
  computed: {
    ...mapState({
      lastNews: (state) => state.home.lastNews,
    }),
  },
}
</script>
<style>
.news__main .nitem__subtitle iframe {
  display: none !important;
}
</style>
