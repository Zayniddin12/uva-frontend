<template>
  <div class="relative space-y-[8px] flex-col">
    <CLabel v-bind="{ label, forId, required, info }" />
    <slot />
  </div>
</template>

<script>
import CLabel from '@/components/new/Form/CLabel.vue'
export default {
  name: 'FormGroup',
  components: { CLabel },
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    forId: {
      type: String,
      default: 'input',
    },
    required: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
