<template>
  <div
    :class="[
      'relative transition-200 !bg-white border rounded-[6px] inline-flex items-center relative overflow-hidden w-full group',
      error
        ? '!border-red focus-within:bg-red'
        : 'border-blue-900 border-opacity-10 focus-within:border-opacity-100 focus-within:border-blue focus-within:bg-white',
    ]"
  >
    <textarea
      ref="input"
      v-model="modelValue"
      v-bind="{
        minlength,
        maxlength,
        disabled,
        placeholder,
        readonly,
        id,
      }"
      :class="[
        textareaStyle,
        'bg-white font-semibold leading-[22px] text-black placeholder:text-[#BCBFCB] flex-grow outline-none caret-dark px-3 py-[11px] pr-20 min-h-[120px] resize-none',
        { 'placeholder:text-red !border-red': error },
      ]"
      class="w-full"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="$emit('focus')"
    />
    <span
      v-if="maxlength"
      class="absolute bottom-[8px] right-[8px] text-sm text-gray-300 font-normal leading-130"
      >{{ value.length + '/' + maxlength }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'FormTextarea',
  props: {
    placeholder: {
      type: String,
      default: 'Enter',
    },
    value: {
      type: [String, Number, undefined],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: [String, Number],
      default: undefined,
    },
    minlength: {
      type: [String, Number],
      default: undefined,
    },
    textareaStyle: {
      type: String,
      default: '',
    },
    inputWrapStyle: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },
}
</script>

<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
