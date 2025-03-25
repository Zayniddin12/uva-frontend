<template>
  <div
    class="flex items-center justify-center flex-col p-[24px] pb-8 profile mb-[24px]"
  >
    <ShareQR :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShareQR from '@/components/profile/Share/ShareQR.vue'

export default {
  components: { ShareQR },
  data() {
    return {}
  },

  computed: {
    ...mapState({
      profile: (state) => state.profile.profile,
      user: (state) => state.auth.user,
    }),
  },
}
</script>
