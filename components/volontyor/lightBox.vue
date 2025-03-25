<template>
  <div
    class="bgOpacity w-full h-screen fixed top-0 right-0 z-[999] flex justify-center items-center"
  >
    <div class="">
      <div class="w-[300px] md:w-[500px] lg:w-[800px] xl:w-[930px] relative">
        <button
          class="absolute top-[-40px] right-[-40px] md:right-[-50px] z-[9999]"
          @click="close"
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36 12L12 36"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 12L36 36"
              stroke="white"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <transition name="scale">
          <swiper
            id="swiperBox"
            class="swiper"
            :modules="modules"
            :space-between="30"
            :slides-per-view="1"
          >
            <swiper-slide
              v-for="(item, index) in items"
              :key="index"
              class="slide"
            >
              <img
                :src="item.image"
                class="w-full h-[220px] lg:h-[482px] rounded-lg"
                alt=""
              />
              <h4 class="mt-7 font-bold text-base text-white mb-1">
                {{ item.title }}
              </h4>
              <p class="text-base leading-5 text-white">{{ item.text }}</p>
            </swiper-slide>
          </swiper>
        </transition>
        <button
          class="w-9 lg:w-14 h-9 lg:h-14 prevSlide absolute top-[42%] left-[-70px] z-[9999] rounded-full"
          @click="prev()"
        >
          <svg
            class="w-9 lg:w-14 h-9 lg:h-14"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              rx="28"
              transform="matrix(-1 0 0 1 56 0)"
              fill="white"
              fill-opacity="0.4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35.0571 42.1216C34.2844 42.8944 33.0314 42.8944 32.2586 42.1216L33.4839 40.8963C32.2586 42.1216 32.2587 42.1217 32.2586 42.1216L32.1287 41.9913L31.7665 41.6267C31.455 41.3124 31.0106 40.8624 30.4774 40.3182C29.4119 39.2305 27.9886 37.7627 26.563 36.248C25.1421 34.7383 23.699 33.1609 22.6033 31.8597C22.059 31.2134 21.5721 30.6019 21.2115 30.0836C21.0332 29.8273 20.8576 29.5537 20.7186 29.2845C20.6235 29.1001 20.3713 28.6038 20.3713 28.0011C20.3713 27.3984 20.6235 26.9021 20.7186 26.7177C20.8576 26.4485 21.0332 26.1749 21.2115 25.9186C21.5721 25.4003 22.059 24.7888 22.6033 24.1424C23.699 22.8413 25.1421 21.2638 26.563 19.7542C27.9886 18.2395 29.4119 16.7717 30.4774 15.684C31.0106 15.1398 31.455 14.6897 31.7665 14.3755L32.1287 14.0108L32.2562 13.883L32.2584 13.8808C32.2585 13.8807 32.2586 13.8806 33.6579 15.2798L35.0571 16.6792L34.9331 16.8035L34.5775 17.1615C34.2706 17.4711 33.8316 17.9156 33.3047 18.4535C32.2499 19.5302 30.8463 20.9777 29.445 22.4667C28.0389 23.9606 26.6551 25.4751 25.6306 26.6917C25.193 27.2114 24.8412 27.6529 24.5872 28.0011C24.8412 28.3493 25.193 28.7907 25.6306 29.3104C26.6551 30.527 28.0389 32.0415 29.445 33.5355C30.8463 35.0244 32.2499 36.4719 33.3047 37.5486C33.8316 38.0866 34.2706 38.531 34.5775 38.8406L34.9331 39.1986L35.0554 39.3213C35.8282 40.0941 35.8299 41.3488 35.0571 42.1216ZM24.2356 27.4693C24.2152 27.4184 24.208 27.4158 24.2356 27.4693C24.2359 27.47 24.2352 27.4686 24.2356 27.4693ZM35.0571 13.8806C35.8299 14.6534 35.8299 15.9064 35.0571 16.6792L33.6579 15.2798L32.2584 13.8808C33.0312 13.108 34.2844 13.1078 35.0571 13.8806Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          class="w-9 lg:w-14 h-9 lg:h-14 nextSlide absolute top-[42%] right-[-70px] z-[9999] rounded-full"
          @click="next()"
        >
          <svg
            class="w-9 lg:w-14 h-9 lg:h-14"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="56"
              height="56"
              rx="28"
              fill="white"
              fill-opacity="0.4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20.9429 42.1216C21.7156 42.8944 22.9686 42.8944 23.7414 42.1216L22.5161 40.8963C23.7414 42.1216 23.7413 42.1217 23.7414 42.1216L23.8713 41.9913L24.2335 41.6267C24.545 41.3124 24.9894 40.8624 25.5226 40.3182C26.5881 39.2305 28.0114 37.7627 29.437 36.248C30.8579 34.7383 32.301 33.1609 33.3967 31.8597C33.941 31.2134 34.4279 30.6019 34.7885 30.0836C34.9668 29.8273 35.1424 29.5537 35.2814 29.2845C35.3765 29.1001 35.6287 28.6038 35.6287 28.0011C35.6287 27.3984 35.3765 26.9021 35.2814 26.7177C35.1424 26.4485 34.9668 26.1749 34.7885 25.9186C34.4279 25.4003 33.941 24.7888 33.3967 24.1424C32.301 22.8413 30.8579 21.2638 29.437 19.7542C28.0114 18.2395 26.5881 16.7717 25.5226 15.684C24.9894 15.1398 24.545 14.6897 24.2335 14.3755L23.8713 14.0108L23.7438 13.883L23.7416 13.8808C23.7415 13.8807 23.7414 13.8806 22.3421 15.2798L20.9429 16.6792L21.0669 16.8035L21.4225 17.1615C21.7294 17.4711 22.1684 17.9156 22.6953 18.4535C23.7501 19.5302 25.1537 20.9777 26.555 22.4667C27.9611 23.9606 29.3449 25.4751 30.3694 26.6917C30.807 27.2114 31.1588 27.6529 31.4128 28.0011C31.1588 28.3493 30.807 28.7907 30.3694 29.3104C29.3449 30.527 27.9611 32.0415 26.555 33.5355C25.1537 35.0244 23.7501 36.4719 22.6953 37.5486C22.1684 38.0866 21.7294 38.531 21.4225 38.8406L21.0669 39.1986L20.9446 39.3213C20.1718 40.0941 20.1701 41.3488 20.9429 42.1216ZM31.7644 27.4693C31.7848 27.4184 31.792 27.4158 31.7644 27.4693C31.7641 27.47 31.7648 27.4686 31.7644 27.4693ZM20.9429 13.8806C20.1701 14.6534 20.1701 15.9064 20.9429 16.6792L22.3421 15.2798L23.7416 13.8808C22.9688 13.108 21.7156 13.1078 20.9429 13.8806Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
export default defineComponent({
  name: 'swiper-example-navigation',
  title: 'Navigation',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  mounted() {
    const swiper = document.querySelector('#swiperBox').swiper
    swiper.slideTo(this.index)
  },

  methods: {
    next() {
      const swiper = document.querySelector('#swiperBox').swiper
      swiper.slideNext()
    },
    prev() {
      const swiper = document.querySelector('#swiperBox').swiper
      swiper.slidePrev()
    },
    close() {
      this.$emit('close-light')
    },
  },
})
</script>
<style lang="scss" scoped>
.slide {
  width: 886px;
}
.bgOpacity {
  background: #52230fcf;
}
.prevSlide,
.nextSlide {
  background: #fff6;
}

.scale-enter-active {
  animation: scale 4s ease-out;
}
.scale-leave-active {
  animation: scale 4s ease-in reverse;
}
@keyframes scale {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}
</style>
