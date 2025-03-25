<template>
  <div>
    <section v-if="volunteers.length" class="volunteers-slider container">
      <section-title
        v-bind="{
          title: $t('volunteers'),
          link: $t('all_volunteer'),
          linkUrl: localePath('/volunteer'),
        }"
      />
      <div
        class="mt-[24px] slider grid grid-cols-6 b:grid-cols-3 f:grid-cols-2 h:grid-cols-1"
      >
        <volunteer-card
          v-for="(item, index) in volunteers"
          :key="index"
          :color="getRandomColor()"
          :data="item"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VolunteerCard from '../cards/VolunteerCard.vue'
import SectionTitle from '../volontyor/SectionTitle.vue'
export default {
  components: { VolunteerCard, SectionTitle },
  data() {
    return {
      colors: [
        '#FF0000',
        '#04D500',
        '#EE3497',
        '#FEC110',
        '#F35E24',
        '#E5274E',
        '#F35E24',
        '#52230F',
      ],
    }
  },
  computed: {
    ...mapState({
      volunteers: (state) => state.home.volunteers,
    }),
  },
  methods: {
    getRandomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
  },
}
</script>

<style lang="scss">
.volunteers-slider {
  .slick-track {
    display: flex !important;
    width: 14000px !important;
  }
  .slick-slide {
    width: 200px !important;
  }
}
</style>
