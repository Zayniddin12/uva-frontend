<template>
  <nuxt-link
    onmousedown="return false"
    :to="localePath(`/volunteer/${data.id}`)"
    class="shadow-level-shadow rounded-2xl !flex d:!flex-col items-center gap-[16px] bg-[#FBFCFD] border border-[#EAEBED]"
    :class="
      size === 'md' ? '!p-[20px]' : size === 'sm' ? '!p-[16px]' : '!p-[24px]'
    "
  >
    <div class="relative">
      <img
        v-if="type === 'platine'"
        src="/icons/medallions-platine.svg"
        class="h-auto object-contain relative"
        :class="
          size === 'md'
            ? '!max-w-[80px]'
            : size === 'sm'
            ? 'max-w-[64px]'
            : 'max-w-[108px]'
        "
        alt="platine-medal"
      />
      <img
        v-if="type === 'gold'"
        src="/icons/medallions-gold.svg"
        class="h-auto object-contain relative"
        :class="
          size === 'md'
            ? '!max-w-[80px]'
            : size === 'sm'
            ? 'max-w-[64px]'
            : 'max-w-[108px]'
        "
        alt="platine-medal"
      />
      <img
        v-if="type === 'silver'"
        src="/icons/medallions-silver.svg"
        class="h-auto object-contain relative"
        :class="
          size === 'md'
            ? '!max-w-[80px]'
            : size === 'sm'
            ? 'max-w-[64px]'
            : 'max-w-[108px]'
        "
        alt="platine-medal"
      />
      <img
        class="max-w-[58px] max-h-[58px] w-full h-full object-cover absolute top-[25px] rounded-full"
        :class="
          size === 'md'
            ? '!max-w-[43px] !max-h-[43px] left-[19px] !top-[18px]'
            : size === 'sm'
            ? 'max-w-[35px] !max-h-[35px] left-[14.5px] !top-[15px]'
            : 'max-w-[58px] max-h-[58px] left-[25px]'
        "
        :src="data.photo || data.default_photo"
        alt="img-volunter"
      />
    </div>
    <div class="flex flex-col">
      <h4
        :class="customClass"
        class="text-[#2C2D33] font-bold text-sm d:text-center leading-[19px]"
      >
        {{ data.first_name + ' ' + data.last_name }}
      </h4>
      <div class="flex items-center mt-[10px] d:!justify-center">
        <icon-base class="icon mr-[4px]" name="location-gray" />
        <h6
          v-if="data.region"
          class="text-[#2C2D33] text-normal text-sm leading-[130%]"
        >
          {{ data.region.name }}
        </h6>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import IconBase from '~/components/IconBase'
export default {
  name: 'PlatineCard',
  components: {
    IconBase,
  },
  props: {
    customClass: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'lg',
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.shadow-level-shadow {
  transition: all ease 0.3s;
  border: 1px solid rgba(44, 45, 51, 0.08);
  &:hover {
    border: 1px solid #da6b3b;
  }
}
@media (max-width: 500px) {
  .shadow-level-shadow {
    width: 190px !important;
  }
}
</style>
