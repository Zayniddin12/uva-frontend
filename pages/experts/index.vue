<template>
  <div class="container !pb-[64px]">
    <BreadCrumbs :links="links" />
    <h1 class="aboutp__title !mb-[24px]">
      {{ $t('goodwill_ambassadors_experts') }}
    </h1>
    <transition name="fade" mode="out-in">
      <div
        :key="page"
        class="grid j:grid-cols-1 f:grid-cols-2 c:grid-cols-3 grid-cols-4 gap-[24px]"
      >
        <ExpertCardLarge
          v-for="(item, index) in experts"
          :key="index"
          v-bind="{ item }"
        />
      </div>
    </transition>
    <v-pagination
      v-if="totalExperts / limit > 1"
      v-model="page"
      :value="page"
      :length="totalPages"
      class="mt-[32px]"
    ></v-pagination>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/volontyor/BreadCrumbs.vue'
import ExpertCardLarge from '~/components/cards/ExpertCardLarge.vue'

export default {
  layout: 'pages',
  name: 'Experts',
  components: { ExpertCardLarge, BreadCrumbs },
  async fetch() {
    await this.fetchExperts()
  },
  data() {
    return {
      page: +this.$route.query.page || 1,
      totalExperts: 1,
      limit: 12,
      links: [
        {
          title: this.$t('goodwill_ambassadors_experts'),
          url: 'experts',
        },
      ],
      experts: [
        {
          id: 1,
          photo: '1',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '2',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '3',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '4',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '5',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '6',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '7',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '8',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '9',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '10',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '11',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
        {
          id: 1,
          photo: '12',
          name: 'Абдуллаев Абдулла',
          position: 'Блогер',
        },
      ],
    }
  },
  computed: {
    totalPages() {
      return this.totalExperts / this.limit ===
        +(this.totalExperts / this.limit).toFixed(0)
        ? this.totalExperts / this.limit
        : +(this.totalExperts / this.limit).toFixed(0) + 1
    },
  },
  watch: {
    page(newValue) {
      this.$router.push({ query: { page: newValue } })
      this.fetchExperts()
    },
  },
  methods: {
    fetchExperts() {
      this.$getAction('/experts/', {
        params: { limit: this.limit, offset: this.limit * (this.page - 1) },
      }).then((response) => {
        this.experts = response.results
        this.totalExperts = response.count
      })
    },
  },
}
</script>
