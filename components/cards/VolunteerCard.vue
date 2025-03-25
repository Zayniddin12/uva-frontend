<template>
  <div class="volunteers group">
    <router-link
      :to="localePath('/volunteer/' + data.id)"
      class="volunteers__img"
      :style="{ borderColor: color }"
    >
      <img :src="data.photo || data.default_photo" :alt="data.first_name" />
    </router-link>
    <router-link class="" :to="'/volunteer/' + data.id">
      <h4
        class="volunteers__name transition duration-300 group-hover:text-blue"
      >
        {{ data.first_name }}
      </h4>
      <h4
        class="volunteers__name transition duration-300 group-hover:text-blue"
      >
        {{ data.last_name }}
      </h4>
    </router-link>
    <router-link
      :to="'/volunteer/' + data.id"
      target="_blank"
      rel="noopener noreferrer"
      class="volunteers__location"
    >
      <icon-base name="light-location" />
      {{ data.region }}
    </router-link>
  </div>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    color: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
}
</script>
