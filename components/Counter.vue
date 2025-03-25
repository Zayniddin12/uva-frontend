<template>
  <div id="countdown" class="relative h-10 min-w-[40px] text-center">
    <!--
      Todo Background color design conflict
    -->
    <div id="countdown-number" class="inline-block leading-[40px]">
      {{ number }}
    </div>
    <svg>
      <circle r="18" cx="20" cy="20" />
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 120,
    }
  },
  watch: {
    number: {
      handler() {
        const timer = setTimeout(() => {
          if (this.number > 0) {
            this.number--
          } else {
            this.$emit('finished')
            clearInterval(timer)
          }
        }, 1000)
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
#countdown-number {
  @apply text-blue-600;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #db490b;
  fill: none;
  animation: countdown 60s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>
