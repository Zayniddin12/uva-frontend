<template>
  <div class="main-bg">
    <bread-crumbs :links="links" />
    <main
      class="grid grid-cols-12 container b:flex b:flex-col-reverse items-start b:items-stretch !pb-[32px]"
    >
      <section class="col-span-9 b:col-span-12 grid b:pb-[32px]">
        <Section-title
          v-bind="{
            title: $t('events'),
          }"
        />
        <div>
          <Search
            class="mb-[24px]"
            :search-text="searchResult"
            @search="searchInput"
          />
        </div>
        <Preloader :fetch-state="$fetchState" :data="eventsList.results">
          <div class="main-events">
            <div class="main-events__item">
              <div class="main-events__wrapper">
                <Main-event-card
                  v-for="(item, index) in eventsList.results"
                  :key="index"
                  v-bind="{
                    id: item.id,
                    organizationId: String(item.organization.id),
                    title: item.title,
                    date: $moment(item.starting_date, 'DD.MM.YYYY'),
                    time: item.starting_time,
                    address: item.region?.name + ', ' + item.district?.name,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.direction,
                    slug: item.slug,
                    inProgress: item.status,
                    liked: item.is_liked,
                    subscribed: item.is_subscribed,
                    likedIcon: true,
                    img: item.image,
                  }"
                />
                <v-pagination
                  v-if="eventsList.total_pages > 1"
                  v-model="page"
                  class="mb-[64px]"
                  :value="page"
                  :length="eventsList.total_pages"
                ></v-pagination>
              </div>
            </div>
          </div>
        </Preloader>

        <NotFound
          v-if="!eventsList.total"
          :title="title"
          :subtitle="subtitle"
        />
      </section>
      <aside class="col-span-3 b:col-span-12 mb-[20px] pl-[24px] b:pl-[0px]">
        <Nav-side-bar class="mb-[20px]" />
        <Filters
          event-type
          :date="true"
          v-bind="{ age: false, direction: true }"
          @selectCountries="selectCountries"
          @selectdistrict="selectDistrict"
          @selectedDirection="selectedDirection"
          @selectType="selectType"
          @typeEventsChange="typeEventsChange"
          @startDate="startDate"
          @endDate="endDate"
          @date="postDate = $event"
          @sendResult="sendResult"
          @resetResult="resetResult"
        />
      </aside>
    </main>
  </div>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import BreadCrumbs from '../../components/volontyor/BreadCrumbs.vue'
import MainEventCard from '../../components/cards/MainEventCard.vue'
import Search from '../../components/volontyor/Search.vue'
import SectionTitle from '../../components/volontyor/SectionTitle.vue'
import Filters from '../../components/sidebar/Filters.vue'
import NavSideBar from '../../components/sidebar/NavSideBar.vue'
import NotFound from '~/components/notFound.vue'

