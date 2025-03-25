<template>
  <div
    class="relative max-w-[280px] z-1 bg-image w-full rounded overflow-hidden h-[398px]"
  >
    <span class="bg-blue-dark/75 absolute w-full h-full -z-2"></span>
    <div
      class="flex h-full w-full flex-col justify-between p-[24px] pt-[12px] z-[2]"
    >
      <div class="flex-center w-full">
        <icon-base
          v-if="$i18n.locale === 'en'"
          class="text-center w-max object-cover flex-center z-10"
          name="logo-en"
        />
        <icon-base
          v-if="$i18n.locale === 'ru'"
          class="text-center w-max object-cover flex-center z-10"
          name="logo-ru"
        />
        <icon-base
          v-if="$i18n.locale === 'uz'"
          class="text-center w-max object-cover flex-center z-10"
          name="logo"
        />
      </div>

      <div class="z-[20]">
        <span class="text-white text-base font-semibold">
          {{ $t('want_popular_volunteer') }}
        </span>
        <nuxt-link
          v-if="!token && !user"
          :to="localePath('/invite')"
          class="text-base e:text-sm"
        >
          <CButton button-style="w-full block mt-[24px]"
            ><span class="text-sm text-white font-semibold">{{
              $t('join')
            }}</span></CButton
          >
        </nuxt-link>
        <nuxt-link
          v-else-if="token || user"
          :to="localePath('/possibilities')"
          class="text-base e:text-sm"
        >
          <CButton button-style="w-full block mt-[24px]"
            ><span class="text-sm text-white font-semibold">{{
              $t('join')
            }}</span></CButton
          >
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style>
.bg-image {
  background-image: url('/img/sidebar.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
<script>
import { mapState } from 'vuex'
import CButton from '@/components/new/Button/CButton.vue'
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
    CButton,
  },
  data() {
    return {
      token: undefined,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  mounted() {
    this.token = window.localStorage.getItem('access')
  },
}
</script>
