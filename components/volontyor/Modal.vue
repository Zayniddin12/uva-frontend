<template>
  <div :id="id" class="modalka">
    <div class="modalka__bg" @click="modalHide"></div>
    <div
      class="modalka__content"
      :class="contentC"
      :style="`max-width: ${+width}px`"
    >
      <div class="modalka__head" :class="headC">
        <h1 :class="titleStyle">{{ title }}</h1>
        <div @click="modalHide">
          <svg
            v-if="closeSign"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 15L5 5M15 5L5 15"
              stroke="#90A1B5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-else
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
            />
            <path
              d="M12.6665 12.6665L15.9998 15.9998L19.3332 19.3332"
              stroke="#90A1B5"
              stroke-width="1.4"
              stroke-linecap="round"
            />
            <rect
              x="2.6665"
              y="2.6665"
              width="26.6667"
              height="26.6667"
              rx="6"
              stroke="#90A1B5"
              stroke-width="1.4"
            />
          </svg>
        </div>
      </div>
      <div :class="bodyC" class="modalka__body">
        <slot></slot>
      </div>
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
    width: {
      type: String,
      default: '640',
    },
    id: {
      type: String,
      default: '',
    },
    headC: {
      type: String,
      default: '',
    },
    titleStyle: {
      type: String,
      default: '',
    },
    contentC: {
      type: String,
      default: '',
    },
    bodyC: {
      type: String,
      default: '',
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    closeSign: {
      type: Boolean,
      default: false,
    },
    overlayClick: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    modalHide() {
      if (this.overlayClick) {
        this.$modalHide(this.id)
      }
    },
  },
}
</script>

<style>
.modalka__head {
  display: flex;
  justify-content: space-between;
  align-items: start !important;
}
</style>
