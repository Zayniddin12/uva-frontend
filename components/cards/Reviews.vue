<template>
  <div class="w-full p-[16px] e:p-[12px] rounded-lg bg-white review">
    <div class="flex items-center gap-[10px]">
      <img
        :src="img ?? 'https://picsum.photos/300/300'"
        alt="image of reviewer"
        class="rounded-full w-[44px] h-[44px]"
      />

      <div class="flex flex-col gap-[6px]">
        <div class="flex items-center gap-[6px]">
          <span
            v-if="insonComments"
            class="text-base text-black font-bold line-clamp1"
            >Ijtimoiy himoya ({{ name }})</span
          >
          <span v-else class="text-base text-black font-bold line-clamp1">{{
            name
          }}</span>
          <div
            v-if="!insonComments"
            class="py-[2px] px-[4px] rounded bg-[#F7F9FA] flex-center gap-[6px]"
          >
            <span class="text-gray-400 font-semibold text-xs">ID: </span>
            <span class="text-gray-400 font-semibold text-xs">{{ id }}</span>
          </div>
        </div>

        <div v-if="rate >= 0" class="flex items-center justify-start gap-[8px]">
          <div class="flex-center gap-[2px]">
            <div
              v-for="item in 5"
              :key="item"
              class="rounded-[2px] p-[2px] flex-center w-[16px] h-[16px]"
              :class="{
                'bg-[#27B34A]': item <= rate,
                'bg-gray-200': item > rate,
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.99996 8.87503L3.77487 10.0449C3.49827 10.1903 3.35997 10.263 3.25771 10.2441C3.16874 10.2276 3.09197 10.1718 3.04879 10.0923C2.99915 10.0009 3.02557 9.84689 3.0784 9.53889L3.50346 7.06103L1.70133 5.30684C1.47715 5.08863 1.36506 4.97952 1.35146 4.87636C1.33962 4.78661 1.36894 4.69631 1.43125 4.63064C1.50287 4.55515 1.65768 4.53272 1.96729 4.48785L4.45346 4.12753L5.56602 1.8732C5.70432 1.59298 5.77346 1.45288 5.86734 1.40811C5.94901 1.36917 6.0439 1.36917 6.12558 1.40811C6.21945 1.45288 6.2886 1.59298 6.42689 1.8732L7.53946 4.12753L10.0256 4.48785C10.3352 4.53272 10.49 4.55515 10.5617 4.63064C10.624 4.69631 10.6533 4.78661 10.6415 4.87636C10.6279 4.97952 10.5158 5.08863 10.2916 5.30684L8.48946 7.06103L8.91432 9.53776C8.9672 9.84607 8.99365 10.0002 8.94396 10.0916C8.90074 10.1712 8.82391 10.227 8.73489 10.2434C8.63257 10.2623 8.4942 10.1894 8.21745 10.0436L5.99996 8.87503Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <span class="text-xs text-black font-semibold">{{ rate }}</span>
        </div>
      </div>
    </div>

    <!--    body -->
    <div class="mt-[12px] e:mt-[10px]">
      <span class="text-base e:text-sm text-[#52230F] line-clamp-5">{{
        text
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: 'https://picsum/photos/300/300',
    },
    name: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 1,
    },
    rate: {
      type: Number,
      default: -1,
    },
    insonComments: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
.review {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
}
</style>
