<template>
  <div
    class="flex flex-center rounded-[6px] bg-blue gap-[8px] duration-200 group hover:bg-blue/20 cursor-pointer px-[61px] whitespace-nowrap"
    @click="$emit('open-rate')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.15877 2.14329C9.55235 1.53052 10.448 1.53052 10.8416 2.14329L12.9147 5.37089C13.0501 5.58173 13.2597 5.73404 13.5021 5.79768L17.2123 6.77193C17.9167 6.95689 18.1935 7.80868 17.7323 8.37235L15.3033 11.3414C15.1447 11.5353 15.0646 11.7818 15.079 12.0319L15.2989 15.8616C15.3407 16.5887 14.6161 17.1152 13.9375 16.8508L10.3632 15.4581C10.1297 15.3671 9.8706 15.3671 9.63712 15.4581L6.0628 16.8508C5.38422 17.1152 4.65965 16.5887 4.70141 15.8616L4.92137 12.0319C4.93574 11.7818 4.85566 11.5353 4.697 11.3414L2.26798 8.37235C1.80684 7.80868 2.0836 6.95689 2.78799 6.77193L6.49825 5.79768C6.74061 5.73404 6.95025 5.58173 7.08567 5.37089L9.15877 2.14329Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span
      class="py-[11px] text-white font-semibold duration-200 text-base group-hover:text-blue"
      >{{ $t('feedback') }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.group {
  svg {
    path {
      transition: 0.2s ease-in-out;
    }
  }
  &:hover {
    svg {
      path {
        stroke: #da6b3b;
      }
    }
  }
}
</style>
<script setup></script>
