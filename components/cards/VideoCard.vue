<template>
  <div class="video-card">
    <div
      class="video-card__top"
      :style="`background-image: url('${
        data.preview_url || require('~/static/img/video_default.svg')
      }')`"
    >
      <div class="video-card__top__play">
        <icon-base name="play" />
      </div>
      <h6 class="line-clamp-2">{{ data.title }}</h6>
    </div>
    <div class="video-card__bottom">
      <span>
        <icon-base name="date-range" />
        {{ $moment(data.posted_date, 'DD.MM.YYYY') }}
      </span>
      <span>
        <icon-base name="clock" />
        {{ $moment(data.posted_date, 'HH:mm') }}
      </span>
      <span>
        <icon-base name="eye" />
        {{ data.seen }}
      </span>
    </div>
  </div>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
