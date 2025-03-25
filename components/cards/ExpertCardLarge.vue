<template>
  <NuxtLink
    v-if="item"
    :to="localePath(`/experts/${item.id}`)"
    class="relative expert-card-large h-full flex flex-col justify-end p-[8px] group cursor-pointer"
    :style="`background-image: url(${item.image});aspect-ratio: 3/4;`"
  >
    <div
      class="bg-white group-hover:bg-[#52230F] p-[12px] rounded-[12px] text-center duration-200 ease-in-out"
    >
      <h1
        class="relative z-[1] text-[#52230F] font-semibold transition-all duration-200 ease-in-out leading-[22px] group-hover:text-white"
      >
        {{ item.full_name }}
      </h1>
      <p
        class="text-[#90A1B5] text-[14px] leading-[19px] mt-[4px] !mb-[0] duration-200 ease-in-out"
      >
        {{ item.profession }}
      </p>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'ExpertCardLarge',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped>
.expert-card-large {
  position: relative;
  background-position: top;
  background-size: cover;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid rgba(15, 40, 82, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
}
</style>
