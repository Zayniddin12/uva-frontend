<template>
  <FormGroup :label="$t('phone_number')" required>
    <vue-tel-input
      v-model="formValue.phone"
      :style-classes="[
        'transition-200 bg-white border !rounded-md inline-flex items-center relative w-full group focus-within:bg-white',
        error
          ? '!border-red'
          : '!border-blue-900/[10%] focus-within:border-blue',
      ]"
      v-bind="inputOptions"
    >
      <template #arrow-icon>
        <span class="icon-arrow-down text-black text-xl" />
      </template>
    </vue-tel-input>
  </FormGroup>
</template>

<script>
import FormGroup from '@/components/new/Form/CGroup.vue'
export default {
  components: { FormGroup },
  props: {
    form: {
      type: Object,
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    formValue: {
      get() {
        return this.form
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      },
    },
    inputOptions() {
      return {
        defaultCountry: 'uz',
        mode: 'international',
        dropdownOptions: {
          disabledDialCode: true,
          showDialCodeInList: true,
          showFlags: true,
          showSearchBox: true,
          width: '260px',
        },
        validCharactersOnly: true,
        inputOptions: {
          showDialCode: true,
          placeholder: '(__) ___ __ __',
          styleClasses: `text-base leading-130 text-black font-semibold leading-22 placeholder:text-gray-300 bg-transparent flex-grow outline-none caret-dark pr-4 py-[11px] `,
          maxlength: 20,
        },
      }
    },
  },
}
</script>

<style lang="scss">
.vue-tel-input {
  position: relative;
}
.vue-tel-input:focus-within {
  box-shadow: none;
  border-color: #da6b3b;
}
.vti__input {
  padding-left: 12px;
  border: none !important;
  outline: none !important;
}
.vti__dropdown {
  background: #f0f3f6 !important;
  border-radius: 4px !important;
  margin-left: 4px !important;
  padding: 6px 8px !important;
}

.vti__dropdown-list {
  max-width: 280px;
  max-height: 324px;
  padding: 0 !important;
  background: #fff;
  border-radius: 8px;
}
.vti__dropdown-list.below {
  top: 46px !important;
  z-index: 9999 !important;
}
.vti__dropdown-item:hover {
  @apply bg-blue-500/10;
}
</style>
