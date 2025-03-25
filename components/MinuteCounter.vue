<template>
  <div id="countdown" class="the-counter-component">
    <div
      id="countdown-number"
      :class="[
        '!flex items-center justify-center w-full h-full text-center transition-300',
        seconds > 59 ? '!text-xs' : '!text-sm',
      ]"
    >
      <span>{{ time }}</span>
    </div>
    <svg>
      <circle r="18" cx="20" cy="20" fill="#D8DDE5" class="bg-circle" />
      <circle
        r="18"
        cx="20"
        cy="20"
        :style="{
          animationName: 'CountDownAnimation',
          animationDuration: `${seconds}s`,
          animationTimingFunction: 'linear',
          animationFillMode: 'forwards',
        }"
      />
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    seconds: {
      type: Number,
      default: 60,
    },
  },

  data() {
    return {
      secondsLeft: 0,
      time: '',
    }
  },

  watch: {
    seconds() {
      this.secondsLeft = this.seconds
      this.countDown()
    },
  },

  created() {
    this.secondsLeft = this.seconds
    const interval = setInterval(() => {
      this.countDown()
      if (this.secondsLeft < 0) {
        clearInterval(interval)
        this.time = '00:00'
        this.$emit('finished')
      }
    }, 1000)
  },

  methods: {
    countDown() {
      this.secondsLeft--
      const mm = Math.floor(this.secondsLeft / 60)
      const ss = Math.floor(this.secondsLeft % 60)
      if (this.secondsLeft < 60) {
        this.time = `${ss > 9 ? ss : '0' + ss}`
      } else {
        this.time = `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
      }
    },
  },
}
</script>

<style>
.the-counter-component#countdown {
  position: relative;
  height: 40px;
  width: 40px;
  text-align: center;
}

.the-counter-component#countdown-number {
  display: inline-block;
  line-height: 40px;
  @apply text-blue-600;
}

.the-counter-component svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

.the-counter-component svg circle {
  stroke-dasharray: 113px;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-width: 3px;
  stroke: #db490b;
  fill: none;
}

.the-counter-component .bg-circle {
  stroke: #d8dde5 !important;
}

@keyframes CountDownAnimation {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 113px;
  }
}
</style>
