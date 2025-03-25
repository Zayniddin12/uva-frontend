<template>
  <div id="goPartners">
    <div v-if="partners.length" class="partners">
      <div class="container">
        <h2 class="partners__title">{{ $t('partners') }}</h2>
        <div class="slider-arrows">
          <div @click="showPrev()">
            <icon-base name="left-icon" class="icon" />
          </div>
          <div @click="showNext()">
            <icon-base name="right-icon" class="icon" />
          </div>
        </div>
      </div>
      <VueSlickCarousel ref="slider" v-bind="settings">
        <Partnerscard
          v-for="(item, index) in partners"
          :key="index"
          :data="item"
        />
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import Partnerscard from '../cards/Partnerscard.vue'
import IconBase from '../volontyor/IconBase.vue'

export default {
  components: { VueSlickCarousel, Partnerscard, IconBase },
  data() {
    return {
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
  computed: {
    ...mapState({
      partners: (state) => state.home.partners,
    }),
  },
  methods: {
    showNext() {
      this.$refs.slider.next()
    },
    showPrev() {
      this.$refs.slider.prev()
    },
  },
}
</script>
