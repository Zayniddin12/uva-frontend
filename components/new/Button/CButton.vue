<template>
  <button
    aria-label="button"
    v-bind="{ disabled, type }"
    :class="[variantStyle, variantSize, buttonStyle]"
    class="s-button flex items-center justify-center transition-all duration-200 font-semibold text-xs leading-130 rounded-lg disabled:pointer-events-none disabled:grayscale disabled:!cursor-not-allowed relative z-10 flex-y-center group"
    @click="$emit('click')"
  >
    <template v-if="!loading">
      <slot />
    </template>
    <template v-else>
      <span class="block load-spinner" />
    </template>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'medium', // small, medium
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonStyle: {
      type: String,
      default: '',
    },
  },
  computed: {
    variantStyle() {
      const variantStyles = {
        primary: '!text-white bg-blue hover:bg-blue-500',
        info: 'text-blue-dark bg-gray-100',
        secondary: 'text-gray bg-gray-500 hover:!bg-gray-700',
        'secondary-light': 'text-gray-900 bg-gray-800 hover:!bg-gray-700',
        'light-blue':
          'text-blue bg-[#DA6B3B1F] hover:!bg-blue hover:!text-white',
      }

      return variantStyles[this.variant]
    },
    variantSize() {
      const sizeStyles = {
        small: 'px-[12px] py-[6.5px]',
        medium: 'py-[10px] px-[28px]',
      }

      return sizeStyles[this.size]
    },
  },
}
</script>
<style scoped>
.s-button > * {
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.load-spinner {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #fff;
  animation: spinner-bulqg1 0.8s infinite linear alternate,
    spinner-oaa3wk 1.6s infinite linear;
}

@keyframes spinner-bulqg1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }

  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }

  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }

  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}

@keyframes spinner-oaa3wk {
  0% {
    transform: scaleY(1) rotate(0deg);
  }

  49.99% {
    transform: scaleY(1) rotate(135deg);
  }

  50% {
    transform: scaleY(-1) rotate(0deg);
  }

  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
