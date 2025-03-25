<template>
  <div class="rounded-lg p-[16px] soc-vol flex items-center gap-[12px]">
    <img src="/icons/social-volunteer-logo.svg" alt="logo" />
    <div class="flex flex-col">
      <span class="text-xs text-white">{{ title }}</span>
      <span class="text-white font-bold text-sm">«{{ subtitle }}»</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.soc-vol {
  background: linear-gradient(90deg, #517f4d 1.19%, #669961 99.87%);
  box-shadow: 0 8px 24px 0 rgba(100, 151, 95, 0.8);
}
</style>
