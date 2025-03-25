<template>
  <div class="relative">
    <div
      v-if="fetchState.error || fetchState.pending || forceLoading"
      class="relative min-h-full w-full flex items-center justify-center"
    >
      <slot name="error relative h-full w-full">
        <span class="spinner"></span>
      </slot>
    </div>
    <div
      v-else-if="(!fetchState.error || !fetchState.pending) && !forceLoading"
      class="_loader relative"
      :class="{
        _active:
          (fetchState.pending && !fetchState.error && !forceLoading) ||
          buildLoading,
      }"
    >
      <slot>
        <span class="spinner"></span>
      </slot>
    </div>
  </div>
</template>

<script>
// import notFound from './notFound.vue'

// Need refactor this stupid code
export default {
  // components: { notFound },
  props: {
    fetchState: {
      type: Object,
      default: () => {},
      loading: Object,
    },
    data: {
      type: [Array, Object],
      default: () => {},
    },
    forceLoading: {
      type: Boolean,
      default: false,
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
.spinner {
  margin-top: 250px;
  margin-bottom: 250px;
  width: 56px;
  height: 56px;
  border: 11.2px #da6b3b double;
  border-left-style: solid;
  border-radius: 50%;
  animation: spinner-aib1d7 0.75s infinite linear;
}

@keyframes spinner-aib1d7 {
  to {
    transform: rotate(360deg);
  }
}

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
