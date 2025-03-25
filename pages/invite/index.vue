<template>
  <div class="relative w-full h-screen flex items-center">
    <VolontyorInfo class="b:w-full" />
    <VolontyorBanner class="b:hidden" />
  </div>
</template>

<script>
import VolontyorInfo from '~/components/auth/volontyor/VolontyorInfo.vue'
import VolontyorBanner from '~/components/auth/volontyor/VolontyorBanner.vue'

export default {
  components: { VolontyorBanner, VolontyorInfo },
  layout: 'empty',
}
</script>
