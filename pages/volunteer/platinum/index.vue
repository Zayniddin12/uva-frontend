<template>
  <div class="container">
    <BreadCrumbs :links="links" />
    <h1 class="aboutp__title !mb-[24px]">
      {{ $t('platine_volunteers') }}
    </h1>
    <Preloader :fetch-state="$fetchState" :data="platinumVolunteersList">
      <div class="grid grid-cols-3 b:grid-cols-2 e:grid-cols-1 gap-[24px] mb-8">
        <LevelCard
          v-for="item in platinumVolunteersList"
          :key="item.id"
          class="border-none shadow-level-shadow"
          type="platine"
          :data="item"
        />
      </div>
    </Preloader>
    <v-pagination
      v-if="platinumVolunteersList.total_pages > 1"
      v-model="page"
      class="mb-[64px]"
      :length="platinumVolunteersList.total_pages"
    ></v-pagination>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/BreadCrumbs'
import LevelCard from '~/components/volontyor/Cards/LevelCard'
export default {
  name: 'Platinum',
  components: {
    BreadCrumbs,
    LevelCard,
  },
  async fetch() {
    await this.$store
      .dispatch('volunteers/fetchVolunteersList', {
        status: 4,
        size: 12,
      })
      .then((res) => {
        this.platinumVolunteersList = res.data.results
      })
  },
  data() {
    return {
      platinumVolunteersList: [],
      page: 1,
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('breadplat'),
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
          status: 4,
          size: 12,
        })
        .then((response) => {
          this.platinumVolunteersList = res.data.results
        })
    },
  },
}
</script>
