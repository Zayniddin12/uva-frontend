<template>
  <NuxtLink
    v-if="item"
    :to="localePath(`/experts/${item.id}`)"
    class="relative expert-card h-full flex flex-col justify-end p-[12px] group cursor-pointer"
    :style="`background-image: url('${item.image}')`"
  >
    <h1
      class="relative z-[1] text-white font-bold transition-all duration-300 opacity-0 group-hover:opacity-100"
      :class="small ? 'text-[12px] leading-4' : 'leading-[27px] text-[20px]'"
    >
      {{ item.full_name }}
    </h1>
    <span
      class="overlay transition-all duration-300 opacity-0 group-hover:opacity-100"
    />
  </NuxtLink>
</template>

<script>
export default {
  name: 'ExpertCard',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.overlay {
  background: linear-gradient(
    180deg,
    rgba(218, 107, 59, 0) 0%,
    rgba(218, 107, 59, 0.2) 58.85%,
    rgba(218, 107, 59, 0.8) 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.expert-card {
  position: relative;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #f0f4f7;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
}
</style>
