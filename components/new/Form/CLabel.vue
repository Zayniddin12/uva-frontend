<template>
  <label
    :for="forId"
    class="font-semibold text-base leading-130 text-blue-dark whitespace-nowrap"
  >
    {{ label }} <span v-if="required" class="text-[#DA6B3B]">*</span>
    <span
      v-if="info"
      class="icon-info-circle text-blue text-base mt-2 cursor-pointer transition-200 hover:text-blue"
    />
  </label>
</template>

<script>
export default {
  name: 'FormLabel',
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    forId: {
      type: String,
      default: 'input',
    },
    required: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
