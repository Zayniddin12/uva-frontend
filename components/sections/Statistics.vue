<template>
  <div
    class="container statistics grid grid-cols-3 b:grid-cols-2 e:grid-cols-1 mb-[24px] pointer-events-nonemain-event f:flex f:flex-col"
  >
    <div class="statistics__card pointer-events-none">
      <icon-base name="hearts" class="icon" />
      <h5>{{ $n(numbers.number_all_volunteers) }}</h5>
      <p>{{ $t('volunteerss') }}</p>
    </div>
    <div class="statistics__card pointer-events-none">
      <icon-base name="organizations" class="icon" />
      <h5>{{ $n(numbers.number_all_organizations) }}</h5>
      <p>{{ $t('organizations') }}</p>
    </div>
    <div class="statistics__card pointer-events-none">
      <icon-base name="projects-icon" class="icon" />
      <h5>{{ $n(numbers.number_events) }}</h5>
      <p>{{ $t('projects') }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
  },
  computed: {
    ...mapState({
      numbers: (state) => state.home.numbers,
    }),
  },
}
</script>
