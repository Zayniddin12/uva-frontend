<template>
  <div
    class="relative flex items-start justify-center flex-col w-1/2 h-full py-[44px] px-[32px] 2xl:!px-[125px] xl:px-[64px] e:px-[16px]"
  >
    <div
      class="absolute top-[44px] left-[32px] 2xl:left-[125px] xl:left-[64px] e:left-[16px] inline-flex items-start flex-col mb-auto"
    >
      <div class="inline-flex items-center">
        <NuxtLink :to="localePath('/')" class="flex items-center">
          <icon-base
            v-if="$i18n.locale === 'en'"
            class="logo e:w-[140px]"
            name="other-header-logo-en"
          />
          <icon-base
            v-if="$i18n.locale === 'ru'"
            class="logo e:w-[140px]"
            name="other-header-logo-ru"
          />
          <icon-base
            v-if="$i18n.locale === 'uz'"
            class="logo e:w-[140px]"
            name="other-header-logo-uz"
          />
          <!--          <div class="bg-blue-dark/[0.5] w-[1px] h-[34px] mx-[16px]" />-->
          <!--          <icon-base class="logo e:w-[140px]" name="yoshlar" />-->
        </NuxtLink>
      </div>
      <NuxtLink :to="localePath('/')">
        <CButton
          size="small"
          variant="info"
          class="flex items-center mt-[46px] space-x-[4px] !rounded e:mt-[22px]"
        >
          <span
            class="inline-block icon-arrow-down rotate-90 text-xl leading-24 transition-all duration-150 group-hover:text-blue"
          />
          <span
            class="text-blue-dark text-base font-semibold leading-130 transition-all duration-150 group-hover:text-blue"
          >
            {{ $t('back') }}
          </span>
        </CButton>
      </NuxtLink>
    </div>
    <div class="my-auto">
      <h1 class="text-40 text-blue-dark font-bold leading-54 !mb-3 e:text-3xl">
        {{ $t('is_volunteer') }}
      </h1>
      <p
        class="text-2xl text-blue-dark font-normal leading-130 text-left e:text-xl"
      >
        {{ $t('info_volunteer') }}
      </p>
      <NuxtLink :to="localePath('/auth')">
        <CButton class="mt-[32px] space-x-[8px]">
          <span class="icon-login text-white text-2xl" />
          <span class="text-white text-base font-semibold leading-22">
            {{ $t('be_volunteer') }}
          </span>
        </CButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import IconBase from '../../volontyor/IconBase.vue'
import CButton from '~/components/new/Button/CButton.vue'
export default {
  components: { CButton, IconBase },
}
</script>
<style>
.logo svg {
  width: 100%;
}
</style>
