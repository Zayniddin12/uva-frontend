<template>
  <div class="profile-details">
    <div class="grid grid-cols-3 c:grid-cols-1 gap-[12px]">
      <div v-if="name || organization">
        <h1 class="profile-title">
          {{ name ? this.$t('user_name') : this.$t('name') }}
        </h1>
        <h2
          v-if="name || organization"
          class="form__label truncate max-w-[200px]"
        >
          {{ name || organization }}
        </h2>
      </div>
      <div v-if="secondName || contacts">
        <h1 class="profile-title">
          {{ secondName ? this.$t('surname') : this.$t('contact_person') }}
        </h1>
        <h2 class="form__label truncate max-w-[200px]">
          {{ secondName || contacts }}
        </h2>
      </div>
      <div v-if="thirdName">
        <h1 class="profile-title">{{ $t('patronymic') }}</h1>
        <h2 class="form__label truncate max-w-[200px]">{{ thirdName }}</h2>
      </div>
    </div>
    <hr class="my-[20px]" />
    <div class="grid grid-cols-3 c:grid-cols-1 gap-[12px]">
      <div v-if="birthday">
        <h1 class="profile-title">{{ $t('birthday') }}</h1>
        <h2 class="form__label">{{ $moment(birthday, 'DD.MM.YYYY') }}</h2>
      </div>
      <div v-if="district">
        <h1 class="profile-title">{{ $t('country') }}</h1>
        <h2 class="form__label">{{ district }}</h2>
      </div>
      <div v-if="region" class="">
        <h1 class="profile-title">{{ $t('region') }}</h1>
        <h2 class="form__label">{{ region }}</h2>
      </div>
    </div>
    <hr class="my-[20px]" />
    <div class="grid grid-cols-3 c:grid-cols-1 gap-[12px]">
      <div v-if="location" class="">
        <h1 class="profile-title">{{ $t('region_town') }}</h1>
        <h2 class="form__label">{{ location }}</h2>
      </div>
      <div v-if="phone" class="">
        <h1 class="profile-title">{{ $t('telephone') }}</h1>
        <h2 class="form__label">
          {{ phone | VMask('+998 (##) ###-##-##') }}
        </h2>
      </div>
      <div v-if="totalHours">
        <h1 class="profile-title">{{ $t('benefits') }}</h1>
        <h2 class="form__label">
          {{ formatTotalHours(totalHours) }}
        </h2>
      </div>
    </div>
    <hr v-if="volunteerType" class="my-[20px]" />
    <div class="grid grid-cols-3 c:grid-cols-1 gap-[12px]">
      <div v-if="volunteerType">
        <h1 class="profile-title">{{ $t('tip_volunteer') }}</h1>
        <h2 class="form__label">
          {{ volunteerType === 1 ? $t('volunteer') : $t('social_volunteer') }}
        </h2>
      </div>
    </div>
    <hr class="my-[20px]" />

    <div class="google-map relative mb-[24px]">
      <h1 v-if="mapLocation" class="profile-title">
        {{ $t('location') }}
      </h1>
      <div v-if="mapLocation">
        <GmapMap
          id="map"
          :key="Object.keys(mapLocation ?? {})?.length"
          ref="mapRef"
          :center="{ lat: 40.7685941, lng: 72.236379 }"
          :zoom="16"
          map-type-id="terrain"
          class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"
        >
          <GmapMarker
            :position="mapLocation"
            :clickable="true"
            :draggable="true"
            url="https://picsum.photos/30/30"
            :icon="'/icons/volunteer-marker.svg'"
          />
        </GmapMap>
      </div>
    </div>
    <div v-if="email" class="">
      <h1 class="profile-title">{{ $t('mail') }}</h1>
      <h2 class="form__label">{{ email }}</h2>
      <hr class="my-[20px]" />
    </div>
    <div v-if="socLinks" class="">
      <h1 class="profile-title">{{ $t('soc_set') }}</h1>
      <div class="flex flex-wrap gap-[4px]">
        <div v-if="socLinks.youtube" class="el-tag !p-[7px] !bg-transparent">
          <a
            :href="socLinks.youtube"
            target="_blank"
            class="w-[28px] h-[28px] flex items-center !justify-center"
          >
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.348 7.75664L6.3475 3.22925L10.6705 5.50075L6.348 7.75664ZM15.84 2.44472C15.84 2.44472 15.6835 1.3344 15.204 0.845459C14.5955 0.203437 13.9135 0.200409 13.601 0.163147C11.362 -2.36432e-06 8.0035 0 8.0035 0H7.9965C7.9965 0 4.638 -2.36432e-06 2.399 0.163147C2.086 0.200409 1.4045 0.203437 0.795502 0.845459C0.316002 1.3344 0.159999 2.44472 0.159999 2.44472C0.159999 2.44472 0 3.74891 0 5.05259V6.27521C0 7.57939 0.159999 8.88308 0.159999 8.88308C0.159999 8.88308 0.316002 9.9934 0.795502 10.4823C1.4045 11.1244 2.204 11.1042 2.56 11.1712C3.84 11.2951 8 11.3333 8 11.3333C8 11.3333 11.362 11.3283 13.601 11.1652C13.9135 11.1274 14.5955 11.1244 15.204 10.4823C15.6835 9.9934 15.84 8.88308 15.84 8.88308C15.84 8.88308 16 7.57939 16 6.27521V5.05259C16 3.74891 15.84 2.44472 15.84 2.44472Z"
                fill="#DA6B3B"
              />
            </svg>
          </a>
        </div>
        <div v-if="socLinks.telegram" class="el-tag !p-[7px] !bg-transparent">
          <a
            :href="socLinks.telegram"
            target="_blank"
            class="w-[28px] h-[28px] flex items-center !justify-center"
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9544 1.22486L13.5399 12.6424C13.3578 13.4482 12.8827 13.6487 12.2076 13.2691L8.52875 10.5508L6.75359 12.2627C6.55714 12.4597 6.39284 12.6245 6.01424 12.6245L6.27855 8.86757L13.097 2.68965C13.3935 2.42463 13.0327 2.27779 12.6363 2.54282L4.20693 7.86478L0.57804 6.72589C-0.211316 6.47878 -0.225603 5.9344 0.74234 5.55477L14.9365 0.0716494C15.5937 -0.175467 16.1687 0.218487 15.9544 1.22486V1.22486Z"
                fill="#DA6B3B"
              />
            </svg>
          </a>
        </div>
        <div v-if="socLinks.facebook" class="el-tag !p-[7px] !bg-transparent">
          <a
            :href="socLinks.facebook"
            target="_blank"
            class="w-[28px] h-[28px] flex items-center !justify-center"
          >
            <svg
              width="9"
              height="18"
              viewBox="0 0 9 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.41022 10.125L8.87692 6.86742H5.95887V4.75348C5.95887 3.86227 6.36649 2.99355 7.6734 2.99355H9V0.220078C9 0.220078 7.79615 0 6.64514 0C4.24203 0 2.67125 1.56023 2.67125 4.38469V6.86742H0V10.125H2.67125V18H5.95887V10.125H8.41022Z"
                fill="#DA6B3B"
              />
            </svg>
          </a>
        </div>
        <div v-if="socLinks.instagram" class="el-tag !p-[7px] !bg-transparent">
          <a
            :href="socLinks.instagram"
            target="_blank"
            class="w-[28px] h-[28px] flex items-center !justify-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.00002 0C5.82734 0 5.55491 0.00920848 4.70162 0.0481415C3.85011 0.0869788 3.26855 0.222227 2.75969 0.420003C2.23362 0.624417 1.78749 0.897964 1.34271 1.34271C0.897969 1.78748 0.624417 2.23362 0.420003 2.75969C0.222227 3.26855 0.0869839 3.8501 0.0481466 4.70161C0.00921357 5.55489 0 5.82733 0 8.00002C0 10.1727 0.00921357 10.4451 0.0481466 11.2984C0.0869839 12.1499 0.222227 12.7314 0.420003 13.2403C0.624417 13.7664 0.897969 14.2125 1.34271 14.6573C1.78749 15.102 2.23362 15.3756 2.75969 15.58C3.26855 15.7778 3.85011 15.913 4.70162 15.9519C5.55491 15.9908 5.82734 16 8.00002 16C10.1727 16 10.4451 15.9908 11.2984 15.9519C12.1499 15.913 12.7314 15.7778 13.2403 15.58C13.7664 15.3756 14.2125 15.102 14.6573 14.6573C15.102 14.2125 15.3756 13.7664 15.58 13.2403C15.7778 12.7314 15.913 12.1499 15.9519 11.2984C15.9908 10.4451 16 10.1727 16 8.00002C16 5.82733 15.9908 5.55489 15.9519 4.70161C15.913 3.8501 15.7778 3.26855 15.58 2.75969C15.3756 2.23362 15.102 1.78748 14.6573 1.34271C14.2125 0.897964 13.7664 0.624417 13.2403 0.420003C12.7314 0.222227 12.1499 0.0869788 11.2984 0.0481415C10.4451 0.00920848 10.1727 0 8.00002 0ZM8.00002 1.44144C10.1361 1.44144 10.3891 1.4496 11.2327 1.48809C12.0127 1.52365 12.4363 1.65398 12.7182 1.76354C13.0916 1.90867 13.3581 2.08202 13.638 2.36198C13.918 2.64191 14.0913 2.90841 14.2365 3.28183C14.346 3.56373 14.4763 3.98732 14.5119 4.76731C14.5504 5.61088 14.5586 5.86391 14.5586 8.00002C14.5586 10.1361 14.5504 10.3891 14.5119 11.2327C14.4763 12.0127 14.346 12.4363 14.2365 12.7182C14.0913 13.0916 13.918 13.3581 13.638 13.638C13.3581 13.918 13.0916 14.0913 12.7182 14.2365C12.4363 14.346 12.0127 14.4763 11.2327 14.5119C10.3892 14.5504 10.1363 14.5586 8.00002 14.5586C5.86376 14.5586 5.61079 14.5504 4.76731 14.5119C3.98732 14.4763 3.56373 14.346 3.28183 14.2365C2.90841 14.0913 2.64191 13.918 2.36198 13.638C2.08205 13.3581 1.90867 13.0916 1.76354 12.7182C1.65398 12.4363 1.52365 12.0127 1.48809 11.2327C1.4496 10.3891 1.44144 10.1361 1.44144 8.00002C1.44144 5.86391 1.4496 5.61088 1.48809 4.76731C1.52365 3.98732 1.65398 3.56373 1.76354 3.28183C1.90867 2.90841 2.08202 2.64191 2.36198 2.36198C2.64191 2.08202 2.90841 1.90867 3.28183 1.76354C3.56373 1.65398 3.98732 1.52365 4.76731 1.48809C5.61088 1.4496 5.86392 1.44144 8.00002 1.44144ZM8.00002 3.8919C5.73115 3.8919 3.8919 5.73114 3.8919 8.00002C3.8919 10.2689 5.73115 12.1081 8.00002 12.1081C10.2689 12.1081 12.1081 10.2689 12.1081 8.00002C12.1081 5.73114 10.2689 3.8919 8.00002 3.8919ZM8.00002 10.6667C6.52724 10.6667 5.33333 9.47277 5.33333 8.00002C5.33333 6.52723 6.52724 5.33333 8.00002 5.33333C9.47277 5.33333 10.6667 6.52723 10.6667 8.00002C10.6667 9.47277 9.47277 10.6667 8.00002 10.6667ZM13.2304 3.72959C13.2304 4.25979 12.8006 4.68958 12.2704 4.68958C11.7402 4.68958 11.3104 4.25979 11.3104 3.72959C11.3104 3.19939 11.7402 2.76957 12.2704 2.76957C12.8006 2.76957 13.2304 3.19939 13.2304 3.72959Z"
                fill="#DA6B3B"
              />
            </svg>
          </a>
        </div>
        <div v-if="checkObject(socLinks)" class="el-tag !p-[0px]">
          <a class="btn btn--light-blue !rounded-[3px]" @click="clickBtn">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.6569 8.50002C14.6569 9.0523 14.2091 9.50002 13.6569 9.50002H2.34315C1.79086 9.50002 1.34315 9.0523 1.34315 8.50002C1.34315 7.94774 1.79086 7.50002 2.34315 7.50002H13.6569C14.2091 7.50002 14.6569 7.94774 14.6569 8.50002Z"
                fill="#DB490B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 1.84317C8.55228 1.84317 9 2.29088 9 2.84317L9 14.1569C9 14.7092 8.55229 15.1569 8 15.1569C7.44771 15.1569 7 14.7092 7 14.1569L7 2.84317C7 2.29088 7.44772 1.84317 8 1.84317Z"
                fill="#DB490B"
              />
            </svg>
            {{ $t('add_socials') }}
          </a>
        </div>
      </div>
      <hr class="my-[20px]" />
    </div>
    <div v-if="about" class="">
      <h1 class="profile-title">{{ $t('description_about_you') }}</h1>
      <h2 class="form__label">
        {{ about }}
      </h2>
      <hr class="my-[20px]" />
    </div>
    <div v-if="educationLevel" class="">
      <h1 class="profile-title">{{ $t('level_education') }}</h1>
      <h2 class="form__label">
        {{ educationalLevel.find((item) => item.id === educationLevel).name }}
      </h2>
      <hr class="my-[20px]" />
    </div>
    <div v-if="languages && languages?.length" class="">
      <h1 class="profile-title">{{ $t('languages') }}</h1>
      <div class="flex flex-wrap gap-[4px]">
        <div v-for="(item, index) in languages" :key="index" class="el-tag">
          {{ item.name }}
        </div>
      </div>
      <hr class="my-[20px]" />
    </div>
    <!--    map -->
    <div v-if="false" class="google-map relative space-y-[8px]">
      <span class="inline-block profile-title">{{ $t('location') }}</span>
      <h2 class="form__label">
        {{ dataForm.locationTitle }}
      </h2>
      <GmapMap
        id="map"
        :key="dataForm.map_location.position"
        ref="mapRef"
        :center="dataForm.map_location.center"
        :zoom="dataForm.map_location.zoom"
        map-type-id="terrain"
        class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"
      >
        <GmapMarker
          :position="dataForm.map_location.position"
          url="https://picsum.photos/30/30"
          :icon="'/icons/volunteer-marker.svg'"
        />
      </GmapMap>
      <hr class="my-[20px]" />
    </div>
    <div v-if="specialty" class="">
      <h1 class="profile-title">{{ $t('your_special') }}</h1>
      <h2 class="form__label">
        {{ specialty }}
      </h2>
      <hr class="my-[20px]" />
    </div>
    <div v-if="interests" class="">
      <h1 class="profile-title">{{ $t('your_interesting') }}</h1>
      <h2 class="form__label">
        {{ interests }}
      </h2>
      <hr class="my-[20px]" />
    </div>
    <div v-if="interestsList && interestsList?.length" class="">
      <h1 class="profile-title">{{ $t('your_interesting') }}</h1>
      <div class="flex flex-wrap gap-[4px]">
        <div v-for="(item, index) in interestsList" :key="index" class="el-tag">
          {{ item.name }}
        </div>
      </div>
    </div>
    <button
      type="button"
      class="btn btn--blue max-w-[50%] f:max-w-[100%] ml-auto mt-[24px]"
      @click="clickBtn"
    >
      {{ $t('change_data') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' },
    organization: { type: String, default: '' },
    contacts: { type: String, default: '' },
    secondName: { type: String, default: '' },
    thirdName: { type: String, default: '' },
    birthday: { type: String, default: '' },
    volunteerType: { type: Number, default: 0 },
    district: { type: String, default: '' },
    region: { type: String, default: '' },
    location: { type: String, default: '' },
    totalHours: { type: Number, default: 0 },
    mapLocation: { type: [Object, String], default: () => {} },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    about: { type: String, default: '' },
    educationLevel: { type: [String, Number], default: 0 },
    // eslint-disable-next-line vue/require-default-prop
    // educationLevel: { type: Number },
    languages: { type: Array, default: () => [] },
    socLinks: { type: Object, default: () => {} },
    dataForm: { type: Object, default: () => {} },
    specialty: { type: String, default: '' },
    interests: { type: String, default: '' },
    interestsList: { type: Array, default: () => [] },
  },

  data() {
    return {
      count: 12341234,
      educationalLevel: [
        { name: this.$t('education_medium'), id: 1 },
        { name: this.$t('education_medium_specific'), id: 2 },
        { name: this.$t('bachelor'), id: 3 },
        { name: this.$t('master'), id: 4 },
      ],
    }
  },
  methods: {
    checkObject(object) {
      return !Object.values(object).every((element) => element)
    },
    clickBtn(args) {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$emit('clickBtn', args)
    },
    formatTotalHours(number) {
      if (typeof number === 'number' && !isNaN(number)) {
        return number.toLocaleString(undefined, { maximumFractionDigits: 1 })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-title {
  font-weight: 600;
  font-size: 18px;
  line-height: calc(25 / 18 * 100%);
  color: #bcbfcb;
  margin-bottom: 8px;
}
hr {
  border-color: rgba(128, 129, 133, 0.15);
}
.google-map {
  .gm-svpc,
  .gm-fullscreen-control,
  .gm-style-mtc,
  .gm-style-cc {
    display: none !important;
  }
}
</style>
