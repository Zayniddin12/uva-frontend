<template>
  <div>
    <bread-crumbs
      v-bind="{
        links: [
          {
            title: this.$t('volunteer_school'),
            url: `school`,
          },
          {
            title: this.$t('materials'),
            url: `school/materials`,
          },
        ],
      }"
    />
    <div class="container">
      <section-title
        class="title-b-margin"
        v-bind="{
          title: $t('materials'),
        }"
      />
      <div v-if="loading">Loading...</div>
      <div
        v-else-if="materials.results && materials.results.length"
        class="grid-list-p grid grid-cols-4 c:grid-cols-3 e:grid-cols-2 j:grid-cols-1"
      >
        <material-card
          v-for="item of materials.results"
          :key="item.id"
          :data="item"
          @dowloadClicked="$fetch"
        />
      </div>
      <div class="pagination">
        <Preloader :fetch-state="$fetchState">
          <v-pagination
            v-if="materials.total_pages > 1"
            v-model="page"
            class="mb-[64px]"
            :length="materials.total_pages"
          ></v-pagination>
        </Preloader>
      </div>
    </div>
  </div>
</template>
<script>
import MaterialCard from '../../../components/cards/MaterialCard.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
// import MaterialCard from '~/components/cards/materialCard.vue';
import SectionTitle from '~/components/SectionTitle.vue'
export default {
  layout: 'pages',
  components: { BreadCrumbs, SectionTitle, MaterialCard },
  async fetch() {
    await this.$getAction('/materials/', {
      params: { page: this.page },
    }).then((response) => {
      this.materials = response
    })
  },
  data() {
    return {
      page: 1,
      materials: [],
      loading: false,
    }
  },
  watch: {
    async page(item) {
      this.loading = true
      const response = await this.$getAction('/materials/', {
        params: { page: item },
      })
      this.materials = response
    },
  },
}
</script>
