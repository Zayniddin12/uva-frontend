<template>
  <div>
    <div class="container">
      <section-title
        class="mt-[28px]"
        v-bind="{
          title: this.$t('public_offer'),
        }"
      />
      <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-9 c:col-span-12">
          <div class="public-content">
            <p>
              {{ $t('offer1_1') }}<br />
              {{ $t('offer1_2') }} <br />
              {{ $t('offer1_3') }}
            </p>
            <h6>{{ $t('offer2') }}</h6>
            <p>
              {{ $t('offer2_1') }}<br />
              {{ $t('offer2_2') }} <br />
              {{ $t('offer2_3') }}
            </p>
          </div>
        </div>
        <sidebar class="c:hidden" />
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from '~/components/layout/Sidebar.vue'
import SectionTitle from '~/components/SectionTitle.vue'

export default {
  layout: 'pages',
  components: { SectionTitle, Sidebar },
  data() {
    return {
      single: null,
    }
  },
}
</script>
