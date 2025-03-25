<template>
  <div class="">
    <BreadCrumbs :links="links" />
    <div v-if="about" class="about-bg">
      <div
        class="container about-page aboutp grid grid-cols-2 b:grid-cols-none items-center gap-4"
      >
        <div class="aboutp__left-side">
          <h4 class="aboutp__title">{{ $t('our_mission') }}</h4>
          <p
            class="aboutp__content text-xl f:text-base"
            :class="showContent ? 'showContent' : 'hideContent'"
            v-html="about.our_mission.our_mission"
          ></p>
          <button class="aboutp__btn-more" @click="showContent = !showContent">
            <span v-if="!showContent">
              {{ $t('more') }}
              <icon-base name="icon-more" class="icon more-icon" />
            </span>
            <span v-else>
              {{ $t('hide_content') }}
              <icon-base name="icon-hide" class="icon" />
            </span>
          </button>
        </div>
        <div class="aboutp__right-side b:pt-[30px]">
          <div class="card card-volunteer">
            <icon-base name="hearts" class="icon" />
            <p class="count">{{ about.number_volunteers }}</p>
            <p class="name">{{ $t('volunteers') }}</p>
          </div>
          <div class="card card-organization">
            <icon-base name="organizations" class="icon" />
            <p class="count">{{ about.number_organizations }}</p>
            <p class="name">{{ $t('organization') }}</p>
          </div>
          <div class="card card-projects">
            <icon-base name="projects-icon" class="icon" />
            <p class="count">{{ about.number_events }}</p>
            <p class="name">{{ $t('projects') }}</p>
          </div>
        </div>
      </div>
    </div>
    <Volunteer class="mb-[52px]" />
    <Our-events />
  </div>
</template>

<script>
import IconBase from '../../components/volontyor/IconBase.vue'
import OurEvents from '../../components/sections/OurEvents.vue'
import BreadCrumbs from '~/components/BreadCrumbs'
import Volunteer from '~/components/sections/Volunteer'

export default {
  layout: 'pages',
  components: {
    BreadCrumbs,
    Volunteer,
    IconBase,
    OurEvents,
  },
  async fetch() {
    await this.$getAction('about_us')
      .then((response) => {
        this.about = response
      })
      .catch(() => {})
  },
  data() {
    return {
      showContent: false,
      about: null,
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('about_us'),
          url: `about`,
        },
      ]
    },
  },
  head() {
    return {
      title: this.$t('about_us'),
    }
  },
}
</script>
