<template>
  <label
    class="transition group inline-flex items-center relative select-none min-h-[20px]"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
  >
    <input
      type="radio"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="modelValue === value"
      v-bind="{ name, value, disabled }"
      @change="handleChange"
    />
    <span
      :class="[
        's-radio-btn shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-3 before:opacity-0 relative border-[1px] rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200',
        'border-gray/40 peer-disabled:before:bg-gray/40',
        computedBtnStyle,
      ]"
      :style="{ width: computedSize, height: computedSize }"
    />
    <slot name="label">
      <span :class="['font-medium text-[#2B3646]', labelStyle]">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: '',
    },
    value: {
      type: [String, Number, Object],
      default: '',
    },
    label: {
      type: String,
      default: 'Radio Label',
    },
    btnStyle: {
      type: String,
      default:
        'before:white before:bg-blue group-hover:border-blue peer-checked:bg-white peer-checked:border-blue peer-checked:before:!bg-blue',
    },
    labelStyle: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 24,
    },
    name: {
      type: String,
      default: 'radio',
    },
  },
  computed: {
    computedSize() {
      return this.size + 'px'
    },
    computedBtnSize() {
      return +this.size * 0.5 + 'px'
    },
    computedBtnStyle() {
      return !this.disabled ? this.btnStyle : 'peer-checked:before:!bg-blue'
    },
  },
  methods: {
    handleChange(e) {
      const target = e.target
      this.$emit('input', this.value ? target.value : target.checked)
    },
  },
}
</script>

<style scoped>
.s-radio-btn::before {
  width: var(--btn-size);
  height: var(--btn-size);
}
</style>
