<template>
  <div class="modal-wrapper fixed w-full h-full top-[0] left-[0] !z-[9999999]">
    <div
      class="modal-container flex items-center justify-center w-full h-full text-white"
    >
      <BlockPreloader :height="'50%'" :width="'50%'" :loading="!loading">
        <div
          class="modal-box g:w-[80%] g:h-[20%] f:w-[60%] f:h-[30%] w-[60%] h-[50%] relative"
        >
          <iframe
            width="100%"
            height="100%"
            class="rounded-md"
            :src="
              'https://youtube.com/embed/' +
              toEmbed(data[indexVideo]) +
              '?autoplay=1'
            "
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <button
            class="absolute top-[-50px] right-[0] cursor-pointer group"
            @click="closeClick"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.333 12.6665L15.9997 15.9998L12.6663 19.3332"
                stroke="#90A1B5"
                stroke-width="1.4"
                stroke-linecap="round"
                class="duration-150 group-hover:stroke-[#D34848]"
              />
              <path
                d="M12.6665 12.6665L15.9998 15.9998L19.3332 19.3332"
                stroke="#90A1B5"
                stroke-width="1.4"
                stroke-linecap="round"
                class="duration-150 group-hover:stroke-[#D34848]"
              />
              <rect
                x="2.6665"
                y="2.6665"
                width="26.6667"
                height="26.6667"
                rx="6"
                stroke="#90A1B5"
                stroke-width="1.4"
                class="duration-150 group-hover:stroke-[#D34848]"
              />
            </svg>
          </button>
        </div>
      </BlockPreloader>
    </div>
  </div>
</template>
<script>
import BlockPreloader from '@/components/BlockPreloader.vue'

export default {
  components: { BlockPreloader },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    indexVideo: {
      type: Number,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeClick() {
      this.$emit('closeClicked')
    },
    toEmbed(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url?.match(regExp)

      if (match && match[2]?.length === 11) {
        return match[2]
      } else {
        return 'error'
      }
    },
  },
}
</script>

<style>
.modal-wrapper {
  background: rgba(8, 15, 29, 0.7);
}
</style>
