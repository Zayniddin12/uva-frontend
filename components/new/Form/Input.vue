<template>
  <div
    :class="[
      'transition-200 bg-white border rounded-md inline-flex items-center relative overflow-hidden w-full group focus-within:bg-white',
      inputWrapStyle,
      error ? 'border-red' : 'border-blue-900/[10%] focus-within:border-blue',
    ]"
  >
    <span
      :class="[prefixStyle, { 'ml-3': !!this.$slots['prefix'] }]"
      class="flex-center"
    >
      <slot name="prefix" />
    </span>
    <input
      ref="input"
      v-model="modelValue"
      v-bind="{
        type,
        minlength,
        maxlength,
        max,
        min,
        disabled,
        placeholder,
        readonly,
        id,
      }"
      :class="[
        inputStyle,
        'text-base leading-130 text-black font-semibold leading-22 placeholder:text-gray-300 bg-transparent flex-grow outline-none caret-dark px-4 py-[11px]',
        { 'placeholder:text-red': error },
      ]"
      class="w-full"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="$emit('focus')"
    />

    <span
      :class="[suffixStyle, { 'mr-1': !!this.$slots['suffix'] }]"
      class="flex-center"
    >
      <slot name="suffix" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    type: {
      type: String,
      default: 'text',
    },
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
    max: {
      type: [String, Number],
      default: undefined,
    },
    min: {
      type: [String, Number],
      default: undefined,
    },
    inputStyle: {
      type: String,
      default: '',
    },
    inputWrapStyle: {
      type: String,
      default: '',
    },
    prefixStyle: {
      type: String,
      default: '',
    },
    suffixStyle: {
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
