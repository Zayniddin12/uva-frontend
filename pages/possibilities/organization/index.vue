<template>
  <div class="main-bg">
    <bread-crumbs :links="links" />
    <main
      class="grid grid-cols-12 container b:flex b:flex-col-reverse items-start b:items-stretch !pb-[32px] mb-[64px]"
    >
      <section
        v-if="organizationList && organizationList.results"
        class="initiative__cards col-span-9 b:col-span-12 grid"
      >
        <!--        {{organizationList}}-->
        <p
          class="font-bold text-[32px] f:text-[24px] g:text-[18px] leading-[44px] text-[#2C2D33]"
        >
          {{ $t('organizations') }}
        </p>
        <Search class="mb-[24px]" @search="searchInput" />
        <Preloader :fetch-state="$fetchState" :data="organizationList.results">
          <div class="">
            <nuxt-link
              v-for="(item, index) in organizationList.results"
              :key="index"
              :to="localePath(`/possibilities/organization/${item.id}`)"
              class="initiative-card p-[20px] mb-[24px] group"
            >
              <div class="top grid grid-cols-4 mb-[8px]">
                <div
                  class="left-side col-span-3 c:col-span-4 c:mb-[15px] flex items-center g:flex-col g:items-start"
                >
                  <div
                    v-if="item.photo"
                    class="image-box shrink-0 mr-[12px] g:mb-[12px]"
                  >
                    <img :src="item.photo" :alt="item.organization_name" />
                  </div>
                  <div v-else class="image-box shrink-0 mr-[12px] g:mb-[12px]">
                    <img
                      src="~/assets/volontyor/not-image.png"
                      :alt="item.organization_name"
                    />
                  </div>
                  <div class="top__texts">
                    <h5 class="title">
                      <client-only>
                        <nuxt-link
                          class="group-hover:!text-blue"
                          :to="
                            localePath(`/possibilities/organization/${item.id}`)
                          "
                        >
                          {{ item.organization_name }}
                        </nuxt-link>
                      </client-only>
                    </h5>
                    <div
                      class="flex address items-center b:items-start shrink-0"
                    >
                      <span
                        v-if="item.district && item.region"
                        class="flex items-center"
                      >
                        <icon-base class="icon mr-[6px]" name="location-icon" />
                        <div class="address__region flex items-center">
                          <p>{{ item.district.name }},</p>
                          <p>{{ item.region.name }}</p>
                        </div>
                      </span>
                      <client-only>
                        <el-divider
                          v-if="item.district && item.region"
                          class="vertical-divider"
                          direction="vertical"
                        ></el-divider>
                      </client-only>
                      <span
                        v-if="item.phone"
                        class="flex address__phone items-center shrink-0"
                      >
                        <icon-base class="icon mr-[6px]" name="Calling" />
                        <p>
                          {{
                            ('+998' + item.phone) | VMask('+998 (##) ###-##-##')
                          }}
                        </p>
                      </span>
                      <client-only>
                        <el-divider
                          v-if="item.phone"
                          class="vertical-divider"
                          direction="vertical"
                        ></el-divider>
                      </client-only>
                      <span
                        v-if="item.email"
                        class="flex items-center b:mt-[5px]"
                      >
                        <icon-base class="icon mr-[6px]" name="email" />
                        <p>
                          {{ item.email }}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    item.youtube ||
                    item.telegram ||
                    item.facebook ||
                    item.instagram
                  "
                  class="right-side socials"
                >
                  <a v-if="item.youtube" target="_blank" :href="item.youtube">
                    <icon-base name="youtube" class="icon" />
                  </a>
                  <a v-if="item.telegram" target="_blank" :href="item.telegram">
                    <icon-base name="tg" class="icon" />
                  </a>
                  <a v-if="item.facebook" target="_blank" :href="item.facebook">
                    <icon-base name="fb" class="icon" />
                  </a>
                  <a
                    v-if="item.instagram"
                    target="_blank"
                    :href="item.instagram"
                  >
                    <icon-base name="insta" class="icon" />
                  </a>
                </div>
              </div>
              <div class="initiative-info mt-[20px]">
                <p>{{ item.about }}</p>
              </div>
            </nuxt-link>
            <v-pagination
              v-if="organizationList.total_pages > 1"
              v-model="page"
              :value="page"
              :length="organizationList.total_pages"
            ></v-pagination>
          </div>
        </Preloader>
        <NotFound
          v-if="organizationList.total === 0"
          :title="title"
          :subtitle="subtitle"
        />
      </section>
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
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumbs from '../../../components/volontyor/BreadCrumbs.vue'
import Search from '../../../components/volontyor/Search.vue'
import NavSideBar from '~/components/sidebar/NavSideBar.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
import Filters from '~/components/sidebar/Filters.vue'
import NotFound from '~/components/notFound.vue'

export default {
  // middleware: ["auth"],
  layout: 'pages',
  components: {
    BreadCrumbs,
    Search,
    NavSideBar,
    IconBase,
    Filters,
    NotFound,
  },
  async fetch() {
    await this.$store.dispatch('organization/fetOrganizationList', {
      page: this.page,
    })
  },
  data() {
    return {
      joinGroup: false,
      imgLink: 'https://picsum.photos/200/500',
      address: 'Андижанская область, г.Асака',
      youtubeLink: 'nimadur',
      telegramLink: 'nimadur',
      facebookLink: 'nimadur',
      instagramLink: 'nimadur',
      phoneNumber: '+998 (71) 211-40-44',
      slug: 'slug',
      page: Number(this.$route.query.page) || 1,
      title: this.$t('no_orgzinazation'),
      subtitle: this.$t(''),
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('inter_organ'),
          url: `possibilities/organization`,
        },
      ]
    },
    ...mapState({
      organizationList: (state) => state.organization.organizationList,
    }),
  },
  watch: {
    async page(item, item1) {
      await this.$store.dispatch('organization/fetOrganizationList', {
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
        await this.$store.dispatch('organization/fetOrganizationList', {
          search: this.searchResult,
          districtRegion: this.selectedRegion,
          district: this.selectedDistrict,
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
      await this.$store.dispatch('organization/fetOrganizationList', {
        search: this.searchResult,
        region: this.selectedRegion,
        district: this.selectedDistrict,
      })
    },
    async resetResult() {
      this.searchResult = ''
      this.selectedRegion = undefined
      this.selectedDistrict = undefined
      await this.$store.dispatch('organization/fetOrganizationList', {
        search: '',
        region: undefined,
        district: undefined,
      })
    },
  },
  head() {
    return {
      title: this.$t('organizations'),
    }
  },
}
</script>
