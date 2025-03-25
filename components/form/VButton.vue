<template>
  <button :disabled="disabled" :type="type" class="h-[42px]" @click="clicked">
    <icon-base v-if="loading" name="rolling" />
    <span v-else> {{ text }} </span>
  </button>
</template>
<script>
import IconBase from '~/components/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    text: {
      type: String,
      default: 'Button',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    clicked() {
      this.$emit('click')
    },
  },
}
</script>
