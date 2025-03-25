<template>
  <div class="container !my-[32px]">
    <div v-if="quote" class="quotetion">
      <icon-base class="_left" name="quotes" />
      {{ quote }}
      <icon-base class="_right" name="quotes" />
    </div>
    <div class="grid grid-cols-12 gap-[24px]">
      <div class="col-span-4 b:col-span-12">
        <navigation />
      </div>
      <div class="col-span-8 b:col-span-12">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>
<script>
import IconBase from '~/components/volontyor/IconBase.vue'
import Navigation from '~/components/profile/Navigation.vue'

export default {
  middleware: ['auth'],
  layout: 'pages',
  components: { IconBase, Navigation },
  async fetch() {
    await this.$getAction('/quote/').then((response) => {
      this.quote = response.title
    })
  },
  data() {
    return {
      quote: '',
    }
  },
}
</script>