export default {
  // middleware: ["auth"],
  layout: 'pages',
  components: {
    BreadCrumbs,
    SectionTitle,
    Search,
    MainEventCard,
    NavSideBar,
    Filters,
    NotFound,
  },
  props: {
    value: {
      type: Array,
      default: () => {},
    },
  },
  async fetch() {
    await this.$store
      .dispatch('events/fetchEventsList', {
        search: this.searchResult,
        page: this.page,
        region: this.selectedRegion,
        district: this.selectedDistrict,
        direction: this.direction.join(','),
        startingDate: this.postDate[0],
        finishingDate: this.postDate[1],
      })
      .catch(() => {})
  },
  validations: {
    maxAge: {
      minValue: minValue(new Date('minAge')),
    },
    minAge: {},
  },
  data() {
    return {
      today: new Date(),
      countriesId: '',
      title: this.$t('no_event'),
      subtitle: this.$t('active_event'),
      districtId: '',
      date: new Date(),
      postDate: [],
      datePickerLocale: {
        name: 'uz',
        weekdays: [
          this.$t('calendar.weeks.yak'),
          this.$t('calendar.weeks.dush'),
          this.$t('calendar.weeks.sesh'),
          this.$t('calendar.weeks.chor'),
          this.$t('calendar.weeks.pay'),
          this.$t('calendar.weeks.jum'),
          this.$t('calendar.weeks.sham'),
        ],
        months: [
          this.$t('calendar.months.yan'),
          this.$t('calendar.months.fev'),
          this.$t('calendar.months.mart'),
          this.$t('calendar.months.aprel'),
          this.$t('calendar.months.may'),
          this.$t('calendar.months.iyun'),
          this.$t('calendar.months.iyul'),
          this.$t('calendar.months.avg'),
          this.$t('calendar.months.sent'),
          this.$t('calendar.months.okt'),
          this.$t('calendar.months.noy'),
          this.$t('calendar.months.dek'),
        ],
        weekStart: 1,
        weekdaysShort: [
          this.$t('calendar.week_short.yak'),
          this.$t('calendar.week_short.dush'),
          this.$t('calendar.week_short.sesh'),
          this.$t('calendar.week_short.chor'),
          this.$t('calendar.week_short.pay'),
          this.$t('calendar.week_short.jum'),
          this.$t('calendar.week_short.sham'),
        ],
        monthsShort: [
          this.$t('calendar.month_short.yan'),
          this.$t('calendar.month_short.fev'),
          this.$t('calendar.month_short.mart'),
          this.$t('calendar.month_short.aprel'),
          this.$t('calendar.month_short.may'),
          this.$t('calendar.month_short.iyun'),
          this.$t('calendar.month_short.iyul'),
          this.$t('calendar.month_short.avg'),
          this.$t('calendar.month_short.sent'),
          this.$t('calendar.month_short.okt'),
          this.$t('calendar.month_short.noy'),
          this.$t('calendar.month_short.dek'),
        ],
        formats: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd D MMMM YYYY HH:mm',
        },
        ordinal: (n) => `${n}º`,
        buttonCancel: 'Annulla',
        buttonValidate: 'Ok',
        rangeHeaderText: 'Dalle %d Alle 13',
      },

      searchResult: '',
      page: Number(this.$route.query.page) || 1,
      selectedRegion: '',
      selectedDistrict: '',
      direction: [],
      minAge: null,
      maxAge: null,
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('events'),
          url: `possibilities`,
        },
      ]
    },
    ...mapState({
      eventsList: (state) => state.events.eventsList,
      countries: (state) => state.countries,
    }),
  },
  watch: {
    async page(value) {
      await this.$store
        .dispatch('events/fetchEventsList', {
          search: this.searchResult,
          page: value,
          region: this.selectedRegion,
          district: this.selectedDistrict,
          direction: this.direction.join(','),
          startingDate: this.postDate[0],
          finishingDate: this.postDate[1],
        })
        .catch(() => {})
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, page: value },
      })
    },
  },
  methods: {
    typeEventsChange(e) {
      this.$store.dispatch('events/fetchEventsList', {
        search: this.searchResult,
        page: this.page,
        region: this.selectedRegion,
        district: this.selectedDistrict,
        direction: this.direction.join(','),
        startingDate: this.postDate.start,
        finishingDate: this.postDate.end,
        isBadge: e,
      })
    },
    selectCountries(e) {
      this.selectedRegion = e
      this.selectedDistrict = null
    },
    selectDistrict(e) {
      this.selectedDistrict = e
    },
    selectedDirection(e) {
      this.direction = [...e]
    },
    selectType(e) {
      this.type = e
    },
    startDate(e) {
      this.minAge = e
    },
    endDate(e) {
      this.maxAge = e
    },
    async sendResult() {
      this.$v.maxAge.$touch()
      this.$v.minAge.$touch()
      if (!this.$v.$error) {
        await this.$store
          .dispatch('events/fetchEventsList', {
            search: this.searchResult,
            page: this.page,
            region: this.selectedRegion,
            district: this.selectedDistrict,
            direction: this.direction.join(','),
            startingDate: this.postDate.start,
            finishingDate: this.postDate.end,
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    async resetResult() {
      this.direction = ''
      this.selectedRegion = ''
      this.searchResult = ''
      this.selectedDistrict = ''
      this.direction = []
      this.minAge = ''
      this.maxAge = ''
      await this.$store
        .dispatch('events/fetchEventsList', {
          search: '',
          page: this.page,
          region: '',
          selectedDistrict: '',
          direction: [],
          startingDate: '',
          finishingDate: '',
        })
        .catch(() => {})
    },

    getYesterdayDate() {
      return new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
    },
    async searchInput(e) {
      this.searchResult = e
      if (this.searchResult.length > 0 || this.searchResult.length === 0) {
        await this.$store.dispatch('events/fetchEventsList', {
          search: this.searchResult,
          page: this.searchResult.length === 0 ? this.page : 1,
          region: this.selectedRegion,
          district: this.selectedDistrict,
          direction: this.direction.join(','),
          startingDate: this.postDate[0],
          finishingDate: this.postDate[1],
        })
      }
    },
  },
  head() {
    return {
      title: this.$t('events'),
    }
  },
}
</script>

<style lang="scss" scoped>
.el-date-editor {
  border: none !important;
}
</style>
