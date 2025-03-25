<template>
  <div class="relative">
    <input
      :id="'pass' + indexVal"
      v-model="model"
      :type="showPassword ? 'text' : 'password'"
      class="grey-input"
      :class="{ _error: error }"
      :placeholder="placeholder"
      maxlength="32"
      @change="$emit('input', $event.target.value)"
    />
    <svg
      class="_eye active"
      onclick="this.classList.toggle('active')"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="toggleType"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 8.99987C7.44867 8.99987 7 8.5512 7 7.99987C7 7.44853 7.44867 6.99987 8 6.99987C8.55134 6.99987 9 7.44853 9 7.99987C9 8.5512 8.55134 8.99987 8 8.99987ZM8.00001 5.66655C6.71334 5.66655 5.66668 6.71322 5.66668 7.99989C5.66668 9.28655 6.71334 10.3332 8.00001 10.3332C9.28667 10.3332 10.3333 9.28655 10.3333 7.99989C10.3333 6.71322 9.28667 5.66655 8.00001 5.66655ZM8.1464 11.3316C5.27573 11.3983 3.40306 8.94292 2.78173 7.99692C3.46573 6.92692 5.1884 4.73625 7.85373 4.66825C10.7131 4.59559 12.5964 7.05692 13.2177 8.00292C12.5344 9.07292 10.8111 11.2636 8.1464 11.3316ZM14.5784 7.66825C14.1531 6.92692 11.8038 3.21092 7.81978 3.33558C4.13445 3.42892 1.99112 6.67558 1.42178 7.66825C1.30378 7.87358 1.30378 8.12625 1.42178 8.33158C1.84112 9.06292 4.10778 12.6663 8.01645 12.6663C8.07112 12.6663 8.12578 12.6656 8.18045 12.6643C11.8651 12.5703 14.0091 9.32425 14.5784 8.33158C14.6958 8.12625 14.6958 7.87358 14.5784 7.66825Z"
        fill="#44494D"
      />
      <mask
        id="mask0_815_16345"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="1"
        y="3"
        width="14"
        height="10"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 8.99987C7.44867 8.99987 7 8.5512 7 7.99987C7 7.44853 7.44867 6.99987 8 6.99987C8.55134 6.99987 9 7.44853 9 7.99987C9 8.5512 8.55134 8.99987 8 8.99987ZM8.00001 5.66655C6.71334 5.66655 5.66668 6.71322 5.66668 7.99989C5.66668 9.28655 6.71334 10.3332 8.00001 10.3332C9.28667 10.3332 10.3333 9.28655 10.3333 7.99989C10.3333 6.71322 9.28667 5.66655 8.00001 5.66655ZM8.1464 11.3316C5.27573 11.3983 3.40306 8.94292 2.78173 7.99692C3.46573 6.92692 5.1884 4.73625 7.85373 4.66825C10.7131 4.59559 12.5964 7.05692 13.2177 8.00292C12.5344 9.07292 10.8111 11.2636 8.1464 11.3316ZM14.5784 7.66825C14.1531 6.92692 11.8038 3.21092 7.81978 3.33558C4.13445 3.42892 1.99112 6.67558 1.42178 7.66825C1.30378 7.87358 1.30378 8.12625 1.42178 8.33158C1.84112 9.06292 4.10778 12.6663 8.01645 12.6663C8.07112 12.6663 8.12578 12.6656 8.18045 12.6643C11.8651 12.5703 14.0091 9.32425 14.5784 8.33158C14.6958 8.12625 14.6958 7.87358 14.5784 7.66825Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_815_16345)" />
      <rect
        data-v-0d905514=""
        x="1.19757"
        y="3.10425"
        width="3.0"
        height="27"
        rx="1.95646"
        transform="rotate(-44.7878 1.69757 3.10425)"
        fill="white"
        class="first"
      />
      <rect
        data-v-0d905514=""
        x="2.69757"
        y="3.10425"
        width="1"
        height="27"
        rx="1"
        transform="rotate(-44.7878 1.69757 4.10425)"
        fill="#44494D"
        class="second"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Parolni kiriting',
    },
    indexVal: {
      type: [String, Number],
      default: 1,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: this.value,
      showPassword: false,
    }
  },
  watch: {
    model(currentValue) {
      this.$emit('input', currentValue)
    },
  },
  methods: {
    toggleType() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>
