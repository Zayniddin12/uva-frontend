<template>
  <div class="flex items-center gap-4">
    <swiper
      v-if="render"
      id="swiperTeam"
      ref="swiper"
      class="swiper"
      :modules="modules"
      direction="vertical"
      :effect="'creative'"
      :creative-effect="effects[effectIndex]"
      :grab-cursor="true"
    >
      <swiper-slide
        v-for="(item, index) in profiles"
        :key="index"
        class="slide"
      >
        <div class="relative lg:w-[480px] xl:w-[541px] h-[166px]">
          <img
            :src="item.image"
            class="absolute top-[-35px] left-[-20px]"
            alt=""
          />
          <div
            class="bg-white card pr-[28px] pl-[50px] py-4 w-[274px] lg:w-[440px] xl:w-[504px] rounded-[10px]"
          >
            <div class="flex items-center justify-between mb-3">
              <h1 class="text-base lg:text-xl text-[#14183E] font-semibold">
                {{ item.name }}
              </h1>
              <p class="text-sm font-medium text-[#5E6282]">
                {{ item.status }}
              </p>
            </div>
            <div>
              <a
                :href="'mailto:' + item.mail"
                class="text-base lg:text-lg font-medium text-[#2C2D33] flex items-center gap-[15px]"
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5.5H5C3.89543 5.5 3 6.39543 3 7.5V17.5C3 18.6046 3.89543 19.5 5 19.5H19C20.1046 19.5 21 18.6046 21 17.5V7.5C21 6.39543 20.1046 5.5 19 5.5Z"
                    stroke="#DA6B3B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 7.5L12 13.5L21 7.5"
                    stroke="#DA6B3B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {{ item.mail }}
              </a>
              <a
                :href="'tel:' + item.number"
                class="mt-1 text-base lg:text-lg font-medium text-[#2C2D33] flex items-center gap-[15px]"
              >
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4.5H9L11 9.5L8.5 11C9.57096 13.1715 11.3285 14.929 13.5 16L15 13.5L20 15.5V19.5C20 20.0304 19.7893 20.5391 19.4142 20.9142C19.0391 21.2893 18.5304 21.5 18 21.5C14.0993 21.263 10.4202 19.6065 7.65683 16.8432C4.8935 14.0798 3.23705 10.4007 3 6.5C3 5.96957 3.21071 5.46086 3.58579 5.08579C3.96086 4.71071 4.46957 4.5 5 4.5"
                    stroke="#DA6B3B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                {{ item.number }}
              </a>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="flex flex-col gap-[57px]">
      <button class="group" @click="prev()">
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="transition duration-400"
            d="M0.292893 8.29289C-0.0976311 8.68342 -0.0976311 9.31658 0.292893 9.70711C0.683417 10.0976 1.31658 10.0976 1.70711 9.70711L0.292893 8.29289ZM8 2L8.70711 1.29289L8 0.585786L7.29289 1.29289L8 2ZM14.2929 9.70711C14.6834 10.0976 15.3166 10.0976 15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289L14.2929 9.70711ZM1.70711 9.70711L8.70711 2.70711L7.29289 1.29289L0.292893 8.29289L1.70711 9.70711ZM7.29289 2.70711L14.2929 9.70711L15.7071 8.29289L8.70711 1.29289L7.29289 2.70711Z"
            fill="#3E2E4D"
          />
        </svg>
      </button>
      <button class="group" @click="next()">
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="transition duration-400"
            d="M0.292893 2.20711C-0.0976311 1.81658 -0.0976311 1.18342 0.292893 0.792893C0.683417 0.402369 1.31658 0.402369 1.70711 0.792893L0.292893 2.20711ZM8 8.5L8.70711 9.20711L8 9.91421L7.29289 9.20711L8 8.5ZM14.2929 0.792893C14.6834 0.402369 15.3166 0.402369 15.7071 0.792893C16.0976 1.18342 16.0976 1.81658 15.7071 2.20711L14.2929 0.792893ZM1.70711 0.792893L8.70711 7.79289L7.29289 9.20711L0.292893 2.20711L1.70711 0.792893ZM7.29289 7.79289L14.2929 0.792893L15.7071 2.20711L8.70711 9.20711L7.29289 7.79289Z"
            fill="#3E2E4D"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import  { EffectCreative } from 'swiper'
import { CreativeEffectOptions } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default defineComponent({
  name: 'swiper-example-vertical',
  title: 'Vertical slider',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const profiles = ref([
      {
        name: 'Виктория Ким',
        image: '/src/assets/images/profile_image.png',
        mail: 'sadriddin19@gmail.com',
        number: '+998 91 120-20-86',
        status: 'Волонтер',
      },
      {
        name: 'Виктория Ким',
        image: '/src/assets/images/profile_image.png',
        mail: 'domlahonov@gmail.com',
        number: '+998 90 540-23-86',
        status: 'Волонтер',
      },
      {
        name: 'Виктория Ким',
        image: '/src/assets/images/profile_image.png',
        mail: 'sadriddin19@gmail.com',
        number: '+998 91 120-20-86',
        status: 'Волонтер',
      },
      {
        name: 'Виктория Ким',
        image: '/src/assets/images/profile_image.png',
        mail: 'domlahonov@gmail.com',
        number: '+998 90 540-23-86',
        status: 'Волонтер',
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
          shadow: false,
          translate: [-100, -400, -100],
        },
        next: {
          translate: ['1%', 70, -100],
          scale: 1,
        },
      },
    ]

    return {
      effects,
      effectIndex,
      render,
      setEffect,
      modules: [EffectCreative],
      profiles,
    }
  },

  methods: {
    next() {
      const swiper = document.querySelector('#swiperTeam').swiper
      swiper.slideNext()
    },
    prev() {
      const swiper = document.querySelector('#swiperTeam').swiper
      swiper.slidePrev()
    },
  },
})
</script>

<style lang="scss" scoped>
.swiper {
  height: 236px;
  margin: 0 !important;
}
.slide {
  display: flex;

  /* justify-content: center; */
  padding: 0 0 0 22px;
  align-items: center;
  backdrop-filter: blur(2px);
}
.card {
  box-shadow: 0 100px 80px rgba(0, 0, 0, 0.02),
    0 64.8148px 46.8519px rgba(0, 0, 0, 0.0151852),
    0 38.5185px 25.4815px rgba(0, 0, 0, 0.0121481),
    0 20px 13px rgba(0, 0, 0, 0.01),
    0 8.14815px 6.51852px rgba(0, 0, 0, 0.00785185),
    0 1.85185px 3.14815px rgba(0, 0, 0, 0.00481481);
}

.group:hover svg path {
  fill: #da6b3b;
}
</style>
