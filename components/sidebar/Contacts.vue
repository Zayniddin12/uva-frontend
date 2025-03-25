<template>
  <div v-if="mail || phone" class="contacts-component p-[12px]">
    <h6 class="mb-[15px]">{{ $t('contacts') }}</h6>
    <div class="flex flex-col gap-[14px]">
      <div v-if="phone" class="flex items-center">
        <icon-base name="call-contact" class="mr-[10px]" />
        <a :href="`tel:${phone}`">{{ phone | VMask('+998 (##) ###-##-##') }}</a>
      </div>
      <div v-if="mail" class="flex items-center">
        <icon-base name="mail-contact" class="mr-[10px]" />
        <a :href="`mailto:${mail}`">{{ mail }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
  },
  props: {
    phone: {
      type: String,
      default: '+99871 211 40 44',
    },
    mail: {
      type: String,
      default: 'info@uva.uz',
    },
  },
}
</script>
