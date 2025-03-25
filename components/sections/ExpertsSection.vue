<template>
  <div v-if="experts && experts.length" class="container py-15">
    <SectionTitle
      class="mb-8"
      v-bind="{
        title: $t('goodwill_ambassadors_experts'),
        link: $t('all_ambassadors_experts'),
        linkUrl:
          '/' + ($i18n.locale === 'uz' ? '' : $i18n.locale + '/') + 'experts',
      }"
    />
    <div class="layout-grid-experts">
      <ExpertCard
        v-for="(item, index) in experts"
        :key="index"
        v-bind="{ item }"
        :small="index === 1 || index === 2 || index === 9 || index === 10"
        :class="`expert-div div${index + 1}`"
      />
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/volontyor/SectionTitle.vue'
import ExpertCard from '~/components/cards/ExpertCard.vue'

export default {
  name: 'ExpertsSection',
  components: { ExpertCard, SectionTitle },
  async fetch() {
    await this.$getAction('/experts/', { params: { limit: 12 } })
      .then((response) => {
        // this.$store.commit('home/setMainPageData', response)/
        this.experts = response.results
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data() {
    return {
      experts: [],
    }
  },
}
</script>

<style>
@media screen and (min-width: 768px) {
  .layout-grid-experts {
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    grid-template-rows: repeat(7, 74px);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
  }
  .div1 {
    grid-area: 1 / 1 / 5 / 5;
  }
  .div2 {
    grid-area: 1 / 5 / 3 / 7;
  }
  .div3 {
    grid-area: 1 / 7 / 3 / 9;
  }
  .div4 {
    grid-area: 3 / 5 / 5 / 9;
  }
  .div5 {
    grid-area: 5 / 1 / 8 / 4;
  }
  .div6 {
    grid-area: 5 / 4 / 8 / 9;
  }
  .div7 {
    grid-area: 1 / 9 / 4 / 14;
  }
  .div8 {
    grid-area: 1 / 14 / 4 / 17;
  }
  .div9 {
    grid-area: 4 / 9 / 8 / 13;
  }
  .div10 {
    grid-area: 4 / 13 / 6 / 15;
  }
  .div11 {
    grid-area: 4 / 15 / 6 / 17;
  }
  .div12 {
    grid-area: 6 / 13 / 8 / 17;
  }
}
@media (min-width: 640px) and (max-width: 768px) {
  .layout-grid-experts {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(14, 74px);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
  }

  .div1 {
    grid-area: 1 / 1 / 5 / 5;
  }
  .div2 {
    grid-area: 1 / 5 / 3 / 7;
  }
  .div3 {
    grid-area: 1 / 7 / 3 / 9;
  }
  .div4 {
    grid-area: 3 / 5 / 5 / 9;
  }
  .div5 {
    grid-area: 5 / 1 / 8 / 4;
  }
  .div6 {
    grid-area: 5 / 4 / 8 / 9;
  }
  .div7 {
    grid-area: 8 / 1 / 11 / 6;
  }
  .div8 {
    grid-area: 8 / 6 / 11 / 9;
  }
  .div9 {
    grid-area: 11 / 1 / 15 / 5;
  }
  .div10 {
    grid-area: 11 / 5 / 13 / 7;
  }
  .div11 {
    grid-area: 11 / 7 / 13 / 9;
  }
  .div12 {
    grid-area: 13 / 5 / 15 / 9;
  }
}
@media (max-width: 640px) {
  .layout-grid-experts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 220px);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
  }
}
</style>
