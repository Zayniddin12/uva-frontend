<template>
  <label
    class="group inline-flex items-center relative select-none min-h-[20px]"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      v-bind="{ disabled, checked, name, value }"
      type="checkbox"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      @change="handleChange"
    />
    <span
      :class="[
        'duration-200 bg-white ease-in-out absolute top-0.5 left-0 inline-block h-5 w-5 rounded border-[1px] peer-checked:-rotate-90 peer-checked:after:opacity-100 peer-checked:after:rotate-[138deg] after:transition-all after:duration-200 after:absolute after:left-[7px] after:top-[3px] after:w-1.5 after:h-[11px] after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[0deg] after:opacity-0',
        'border-gray/[0.24] peer-checked:bg-blue peer-checked:border-blue after:border-white peer-disabled:border-gray/[0.24] peer-disabled:after:border-gray/[0.24]',
        {
          '!border-danger': error,
          'group-hover:border-blue': !disabled,
        },
      ]"
    />
    <span class="pl-8">
      <slot name="label">
        <span
          :class="[
            'font-medium letter-3 leading-[17px] text-[#2B3646] text-sm',
            labelStyle,
          ]"
        >
          {{ label }}
        </span>
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    label: {
      type: String,
      default: 'Label',
    },
    name: {
      type: String,
      default: 'checkbox',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    labelStyle: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: [Boolean, undefined],
      default: undefined,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.checked,
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.checked, this.value)
    },
  },
}
</script>
