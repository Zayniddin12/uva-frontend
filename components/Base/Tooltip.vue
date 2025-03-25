<template>
  <div
    :class="[
      classStyle,
      show
        ? 'visible opacity-100 !translate-y-[-25%] z-[1]'
        : 'invisible opacity-0',
    ]"
    class="absolute font-semibold flex-shrink-0 w-[120px] flex-center z-20 bottom-full translate-y-0 left-[50%] translate-x-[-50%] group-hover/tooltip:translate-y-[-33%] px-[8px] py-[6px] bg-gray-100 text-black text-sm leading-130 rounded-lg border border-black text-center transition-all duration-300 group-hover/tooltip:visible group-hover/tooltip:!opacity-100"
  >
    <span class="flex-shrink-0">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    classStyle: {
      type: String,
      default: '',
    },
  },
}
</script>
