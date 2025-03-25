<template>
  <div>
    <div
      v-if="
        platinumVolunteersList1 || goldVolunteersList || silverVolunteersList
      "
      class="py-[60px] bg-white"
    >
      <!-- platina -->
      <div
        v-if="platinumVolunteersList1 && platinumVolunteersList1.length"
        class="container mb-[24px]"
      >
        <section-title
          v-bind="{
            title: $t('platine_volunteers'),
            link: $t('all_platine_volunteers'),
            linkUrl: localePath('/volunteer/platinum'),
          }"
        >
          <template v-slot:prefix>
            <img
              class="mr-[12px]"
              src="@/static/icons/new-diamond.svg"
              alt="ico"
            />
          </template>
        </section-title>
      </div>
      <div
        v-if="platinumVolunteersList1 && platinumVolunteersList1.length"
        class="marquee marquee-platine"
      >
        <div aria-hidden="true" :class="`marquee__group leeft`">
          <LevelCard
            v-for="(item, index) in generateItem(platinumVolunteersList1)"
            :key="index"
            custom-class="text-[20px]"
            :data="item"
            class="platinumer"
            :type="'platine'"
            :loading="loading"
            direction="right"
          />
        </div>
      </div>
      <div
        v-if="platinumVolunteersList2 && platinumVolunteersList2.length"
        class="marquee marquueer mt-[10px]"
      >
        <div aria-hidden="true" :class="`marquee__group riight`">
          <LevelCard
            v-for="(item, index) in generateItem(
              platinumVolunteersList2.slice(0, 6)
            )"
            :key="index"
            custom-class="text-[20px]"
            :data="item"
            class="platinumer"
            :type="'platine'"
            :loading="loading"
          />
        </div>
      </div>

      <!-- gold -->
      <div
        v-if="goldVolunteersList && goldVolunteersList.length"
        class="container mt-2 mb-5"
      >
        <section-title
          v-bind="{
            title: $t('gold_volunteers'),
            link: $t('all_gold_volunteers'),
            linkUrl: localePath('/volunteer/gold'),
          }"
        >
          <template v-slot:prefix>
            <img
              class="mr-[12px]"
              src="@/static/icons/new-gold.svg"
              alt="ico"
            />
          </template>
        </section-title>
      </div>

      <VueSlickCarousel
        v-if="goldVolunteersList && goldVolunteersList.length"
        ref="slider"
        v-bind="settings"
        class="gold-slider"
      >
        <LevelCard
          v-for="(item, index) in generateItem(goldVolunteersList)"
          :key="index"
          :data="item"
          :type="'gold'"
          custom-class="!text-[16px] whitespace-wrap"
          class="golder"
          :loading="loading"
          direction="right"
          size="md"
        />
      </VueSlickCarousel>

      <!-- silver -->
      <div
        v-if="silverVolunteersList && silverVolunteersList.length"
        class="container mt-9 mb-6"
      >
        <section-title
          v-bind="{
            title: $t('silver_volunteers'),
            link: $t('all_silver_volunteers'),
            linkUrl: localePath('/volunteer/silver'),
          }"
        >
          <template v-slot:prefix>
            <img
              class="mr-[12px]"
              src="@/static/icons/new-silver.svg"
              alt="ico"
            />
          </template>
        </section-title>
      </div>
      <VueSlickCarousel
        v-if="silverVolunteersList && silverVolunteersList.length"
        ref="slider"
        v-bind="settingsSilver"
        class="gold-slider"
      >
        <LevelCard
          v-for="(item, index) in generateItem(silverVolunteersList)"
          :key="index"
          class="silverer"
          :data="item"
          :type="'silver'"
          :loading="loading"
          size="sm"
        />
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import SectionTitle from '@/components/SectionTitle.vue'
import LevelCard from '../volontyor/Cards/LevelCard.vue'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  components: {
    LevelCard,
    SectionTitle,
    VueSlickCarousel,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'right',
    },
  },
  async fetch() {
    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 4,
        page: 1,
      })
      .then((res) => {
        this.platinumVolunteersList1 = res.data.results
      })
    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 4,
        page: 1,
      })
      .then((res) => {
        this.platinumVolunteersList2 = res.data.results
      })

    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 3,
      })
      .then((res) => {
        console.log(res.data)
        this.goldVolunteersList = res.data.results
      })

    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 2,
      })
      .then((res) => {
        this.silverVolunteersList = res.data.results
      })
  },
  data() {
    return {
      platinumVolunteersList1: null,
      platinumVolunteersList2: null,
      goldVolunteersList: null,
      silverVolunteersList: null,
      settings: {
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
        centerMode: false,
        rtl: true,
        responsive: [
          // { breakpoint: 500, settings: { slidesToShow: 3 } },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
            },
          },
          { breakpoint: 700, settings: { slidesToShow: 2 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
        ],
      },
      settingsSilver: {
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        variableWidth: true,
        centerMode: false,
        rtl: false,
        responsive: [
          // { breakpoint: 500, settings: { slidesToShow: 3 } },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
            },
          },
          { breakpoint: 700, settings: { slidesToShow: 2 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
        ],
      },
    }
  },
  methods: {
    generateItem(arr) {
      let index = 0 // 1 / 2
      const generatedArray = [] // [{id: 1},{id: 2}, {id: 3}, {id: 1}]
      const checkResponseLength = arr?.length // 3
      const checkAdditionalItems = 100 - checkResponseLength // 97
      for (let i = 0; i <= checkAdditionalItems; i++) {
        generatedArray.push(arr[index])
        if (index + 1 === checkResponseLength) {
          index = 0
        } else {
          index++
        }
      }
      return generatedArray
    },
  },
}
</script>

<style>
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 3rem;
  min-height: 190px;
  padding: 10px 0;
}

.marquee__group {
  flex-shrink: 0;
  margin-left: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  min-width: 100%;
}

.leeft {
  animation: scroll-left 1000s linear infinite;
  transition: all ease 0.3s;
}

.leeft:hover {
  animation-play-state: paused;
}

.riight {
  animation: scroll-right 1000s linear infinite;
  transition: all ease 0.3s;
}

.riight:hover {
  animation-play-state: paused;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 3rem));
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(calc(0 + 3rem));
  }
}

.gold-slider .slick-track {
  display: flex;
  align-items: center;
  gap: 20px;
}

.gold-slider .slick-list,
.silver-slider .slick-list {
  min-height: 140px;
  padding: 10px 0 !important;
}
.marquueer {
  padding: 0 !important;
}
.marquueer > .marquee__group {
  height: min-content !important;
}
.golder {
  width: 302px !important;
  height: 120px !important;
}
.silverer {
  width: 251px !important;
  height: 96px !important;
  padding: 16px !important;
}
.platinumer {
  width: 381px !important;
  height: 156px !important;
}
</style>
