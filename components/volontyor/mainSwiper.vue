<template>
  <div
    class="about creative-example max-w-[380px] md:max-w-[500px] lg:max-w-[520px] w-full relative"
  >
    <swiper
      v-if="render"
      id="swiper"
      ref="swiper"
      class="swiper h-[300px] w-full lg:w-[500px] xl:w-[558px] lg:h-[330px]"
      :options="settings"
      :modules="modules"
      :effect="'creative'"
      :creative-effect="effects[effectIndex]"
      :grab-cursor="true"
    >
      <swiper-slide v-for="(item, index) in items" :key="index" class="slide">
        <img
          :src="item.img"
          alt=""
          class="w-[300px] md:w-[450px] xl:w-[495px]"
        />
      </swiper-slide>
    </swiper>
    <button
      class="arrow absolute top-[43%] right-[60px] md:right-[30px] xl:right-[8px] z-[9999] rounded-full"
      @click="next()"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.0234375"
          y="0.123047"
          width="33.3234"
          height="33.3234"
          rx="16.6617"
          fill="white"
          fill-opacity="0.4"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12.4855 25.1864C12.9454 25.6462 13.6909 25.6462 14.1508 25.1864L13.4217 24.4572C14.1508 25.1864 14.1507 25.1864 14.1508 25.1864L14.2281 25.1089L14.4436 24.8919C14.629 24.7049 14.8935 24.4371 15.2107 24.1132C15.8447 23.466 16.6917 22.5926 17.54 21.6912C18.3855 20.7929 19.2443 19.8542 19.8963 19.0799C20.2202 18.6953 20.5099 18.3314 20.7245 18.023C20.8306 17.8705 20.9351 17.7077 21.0178 17.5475C21.0744 17.4378 21.2245 17.1425 21.2245 16.7838C21.2245 16.4252 21.0744 16.1298 21.0178 16.0201C20.9351 15.8599 20.8306 15.6971 20.7245 15.5446C20.5099 15.2362 20.2202 14.8723 19.8963 14.4877C19.2443 13.7134 18.3855 12.7747 17.54 11.8764C16.6917 10.975 15.8447 10.1016 15.2107 9.45439C14.8935 9.13053 14.629 8.86275 14.4436 8.67573L14.2281 8.45875L14.1522 8.38268L14.1509 8.38138C14.1509 8.3813 14.1508 8.38125 13.3182 9.2139L12.4855 10.0466L12.5593 10.1206L12.7709 10.3336C12.9536 10.5179 13.2148 10.7823 13.5283 11.1024C14.156 11.7431 14.9912 12.6045 15.8251 13.4905C16.6618 14.3795 17.4852 15.2807 18.0949 16.0047C18.3553 16.3139 18.5646 16.5766 18.7158 16.7838C18.5646 16.991 18.3553 17.2537 18.0949 17.5629C17.4852 18.2869 16.6618 19.1881 15.8251 20.0771C14.9912 20.9631 14.156 21.8245 13.5283 22.4652C13.2148 22.7853 12.9536 23.0497 12.7709 23.234L12.5593 23.447L12.4865 23.52C12.0267 23.9799 12.0256 24.7265 12.4855 25.1864ZM18.925 16.4674C18.9371 16.4371 18.9414 16.4356 18.925 16.4674C18.9248 16.4678 18.9252 16.4669 18.925 16.4674ZM12.4855 8.38125C12.0256 8.84111 12.0257 9.58671 12.4855 10.0466L13.3182 9.2139L14.1509 8.38138C13.6911 7.92152 12.9454 7.92139 12.4855 8.38125Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import  {
  Navigation,
  Pagination,
  EffectCreative,
  Autoplay,
} from 'swiper'
import { CreativeEffectOptions } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'
export default defineComponent({
  name: 'mainSwiper',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const items = ref([
      {
        title: '1',
        img: '/src/assets/images/entrance_image_1.png',
      },
      {
        title: '2',
        img: '/src/assets/images/entrance_image_2.png',
      },
    ])
    const render = ref(true)
    const effectIndex = ref(0)
    const setEffect = (index: number) => {
      effectIndex.value = index
      nextTick(() => {
        render.value = false
        nextTick(() => {
          render.value = true
        })
      })
    }
    const effects: CreativeEffectOptions[] = [
      {
        prev: {
          translate: [0, 0, -1000],
        },
        next: {
          translate: ['100%', 0, -600],
          scale: 1.3,
        },
      },
    ]
    return {
      effects,
      effectIndex,
      render,
      setEffect,
      modules: [Autoplay, Navigation, Pagination, EffectCreative],
      settings: {
        loop: true,
      },
      items,
    }
  },

  methods: {
    next() {
      const swiper = document.querySelector('#swiper').swiper
      swiper.slideNext()
    },
  },
})
</script>
<style lang="scss" scoped>
.about {
  .swiper {
    margin: 20px auto;
    position: relative;
    .slide {
      border-radius: 16px;
      img {
        display: block;
        height: 100%;
        border-radius: 16px;
        object-fit: cover;
      }
    }
    .swiper-button-next::after {
      display: none;
    }
  }
}
.arrow {
  background: #fff6;
}
</style>
