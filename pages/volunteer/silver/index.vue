<template>
  <div class="container">
    <BreadCrumbs :links="links" />
    <h1 class="aboutp__title !mb-[24px]">
      {{ $t('silver_volunteers') }}
    </h1>
    <Preloader
      :fetch-state="$fetchState"
      :data="silverVolunteersList.volunteers"
    >
      <div class="grid grid-cols-3 b:grid-cols-2 e:grid-cols-1 gap-[24px] mb-8">
        <LevelCard
          v-for="item in silverVolunteersList.volunteers"
          :key="item.id"
          type="silver"
          :data="item"
          class="border-none shadow-level-shadow"
        />
      </div>
    </Preloader>
    <v-pagination
      v-if="silverVolunteersList.total_pages > 1"
      v-model="page"
      class="mb-[64px]"
      :length="silverVolunteersList.total_pages"
    ></v-pagination>
  </div>
</template>

<script>
import Preloader from '@/components/Preloader.vue'
import BreadCrumbs from '~/components/BreadCrumbs'
import LevelCard from '~/components/volontyor/Cards/LevelCard'
export default {
  name: 'Platinum',
  components: {
    Preloader,
    BreadCrumbs,
    LevelCard,
  },
  async fetch() {
    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 2,
        page: this.page,
        size: 12,
      })
      .then((res) => {
        this.silverVolunteersList = res.data
      })
  },
  data() {
    return {
      page: 1,
      silverVolunteersList: [],
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('breadsil'),
          url: ``,
        },
      ]
    },
  },
  watch: {
    async page(item) {
      await this.$store
        .dispatch('volunteers/fetchVolunteersList', {
          page: item,
          status: 2,
          size: 12,
        })
        .then((response) => {
          this.silverVolunteersList = response.data
        })
    },
  },
}
</script>
