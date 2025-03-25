<template>
  <div>
    <bread-crumbs
      v-bind="{
        links: [
          {
            title: this.$t('volunteer_school'),
            url: `school`,
          },
        ],
      }"
    />
    <div class="container">
      <!-- video material -->
      <section-title
        class="title-b-margin"
        v-bind="{
          title: $t('video_materials'),
          link: $t('all_video_materials'),
          linkUrl: localePath('/school/video-materials'),
        }"
      />
      <Preloader :fetch-state="$fetchState" :data="videos">
        <div class="grid-list grid grid-cols-3 d:grid-cols-2 j:grid-cols-1">
          <video-card
            v-for="(item, imageIndex) of videos.slice(0, 6)"
            :key="item.id"
            :data="item"
            @click.native="handleClick(imageIndex, item.slug)"
          />
        </div>

        <!-- material -->
        <section-title
          class="title-b-margin"
          v-bind="{
            title: $t('materials'),
            link: $t('all_materials'),
            linkUrl: localePath('/school/materials'),
          }"
        />
        <div
          class="grid-list grid grid-cols-4 c:grid-cols-3 e:grid-cols-2 j:grid-cols-1"
        >
          <material-card
            v-for="item of materials.slice(0, 6)"
            :key="item.id"
            :data="item"
            @dowloadClicked="handleFetch"
          />
        </div>
      </Preloader>
    </div>
    <transition name="page">
      <VideoModal
        v-if="showModal"
        :data="videos.map((item) => item.video_url)"
        :index-video="index"
        :loading="loading"
        @closeClicked="closeModal()"
      />
    </transition>
  </div>
</template>

<script>
import VideoModal from '@/components/VideoModal.vue'
import MaterialCard from '../../components/cards/MaterialCard.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import VideoCard from '~/components/cards/VideoCard.vue'
import SectionTitle from '~/components/SectionTitle.vue'
import Preloader from '~/components/Preloader.vue'

export default {
  layout: 'pages',
  components: {
    VideoModal,
    Preloader,
    BreadCrumbs,
    SectionTitle,
    VideoCard,
    MaterialCard,
  },
  async fetch() {
    await this.$getAction('/video-materials/').then((response) => {
      this.videos = response.results
    })
    await this.$getAction('/materials/').then((response) => {
      this.materials = response.results
    })
  },
  data() {
    return {
      index: null,
      loading: true, // for ignore loader
      videos: [],
      materials: [],
      showModal: false,
      windowBody: document.body,
    }
  },
  methods: {
    async handleClick(idx, slug) {
      this.index = idx
      this.loading = false
      this.showModal = true
      await this.$postAction(`/video-materials/${slug}/`)
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
    handleFetch() {
      this.$fetch()
    },
    closeModal() {
      this.showModal = false
      this.windowBody.classList.remove('no-scroll')
    },
  },
  head() {
    return {
      title: this.$t('volunteer_school'),
    }
  },
  fetchOnServer: false,
}
</script>
