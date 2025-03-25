<template>
  <div>
    <Preloader :fetch-state="$fetchState" :data="about">
      <BreadCrumbs :links="links" />
      <div class="about-bg">
        <div
          class="container about-page aboutp grid grid-cols-2 b:grid-cols-none gap-4"
        >
          <div class="aboutp__left-side">
            <h4 class="aboutp__title">{{ $t('our_mission') }}</h4>
            <!--    <div id="abputP" class="aboutp__content text-xl f:text-base">
              <div
                v-html="$filterTextTags(about.our_mission ? about.our_mission.our_mission : '', 'pre')"
              ></div>
            </div>   -->

            <div id="abputP" class="aboutp__content text-xl f:text-base">
              <div
                :class="showContent ? 'line-clamp-none _full' : 'line-clamp-6'"
                v-html="
                  $filterTextTags(
                    about.our_mission ? about.our_mission.our_mission : '',
                    'pre'
                  )
                "
              ></div>
            </div>
            <button
              v-if="about.our_mission ? about.our_mission.our_mission : 0 > 297"
              :class="{ _active: showContent }"
              class="aboutp__btn-more"
              @click="
                showContent = !showContent
                contentFunc()
              "
            >
              <span v-if="!showContent">
                {{ $t('more') }}
                <icon-base name="icon-more" class="icon more-icon" />
              </span>
              <span v-else>
                {{ $t('hide_content') }}
                <icon-base name="icon-more" class="icon more-icon" />
              </span>
            </button>
          </div>
          <div class="aboutp__right-side b:pt-[30px]">
            <nuxt-link
              :to="localePath('/volunteer')"
              class="card card-volunteer"
            >
              <icon-base name="hearts" class="icon" />
              <p class="count">{{ about.number_volunteers }}</p>
              <p class="name">{{ $t('volunteers') }}</p>
            </nuxt-link>
            <nuxt-link
              :to="localePath('/possibilities/organization')"
              class="card card-organization"
            >
              <icon-base name="organizations" class="icon" />
              <p class="count">{{ about.number_organizations }}</p>
              <p class="name">{{ $t('organization') }}</p>
            </nuxt-link>
            <nuxt-link
              :to="localePath('/possibilities')"
              class="card card-projects"
            >
              <icon-base name="projects-icon" class="icon" />
              <p class="count">{{ about.number_events }}</p>
              <p class="name">{{ $t('projects') }}</p>
            </nuxt-link>

            <nuxt-link
              :to="localePath(`/?goPartners=1000`)"
              class="card card-partners"
            >
              <icon-base name="partner-icon" class="icon" />
              <p class="count">{{ about.number_partners }}</p>
              <p class="name">{{ $t('partners') }}</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <Volunteer class="mb-[52px]" />
      <Our-events />
    </Preloader>
  </div>
</template>

<script>
import IconBase from '../components/volontyor/IconBase.vue'
import OurEvents from '../components/sections/OurEvents.vue'
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
      about: '',
      filteredText: '',
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
  mounted() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  methods: {
    scrollToPartners() {},
    contentFunc() {
      const abputP = document.getElementById('abputP')
      abputP.style.height = abputP.children[0].offsetHeight + 'px'
      setTimeout(() => {
        abputP.style.height = abputP.children[0].offsetHeight + 'px'
      }, 0)
    },
  },
}
</script>
