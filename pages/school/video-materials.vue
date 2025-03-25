<template>
  <div>
    <bread-crumbs
      v-bind="{
        links: [
          {
            title: this.$t('volunteer_school'),
            url: `school`,
          },
          {
            title: this.$t('video_materials'),
            url: `school/video-materials`,
          },
        ],
      }"
    />
    <div class="container">
      <section-title
        class="title-b-margin"
        v-bind="{
          title: $t('video_materials'),
        }"
      />
      <Preloader
        :fetch-state="$fetchState"
        :loading="videos.result"
        :data="videos.results"
        :force-loading="paginationLoading"
      >
        <div
          v-if="videos.results && videos.results.length"
          class="grid-list-p grid grid-cols-3 d:grid-cols-2 j:grid-cols-1"
        >
          <video-card
            v-for="(item, imageIndex) of videos.results"
            :key="item.id"
            :data="item"
            @click.native="handleClick(imageIndex, item.slug)"
          />
        </div>
        <div class="pagination">
          <v-pagination
            v-if="videos.total_pages > 1"
            v-model="page"
            class="mb-[64px]"
            :length="videos.total_pages"
            @input="clickBtn"
          ></v-pagination>
        </div>
        <!--        <CoolLightBox-->
        <!--          v-if="videos.results && videos.results.length"-->
        <!--          :items="videos.results.map((item) => item.video_url)"-->
        <!--          :index="index"-->
        <!--          @close="index = null"-->
        <!--        >-->
        <!--        </CoolLightBox>-->
        <transition name="page">
          <VideoModal
            v-if="showModal"
            :data="videos.results.map((item) => item.video_url)"
            :index-video="index"
            :loading="loading"
            @closeClicked="closeModal()"
          />
        </transition>
      </Preloader>
    </div>
  </div>
</template>
<script>
import VideoModal from '@/components/VideoModal.vue'
import BreadCrumbs from '../../components/volontyor/BreadCrumbs.vue'
import VideoCard from '../../components/cards/VideoCard.vue'
import SectionTitle from '../../components/volontyor/SectionTitle.vue'
export default {
  layout: 'pages',
  components: { BreadCrumbs, SectionTitle, VideoCard, VideoModal },
  async fetch() {
    const response = await this.$getAction('/video-materials/', {
      params: { page: this.page },
    })
    this.videos = response
  },
  data() {
    return {
      page: 1,
      loading: true, // for ignore loader // What?
      index: null,
      videos: [],
      showModal: false,
      windowBody: document.body,
      paginationLoading: false,
    }
  },
  watch: {
    async page(item) {
      this.paginationLoading = true
      const response = await this.$getAction('/video-materials/', {
        params: { page: item },
      })
      this.paginationLoading = false
      this.videos = response
    },
  },
  methods: {
    clickBtn() {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$emit('clickBtn')
    },
    handleClick(idx, slug) {
      this.index = idx
      this.loading = false
      this.showModal = true
      this.$postAction(`/video-materials/${slug}/`)
        .then(() => {
          this.$fetch()
        })
        .catch(() => {})
        .finally(() => {
          this.loading = true
        })
      if (this.showModal) {
        this.windowBody.classList.add('no-scroll')
      }
    },
    closeModal() {
      this.showModal = false
      this.windowBody.classList.remove('no-scroll')
    },
  },
}
</script>
