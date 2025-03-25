<template>
  <div>
    <BreadCrumbs :links="links" />
    <div
      class="initiative grid grid-cols-12 container b:flex b:flex-col-reverse items-start b:items-stretch mb-[64px] !pb-[32px]"
    >
      <div class="initiative__cards col-span-9 b:col-span-12 grid">
        <p
          class="font-bold text-[32px] f:text-[24px] g:text-[18px] leading-[44px] text-[#2C2D33]"
        >
          {{ $t('initiative_groups') }}
        </p>
        <Search class="mb-[24px]" @search="searchInput" />
        <Preloader :fetch-state="$fetchState" :data="groupList.results">
          <div>
            <div class="grid gap-[24px] mb-[32px]">
              <InitiativeGroupsCard
                v-for="(item, index) in groupList.results"
                :key="index"
                v-bind="{
                  title: item.organization_name,
                  imgLink: item.default_photo,
                  slug: item.id,
                  address: item.region.name + ', ' + item.district.name,
                  phoneNumber: item.phone_number,
                  volunteerCount: item.number_volunteers,
                  youtubeLink: item.youtube,
                  telegramLink: item.telegram,
                  facebookLink: item.facebook,
                  instagramLink: item.instagram,
                  description: item.about,
                  isJoined: item.is_joined,
                }"
              />
            </div>
            <v-pagination
              v-if="groupList.total_pages > 1"
              v-model="page"
              :length="groupList.total_pages"
              :value="page"
            ></v-pagination>
          </div>
        </Preloader>
        <NotFound v-if="groupList.total === 0" />
      </div>
      <aside class="col-span-3 b:col-span-12 b:mb-[20px] pl-[24px] b:pl-[0px]">
        <Nav-side-bar />
        <Filters
          v-bind="{ hideAge: true, direction: false }"
          class="mt-[20px]"
          @selectCountries="selectRegion"
          @selectdistrict="selectDistrict"
          @sendResult="sendResult"
          @resetResult="resetResult"
        />
      </aside>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumbs from '~/components/BreadCrumbs'
import InitiativeGroupsCard from '~/components/cards/InitiativeGroupsCard.vue'
import NavSideBar from '~/components/sidebar/NavSideBar.vue'
import Search from '~/components/Search.vue'
import Filters from '~/components/sidebar/Filters.vue'
import NotFound from '~/components/notFound.vue'
export default {
  // middleware: ['auth'],
  layout: 'pages',
  components: {
    BreadCrumbs,
    InitiativeGroupsCard,
    NavSideBar,
    Search,
    Filters,
    NotFound,
  },
  async fetch() {
    await this.$store.dispatch('initiative_groups/fetchGroupList', {
      page: this.page,
    })
  },
  data() {
    return {
      page: Number(this.$route.query.page) || 1,
      selectedRegion: '',
      selectedDistrict: '',
      searchResult: '',
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('initiative_groups'),
          url: `possibilities/initiative-groups`,
        },
      ]
    },
    ...mapState({
      groupList: (state) => state.initiative_groups.groupList,
    }),
  },
  watch: {
    async page(item, item1) {
      await this.$store.dispatch('initiative_groups/fetchGroupList', {
        page: item,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$router.push({
        ...this.$route,
        query: { ...this.$route.query, page: item },
      })
    },
  },
  methods: {
    async searchInput(e) {
      this.searchResult = e
      if (this.searchResult.length > 0 || this.searchResult.length === 0) {
        await this.$store.dispatch('initiative_groups/fetchGroupList', {
          search: this.searchResult || undefined,
        })
      }
    },
    selectRegion(e) {
      this.selectedRegion = e
      this.selectedDistrict = null
    },
    selectDistrict(e) {
      this.selectedDistrict = e
    },
    async sendResult() {
      await this.$store.dispatch('initiative_groups/fetchGroupList', {
        search: this.searchResult,
        districtRegion: this.selectedRegion,
        district: this.selectedDistrict,
      })
    },
    async resetResult() {
      this.search = ''
      this.district__region = ''
      this.district = ''

      await this.$store.dispatch('initiative_groups/fetchGroupList', {
        search: '',
        districtRegion: '',
        district: '',
      })
    },
  },
  head() {
    return {
      title: this.$t('initiative_groups'),
    }
  },
}
</script>
