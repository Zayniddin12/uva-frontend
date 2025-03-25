<template>
  <div
    class="main-tooltip -z-1 absolute bottom-full left-1/2 -translate-x-1/2 transition-all duration-300 -z-1"
    :class="[
      show && withTrigger
        ? '-translate-y-4 visible opacity-100'
        : 'invisible opacity-0 translate-y-0',
      {
        'group-hover:visible group-hover:opacity-100 group-hover:-translate-y-4': !withTrigger,
      },
    ]"
  >
    <div class="tooltip">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  defineEmits: ['hide'],
  props: {
    show: Boolean,
    withTrigger: Boolean,
    timeout: {
      type: [Number, Boolean],
      default: 2000,
    },
  },
  watch: {
    show(value) {
      if (value && this.timeout !== false) {
        setTimeout(() => {
          this.$emit('hide')
        }, this.timeout)
      }
    },
  },
  mounted() {},
}
</script>

<style scoped>
.main-tooltip {
  position: absolute;
  transition: all 0.3s;
  bottom: 0;
  top: 30px;
  transform: translate(-50%);
  left: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.tooltip {
  width: 140px;
  height: 48px;
  box-shadow: 0 25px 5px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  border: 1px solid #fff;
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -8px;
  left: 50%;
  transform: translate(-50%, -1px) rotate(0deg);
  width: 20px;
  height: 9px;
  background: white;
  border: none;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
</style>
