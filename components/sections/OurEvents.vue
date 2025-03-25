<template>
  <div v-if="eventImages.length" class="our-events">
    <div class="container text-center">
      <h2 class="our-events__title">{{ $t('out_events') }}</h2>
      <div
        class="our-events__images grid grid-cols-5 b:grid-cols-3 g:grid-cols-1"
      >
        <div
          v-for="(item, ind) in eventImages"
          :key="ind"
          class="our-events__image"
        >
          <img :src="item" alt="" />
          <div class="our-events__image-layout" @click="index = ind">
            <icon-base name="search" @click="index = ind" />
          </div>
        </div>
      </div>
    </div>
    <!--    eventImages-->
    <CoolLightBox
      :items="eventImages"
      :index="index"
      src-name="image_url"
      :slideshow="true"
      @close="index = null"
    />
  </div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import IconBase from '../volontyor/IconBase.vue'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: { IconBase, CoolLightBox },
  async fetch() {
    await this.$getAction('/event/')
      .then((response) => {
        this.eventImages = response?.results?.map((item) => item.image)
      })
      .catch(() => {})
  },
  data() {
    return {
      index: null,
      eventImages: [],
    }
  },
}
</script>
