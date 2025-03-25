<template>
  <div>
    <!--    <Preloader :fetch-state="$fetchState" :data="user">-->
    <userProfile v-if="user.user_type === 1" />
    <organizationProfile v-else />
    <!--    </Preloader>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OrganizationProfile from '~/components/form/organizationProfile.vue'
import userProfile from '~/components/form/userProfile.vue'

export default {
  components: { userProfile, OrganizationProfile },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
}
</script>
