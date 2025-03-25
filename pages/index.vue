<template>
  <main class="main-bg">
    <Preloader :fetch-state="$fetchState">
      <slider />
      <about-card />
      <Map />
      <Statistics />
      <Volunteer />
      <LastNews />
      <Events />
      <ExpertsSection />
      <Organizations />
      <Volunteers-slider v-if="false" />
      <VolunteerLevelSlider />
      <Partners />
    </Preloader>
  </main>
</template>

<script>
import VolunteerLevelSlider from '@/components/sections/VolunteerLevelSlider.vue'
import Map from '../components/home/Map.vue'
import Slider from '../components/home/Slider.vue'
import LastNews from '../components/sections/LastNews'
import Volunteer from '../components/sections/Volunteer.vue'
import Events from '../components/sections/Events.vue'
import Organizations from '../components/sections/Organizations.vue'
import AboutCard from '../components/home/AboutCard.vue'
import VolunteersSlider from '../components/sections/VolunteersSlider.vue'
import Partners from '../components/sections/Partners.vue'
import Statistics from '../components/sections/Statistics.vue'
import ExpertsSection from '~/components/sections/ExpertsSection.vue'

export default {
  components: {
    VolunteerLevelSlider,
    ExpertsSection,
    Slider,
    Map,
    LastNews,
    Volunteer,
    Events,
    Organizations,
    AboutCard,
    VolunteersSlider,
    Partners,
    Statistics,
  },
  async fetch() {
    await this.$getAction('/main_page/')
      .then((response) => {
        this.$store.commit('home/setMainPageData', response)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data() {
    return {
      date: '',
      volunteerList: [
        {
          fullName: 'Абдуллаева Айгуль',
          address: 'Tashkent',
          img: 'img/volontyor.svg',
        },
      ],
      about: [
        {
          id: 1,
          title: this.$t('our_goal'),
          content: this.$t('our_goal_text'),
          btnText: this.$t('about_us'),
        },
        {
          id: 2,
          title: this.$t('join_us'),
          content: this.$t('join_us_text'),
          btnText: this.$t('join'),
        },
        {
          id: 3,
          title: this.$t('projectss'),
          content: this.$t('projectss_text'),
          btnText: this.$t('our_projects'),
        },
      ],
    }
  },
  created() {
    if (this.$route.fullPath === '/?goPartners=1000') {
      // eslint-disable-next-line
      window.scroll({
        top: 1500,
        left: 0,
        behavior: 'smooth',
      })
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  //font-family: 'Open Sans';
  font-size: 16px;
}
</style>
