<template>
  <div>
    <BreadCrumbs
      v-bind="{
        links: [
          {
            title: $t('volunteers'),
            url: `volunteer`,
          },
        ],
      }"
    />
    <div
      class="grid grid-cols-12 container b:flex b:flex-col-reverse items-start b:items-stretch !pb-[32px]"
    >
      <div class="col-span-9 b:col-span-12 b:pb-[32px]">
        <Search
          class="mb-[24px]"
          placeholder-search="search_with_name"
          @search="searchInput"
        />
        <Preloader :fetch-state="$fetchState" :data="volunteersList.results">
          <div>
            <div v-if="volunteersList?.results?.length">
              <div class="grid mb-[32px]">
                <VolunteerItemCard
                  v-for="(item, index) in volunteersList.results"
                  :key="index"
                  v-bind="{
                    id: item?.id,
                    userImg: item?.photo || item?.default_photo,
                    userName: item?.first_name + ' ' + item?.last_name,
                    // address:
                    //   item?.region?.name ??
                    //   '' + ', ' + item?.district?.name ??
                    //   '',
                    address: `${item?.region?.name ?? ''}, ${
                      item?.district?.name ?? ''
                    }`,
                    rating: item.avg_rating,
                    phone: item?.phone_number,
                    mail: item?.email,
                    slug: item?.id,
                    age: item.age,
                    imgBorder: true,
                    hours: item.total_hours,
                    dots: !!$route.query.events_slug,
                    loading: loading,
                  }"
                />
              </div>
              <v-pagination
                v-model="page"
                class="mb-[64px]"
                :length="volunteersList.total_pages"
              />
            </div>
            <NotFound v-else :title="title" :subtitle="subtitle" />
          </div>
        </Preloader>
      </div>
      <div class="col-span-3 b:col-span-12 mb-[20px] pl-[24px] b:pl-[0px]">
        <Filters
          volunteer-type
          v-bind="{ age: true, direction: false, errorEndAge }"
          class="mb-[20px]"
          @selectCountries="selectRegion"
          @selectdistrict="selectDistrict"
          @startDate="age1"
          @endDate="age2"
          @sendResult="sendResult"
          @resetResult="resetResult"
          @typeVolunteerChange="typeVolunteerChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VolunteerItemCard from '../../components/cards/VolunteerItemCard.vue'
import Filters from '../../components/sidebar/Filters.vue'
import Search from '~/components/Search.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import NotFound from '~/components/notFound.vue'

export default {
  layout: 'pages',
  components: {
    VolunteerItemCard,
    BreadCrumbs,
    Search,
    Filters,
    NotFound,
  },
  async fetch() {
    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        page: 1,
        search: this.searchResult,
        districtRegion: this.selectedRegion,
        district: this.selectedDistrict,
        ageGt: this.minAge,
        ageLt: this.maxAge,
        volunteerforeventEventSlug: this.$route.query.events_slug,
      })
      .catch((err) => console.log(err))
  },
  data() {
    return {
      page: 1,
      selectedRegion: '',
      selectedDistrict: '',
      searchResult: '',
      minAge: '',
      maxAge: '',
      loading: false,
      title: this.$t('no_eventer'),
      subtitle: this.$t('active_eventer'),
      typeVolunteer: '',
    }
  },
  computed: {
    ...mapState({
      volunteersList: (state) => state.volunteers.volunteersList,
    }),
    // isRangeValid() {
    //   return !this.minAge && !this.maxAge ? true : +this.minAge < +this.maxAge
    // },
    errorEndAge() {
      if (!this.maxAge) return false
      return +this.maxAge < +this.minAge
    },
  },
  watch: {
    async page(item, item1) {
      await this.$store
        .dispatch('volunteers/fetchVolunteersList', {
          page: item,
          search: this.searchResult,
          districtRegion: this.selectedRegion,
          district: this.selectedDistrict,
          ageGt: this.minAge,
          ageLt: this.maxAge,
        })
        .catch((err) => console.log(err))
    },
  },
  methods: {
    async searchInput(e) {
      this.searchResult = e
      if (this.searchResult.length > 0) {
        await this.$store
          .dispatch('volunteers/fetchVolunteersList', {
            search: this.searchResult,
            districtRegion: this.selectedRegion,
            district: this.selectedDistrict,
            ageGt: this.minAge,
            ageLt: this.maxAge,
          })
          .catch((err) => console.log(err))
      }
    },
    selectRegion(e) {
      this.selectedRegion = e
      this.selectedDistrict = null
    },
    selectDistrict(e) {
      this.selectedDistrict = e
    },
    age1(e) {
      this.minAge = e
    },
    age2(e) {
      this.maxAge = e
    },
    typeVolunteerChange(e) {
      this.typeVolunteer = e
    },
    async sendResult() {
      if (!this.errorEndAge) {
        this.loading = true
        await this.$store
          .dispatch('volunteers/fetchVolunteersList', {
            search: this.searchResult,
            districtRegion: this.selectedRegion,
            district: this.selectedDistrict,
            ageGt: this.minAge,
            ageLt: this.maxAge,
            volunteerforeventEventSlug: this.$route.query.events_slug,
            volunteerType: this.typeVolunteer,
          })
          .catch((err) => console.log(err))
          .finally(() => {
            this.loading = false
          })
      }
    },
    async resetResult() {
      this.searchResult = ''
      this.district__region = ''
      this.district = ''
      this.age_gt = ''
      this.age_lt = ''
      await this.$store
        .dispatch('volunteers/fetchVolunteersList', {
          search: '',
          districtRegion: '',
          district: '',
          ageGt: '',
          ageLt: '',
          volunteerforeventEventSlug: this.$route.query.events_slug,
          volunteer_type: '',
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>
