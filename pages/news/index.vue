<template>
  <div>
    <bread-crumbs
      v-bind="{ links: [{ title: this.$t('news'), url: `news` }] }"
    />
    <div class="container news-page newsp news">
      <h3 class="newsp__title">{{ $t('news') }}</h3>
      <Preloader :fetch-state="state" :data="newsList.results">
        <div
          v-if="newsList.results && newsList.results.length"
          class="news__cards grid items-center grid-cols-4 b:grid-cols-2 g:grid-cols-1 gap-[24px] gap-y-[36px] pt-[24px] pb-[40px]"
        >
          <NewsCard
            v-for="(item, index) in newsList.results"
            :key="index"
            v-bind="{
              img: item.photo,
              title: item.title,
              subtitle: item.body,
              date: $dayjs(item.posted_date).format('DD.MM.YYYY'),
              time: $dayjs(item.posted_date).format('HH:mm'),
              slug: item.slug,
              orange: true,
            }"
          />
        </div>
        <v-pagination
          v-if="newsList.total_pages > 1"
          v-model="page"
          class="mb-[64px]"
          :length="newsList.total_pages"
          @input="clickBtn"
        ></v-pagination>
      </Preloader>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '../../components/volontyor/BreadCrumbs.vue'
import NewsCard from '~/components/cards/NewsCard'

export default {
  layout: 'pages',
  components: {
    BreadCrumbs,
    NewsCard,
  },
  async fetch() {
    await this.fetchNews()
  },
  data() {
    return {
      page: 1,
      newsList: [],
      state: {
        pending: true,
        error: false,
      },
    }
  },
  watch: {
    page() {
      this.fetchNews(this.page)
    },
  },
  methods: {
    clickBtn() {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$emit('clickBtn')
    },
    async fetchNews(page) {
      if (page > 1) {
        this.state.pending = true
      }
      await this.$getAction('/news/', {
        params: { page },
      })
        .then((response) => {
          this.newsList = response
          this.state.error = false
        })
        .catch(() => {
          this.state.error = true
        })
        .finally(() => {
          this.state.pending = false
        })
    },
  },
  head() {
    return {
      title: this.$t('news'),
    }
  },
}
</script>
