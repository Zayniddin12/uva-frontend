<template>
  <!-- eslint-disable vue/no-v-html -->
  <i v-if="name" :class="['inline-block', itemClass]" v-html="src"></i>
  <!--eslint-enable-->
</template>

<script>
export default {
  name: 'IconBase',
  props: {
    name: {
      type: String,
      default: '',
    },
    itemClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  computed: {
    src() {
      return this.name ? require(`static/icons/${this.name}.svg?raw`) : ''
    },
  },
}
</script>
