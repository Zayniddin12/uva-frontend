<template>
  <div>
    <div
      v-if="
        (fetchState.error ||
        // eslint-disable-next-line
        (Array.isArray(this.data) ? !this.data.length : !this.data)
          ? true
          : '') && !fetchState.pending
      "
    >
      <slot name="error"><not-found /></slot>
    </div>
    <div
      v-else
      class="_loader"
      :class="{
        _active: (fetchState.pending && !fetchState.error) || buildLoading,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import notFound from './notFound.vue'

export default {
  components: { notFound },
  props: {
    fetchState: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      buildLoading: true,
    }
  },
  beforeCreate() {
    this.buildLoading = true
  },
  mounted() {
    this.buildLoading = false
  },
}
</script>

<style lang="scss">
._loader {
  transition: all 0.3s;
  &::before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    background: url('@/static/icons/loading.svg') 0 0 no-repeat, white;
    background-position: center;
    background-size: 100px;
    z-index: 1001;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }
  &._active {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    overflow: hidden;
    z-index: 1000;
    transition: all 0.3s;
    &::before {
      opacity: 1;
      visibility: visible;
      transition: all 0.3s;
    }
  }
}
</style>
