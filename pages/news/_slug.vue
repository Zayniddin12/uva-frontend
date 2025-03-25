<template>
  <div>
    <div v-if="single">
      <bread-crumbs
        v-bind="{
          links: [
            { title: this.$t('news'), url: `news` },
            { title: single.news.title, url: `news/${$route.params.slug}` },
          ],
        }"
      />
      <div class="news-single newss">
        <Preloader :fetch-state="$fetchState" :data="single.news">
          <div
            class="grid grid-cols-12 container b:flex b:flex-col items-start b:items-stretch mb-[32px]"
          >
            <div class="col-span-9 b:col-span-12 grid mb-[32px]">
              <BlockPreloader
                :loading="!single.news.title"
                :width="'800px'"
                :height="'30px'"
              >
                <h3 class="newss__title mb-[11px]">
                  {{ single.news.title }}
                </h3>
              </BlockPreloader>
              <BlockPreloader
                :loading="!single.news.title"
                :width="'100px'"
                :height="'20px'"
              >
                <div class="newss__date flex items-center mb-[11px]">
                  <icon-base name="date-range" />
                  <p class="ml-[6px]">
                    {{ $moment(single.news.posted_date, 'DD.MM.YY, HH:mm') }}
                  </p>
                </div>
              </BlockPreloader>
              <BlockPreloader
                :loading="!single.news.photo"
                :width="'888px'"
                :height="'390px'"
                :preloader-class="'mb-6'"
              >
                <img
                  class="newss__img mb-[24px]"
                  :src="single.news.photo"
                  :alt="single.news.title"
                />
              </BlockPreloader>
              <BlockPreloader
                :loading="!single.news.body"
                :width="'888px'"
                :height="'500px'"
              >
                <div
                  class="newss__desc"
                  v-html="$filterTextTags(single.news.body, 'pre')"
                />
              </BlockPreloader>
            </div>
            <div
              class="col-span-3 b:d-none ml-[24px] c:ml-[0px] c:hidden gap-[10px]"
            >
              <div class="posters">
                <BlockPreloader
                  :loading="!single.news.body"
                  :width="'272px'"
                  :height="'398px'"
                  :preloader-class="'mb-5'"
                >
                  <UvaBanner class="mb-[20px] g:mr-[20px]" />
                </BlockPreloader>
              </div>
            </div>
          </div>
        </Preloader>
        <div v-if="single.other_news.length" class="container">
          <h3 class="newss__title mb-[48px] f:mb-[20px]">
            {{ $t('other_news') }}
          </h3>
          <div
            class="news__cards grid items-center grid-cols-4 b:grid-cols-2 g:grid-cols-1 gap-[24px] gap-y-[36px] pb-[68px]"
          >
            <NewsCard
              v-for="(item, index) in single.other_news"
              :key="index"
              class="news__main"
              v-bind="{
                img: item.photo,
                title: item.title,
                subtitle: item.body,
                date: $moment(item.posted_date, 'DD.MM.YYYY'),
                time: $moment(item.posted_date, 'HH:mm'),
                slug: item.slug,
                orange: true,
              }"
            />
          </div>
        </div>
        <div
          class="advers-responsive grid grid-cols-12 container b:flex b:flex-col items-start b:items-stretch mb-[32px]"
        >
          <div class="col-span-3 ml-[24px] c:ml-[0px] gap-[10px]">
            <div class="posters">
              <UvaBanner class="mb-[20px] g:mr-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockPreloader from '@/components/BlockPreloader.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
import UvaBanner from '~/components/Banners/UvaBanner'
import NewsCard from '~/components/cards/NewsCard'
export default {
  layout: 'pages',
  components: {
    BlockPreloader,
    BreadCrumbs,
    IconBase,
    UvaBanner,
    NewsCard,
  },
  async fetch() {
    await this.$getAction(`/news/${this.$route.params.slug}`).then(
      (response) => {
        this.single = response
      }
    )
  },
  data() {
    return {
      slug: 'slug',
      single: null,
    }
  },
}
</script>

<style lang="scss">
.advers-responsive {
  @media (min-width: 900px) {
    display: none;
  }
}
.news__main .nitem__subtitle iframe {
  display: none !important;
}
</style>
