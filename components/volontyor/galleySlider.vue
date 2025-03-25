<template>
  <swiper
    class="swiper w-[305px] md:w-[680px] lg:w-[930px] xl:w-[1140px]"
    :modules="modules"
    :slides-per-view="4"
    :autoplay="{
      delay: 4,
      disableOnInteraction: false,
    }"
    :speed="8000"
    :mousewheel-control="true"
    :keyboard-control="true"
    :loop="true"
    :free-mode="true"
    :breakpoints="{
      '375': {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      '640': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 2.3,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }"
  >
    <transition name="fade">
      <div v-if="isModal" class="z-[2]">
        <lightBox :items="items" :index="idx" @close-light="close" />
      </div>
    </transition>
    <swiper-slide
      v-for="(item, index) in items"
      :key="index"
      class="slide cursor-pointer"
      @click="open(index)"
    >
      <img :src="item.image" class="rounded-2xl h-[150px] w-[276px]" alt="" />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Pagination, FreeMode, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import lightBox from './lightBox.vue'
export default defineComponent({
  name: 'swiper-example-free-mode',
  title: 'Free mode / no fixed positions',
  // url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
    lightBox,
  },
  setup() {
    return {
      modules: [Pagination, FreeMode, Autoplay],
      isModal: ref(false),
      idx: 0,
    }
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    open(index) {
      this.isModal = true
      this.idx = index
    },
    close() {
      this.isModal = false
    },
  },

  watch: {
    isModal(newValue) {
      if (newValue) {
        document.querySelector('body').style.paddingRight = '16px'
        document.querySelector('body').style.overflow = 'hidden'
      } else {
        document.querySelector('body').style.paddingRight = '0'
        document.querySelector('body').style.overflowY = 'scroll'
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.fade-enter-active {
  animation: fade 0.2s ease-out;
}
.fade-leave-active {
  animation: fade 0.2s ease-in reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.swiper {
  margin: 20px 0 !important;
  position: relative;
  .slide {
    border-radius: 16px;
  }
  .swiper-button-next::after {
    display: none;
  }
}

.swiper-wrapper {
  z-index: 0 !important;
}
</style>
