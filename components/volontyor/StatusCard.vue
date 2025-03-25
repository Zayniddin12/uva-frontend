<template>
  <div
    class="inline-flex items-center space-x-[6px] bg-violet/[10%] px-[8px] py-[4px]"
  >
    <icon-base :name="checkStatus.icon" class="status-icon w-[20px] h-[20px]" />
    <span class="text-black text-sm font-semibold leading-19">{{
      $t(checkStatus.name)
    }}</span>
  </div>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
  },
  props: {
    status: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    checkStatus() {
      if (this.status === 4) {
        return {
          name: 'platine_name',
          icon: 'medallion-platine',
        }
      } else if (this.status === 3) {
        return {
          name: 'gold_name',
          icon: 'medallion-gold',
        }
      } else {
        return {
          name: this.$t('silver_name'),
          icon: 'medallion-silver',
        }
      }
    },
  },
}
</script>
<style>
.status-icon > svg {
  width: 100%;
  height: 100%;
}
</style>
