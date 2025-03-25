<template>
  <div class="container">
    <BreadCrumbs :links="links" />
    <h1 class="aboutp__title !mb-[24px]">
      {{ $t('gold_volunteers') }}
    </h1>
    <Preloader :fetch-state="$fetchState" :data="goldVolunteersList">
      <div class="grid grid-cols-3 b:grid-cols-2 e:grid-cols-1 gap-[24px] mb-8">
        <LevelCard
          v-for="item in goldVolunteersList"
          :key="item.id"
          type="gold"
          :data="item"
          class="border-none shadow-level-shadow"
        />
      </div>
    </Preloader>
    <v-pagination
      v-if="goldVolunteersList.total_pages > 1"
      v-model="page"
      class="mb-[64px]"
      :length="goldVolunteersList.total_pages"
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
        status: 3,
        size: 12,
      })
      .then((res) => {
        this.goldVolunteersList = res.data.volunteers
      })
  },
  data() {
    return {
      goldVolunteersList: [],
      page: 1,
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('breadgold'),
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
          status: 3,
          size: 12,
        })
        .then((response) => {
          this.goldVolunteersList = response.data
        })
    },
  },
}
</script>
