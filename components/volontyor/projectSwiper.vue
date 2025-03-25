<template>
  <div class="projects-slider creative-example w-full mt-3 bg-white">
    <swiper
      class="swiper h-[500px] w-ful lg:w-[960px] xl:w-[1200px]"
      :modules="modules"
      :slides-per-view="3"
      :breakpoints="{
        '375': {
          slidesPerView: 1,
        },
        '425': {
          slidesPerView: 1,
        },
        '768': {
          slidesPerView: 1.7,
        },
        '1024': {
          slidesPerView: 2.5,
        },
        '1124': {
          slidesPerView: 3,
        },
      }"
    >
      <swiper-slide
        v-for="(item, index) in card"
        :key="index"
        class="slide"
        @click="open(index)"
      >
        <router-link to="/">
          <div
            class="project-card w-full md:w-[371px] rounded-2xl overflow-hidden bg-white"
          >
            <img :src="item.image" class="h-[371px] w-full" alt="" />
            <div class="px-[20px]">
              <h3 class="text-2xl font-semibold text-[#14183E] pt-4 pb-[26px]">
                {{ item.title }}
              </h3>
            </div>
          </div>
        </router-link>
      </swiper-slide>
    </swiper>
    <light-box v-if="isModal" :items="card" :index="idx" @close-light="close" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Autoplay, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import lightBox from './lightBox.vue'
export default defineComponent({
  name: 'swiper-example-free-mode',
  title: 'Free mode / no fixed positions',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
    lightBox,
  },
  setup() {
    const card = ref([
      {
        image: '/src/assets/images/projects_image_1.png',
        title: 'Флеш-моб «Живи, малыш!»',
      },
      {
        image: '/src/assets/images/projects_image_2.png',
        title: 'Всемирный день вязания на публике',
      },
      {
        image: '/src/assets/images/projects_image_3.png',
        title: '17 апреля - день рождения клуба!',
      },
      {
        image: '/src/assets/images/projects_image_3.png',
        title: '17 апреля - день рождения клуба!',
      },
    ])
    return {
      modules: [FreeMode, Autoplay],
      card,
      isModal: ref(false),
      idx: 0,
    }
  },
  methods: {
    open(idx) {
      this.isModal = true
      this.idx = idx
    },
    close() {
      this.isModal = false
    },
  },
})
</script>
<style lang="scss">
.projects-slider {
  .swiper-wrapper {
    display: flex !important;
    gap: 40px;
  }
  .swiper-slide {
    height: auto !important;
    width: auto !important;
  }
}
</style>
<style lang="scss" scoped>
.project-card {
  border: 1px solid #f0f2f3;
  box-shadow: 0 23px 33px -23px rgba(34, 60, 80, 0.2);
}

.slide {
  margin: 0 !important;
}
</style>
