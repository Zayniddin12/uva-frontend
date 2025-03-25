<template>
  <div
    class="w-full group border border-transparent rounded-[6px] p-[10px] pl-[12px] bg-[#90A1B51F] flex-between gap-[16px] relative max-w-[342px] cursor-pointer duration-300 hover:border-gray-400 hover:bg-white"
    @click="copy(link)"
  >
    <span class="truncate text-base font-semibold leading-130 text-dark">
      {{ link }}
    </span>
    <button
      class="w-[24px] h-[24px] flex-center relative shrink-0 text-gray-1 text-xl leading-5 transition-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="8"
          y="8"
          width="12"
          height="12"
          rx="2"
          stroke="#90A1B5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16 8V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H8"
          stroke="#90A1B5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <Tooltip v-bind="{ show }">
        <span>{{ $t('copied') }}</span>
      </Tooltip>
    </button>
  </div>
</template>

<script>
import Tooltip from '@/components/Base/Tooltip.vue'

export default {
  components: { Tooltip },
  data() {
    return {
      link: window?.location?.href || '',
      show: false,
    }
  },
  methods: {
    copy(text) {
      const input = document.createElement('input')
      input.value = text
      document.body.appendChild(input)

      input.select()
      document.execCommand('copy')

      document.body.removeChild(input)

      this.show = true

      setTimeout(() => {
        this.show = false
      }, 1500)
    },
  },
}
</script>
