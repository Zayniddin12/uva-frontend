<template>
  <div
    class="flex flex-center rounded-[6px] bg-blue/20 gap-[8px] duration-200 group hover:bg-blue cursor-pointer px-[77px]"
    @click="$emit('shareOpen')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <circle
        cx="5.5"
        cy="11"
        r="2.75"
        stroke="#DA6B3B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="16.5"
        cy="5.5"
        r="2.75"
        stroke="#DA6B3B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="16.5"
        cy="16.5"
        r="2.75"
        stroke="#DA6B3B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.9751 9.80835L14.0251 6.69168"
        stroke="#DA6B3B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.9751 12.1917L14.0251 15.3083"
        stroke="#DA6B3B"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span
      class="py-[11px] text-blue font-semibold duration-200 text-base group-hover:text-white"
      >{{ $t('share') }}</span
    >
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.group {
  svg {
    path,
    circle {
      transition: 0.2s ease-in-out;
    }
  }
  &:hover {
    svg {
      path,
      circle {
        stroke: white;
      }
    }
  }
}
</style>
