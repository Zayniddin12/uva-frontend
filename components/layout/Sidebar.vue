<template>
  <aside class="col-span-3">
    <div
      class="aside-item"
      :style="{
        'background-image': 'url(' + volunteerImagePath + ')',
        'box-shadow': 'inset 0 0 0 1000px rgba(15, 40, 82, 0.75)',
      }"
    >
      <div class="aside-item__content">
        <icon-base name="logo" />
        <div>
          <h6 class="line-clamp-5">{{ $t('want_popular_volunteer') }}</h6>
          <nuxt-link to="/volunteer">
            <button class="blue-button line-clamp-1">{{ $t('join') }}</button>
          </nuxt-link>
        </div>
      </div>
    </div>

    <a
      href="https://lenta.uz"
      class="aside-item advers"
      :style="{ 'background-image': 'url(' + lentaImagePath + ')' }"
    >
    </a>
  </aside>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
import volunteerImagePath from '~/static/img/volunteer.jpg'
import lentaImagePath from '~/static/img/lenta-ads.jpg'
export default {
  components: { IconBase },
  data() {
    return {
      volunteerImagePath,
      lentaImagePath,
    }
  },
}
</script>
