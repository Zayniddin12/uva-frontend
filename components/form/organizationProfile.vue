<template>
  <div class="p-[24px] profile mb-[24px]">
    <infoProfile
      v-if="!edit"
      v-bind="{
        organization: organization.organization_name,
        contacts: organization.person_for_contact,
        district: organization.country_data
          ? organization.country_data.name
          : '',
        region: organization.region_data ? organization.region_data.name : '',
        location: organization.district_data
          ? organization.district_data.name
          : '',
        mapLocation: organization?.location ? profileLocation : {},
        phone: organization.phone,
        email: organization.email,
        socLinks: {
          youtube: organization.youtube,
          telegram: organization.telegram,
          facebook: organization.facebook,
          instagram: organization.instagram,
        },
        about: organization.about,
        dataForm: form,
      }"
      @clickBtn="edit = true"
    />
    <form v-else class="flex flex-col gap-[8px]" @submit.prevent="">
      <Upload v-model="form.ava" class="mb-[32px]" />
      <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
        <Input
          v-model="form.name"
          :placeholder="$t('enter_name')"
          :label="$t('name')"
          :error="$v.form.name.$error"
        />
        <Input
          v-model="form.contacts"
          :placeholder="$t('enter_contact_person')"
          :label="$t('contact_person')"
          :error="$v.form.contacts.$error"
        />
      </div>
      <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
        <Input
          v-model="form.location"
          :placeholder="$t('enter_country')"
          :label="$t('country')"
          :list="allCountries"
          select
          filter
          :error="$v.form.location.$error"
          @load="loadCountry"
        />
        <Input
          v-model="form.region"
          :placeholder="$t('enter_region')"
          :label="$t('region')"
          :list="region?.results"
          :disabled="!form.location"
          select
          :error="$v.form.region.$error"
          no-infinite
        />
      </div>
      <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px]">
        <Input
          v-model="form.district"
          :placeholder="$t('enter_region_town')"
          :label="$t('region_town')"
          :disabled="!(form.location && form.region)"
          :list="district?.results"
          select
          no-infinite
          :error="$v.form.district.$error"
        />
        <!--        mana shu-->
        <Input
          v-model="form.phone"
          v-mask="'+998 (##) ###-##-##'"
          :placeholder="$t('enter_telephone')"
          :label="$t('telephone')"
          :error="$v.form.phone.$error"
        />
      </div>
      <div class="google-map relative space-y-[8px]">
        <span class="inline-block form__label">{{ $t('location') }}</span>
        <GmapAutocomplete
          :value="form.locationTitle"
          :placeholder="$t('location_text')"
          class="mb-[8px]"
          :country="['uz']"
          @place_changed="setPlace"
        />
        <GmapMap
          id="map"
          :key="Object.keys(form.map_location.position ?? {})?.length"
          ref="mapRef"
          :center="form.map_location.center"
          :zoom="form.map_location.zoom"
          map-type-id="terrain"
          class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"
          @click="getMapPosition"
        >
          <GmapMarker
            :position="form.map_location.position"
            :clickable="true"
            :draggable="true"
            url="https://picsum.photos/30/30"
            :icon="'/icons/volunteer-marker.svg'"
          />
        </GmapMap>
      </div>
      <hr />
      <Input
        v-model="form.email"
        :placeholder="$t('enter_post')"
        :label="$t('post')"
        :error="$v.form.email.$error"
      />
      <hr />

      <label class="form__label">{{ $t('soc_set') }}</label>
      <div class="organization-profile__inputs flex gap-[16px]">
        <Input
          v-model="form.instagram"
          :placeholder="$t('user_username')"
          label=""
          :error="$v.form.instagram.$error"
        />
        <Input
          placeholder="placeholder"
          label=""
          value="Instagram"
          :disabled="true"
          class="!max-w-[170px]"
        />
      </div>
      <div class="organization-profile__inputs flex gap-[16px]">
        <Input
          v-model="form.telegram"
          :placeholder="$t('user_username')"
          label=""
          :error="$v.form.telegram.$error"
        />
        <Input
          placeholder="placeholder"
          label=""
          value="Telegram"
          :disabled="true"
          class="!max-w-[170px]"
        />
      </div>
      <div class="organization-profile__inputs flex gap-[16px]">
        <Input
          v-model="form.facebook"
          :placeholder="$t('user_username')"
          label=""
          :error="$v.form.facebook.$error"
        />
        <Input
          placeholder="placeholder"
          label=""
          value="Facebook"
          :disabled="true"
          class="!max-w-[170px]"
        />
      </div>
      <div class="organization-profile__inputs flex gap-[16px]">
        <Input
          v-model="form.youtube"
          :placeholder="$t('user_username')"
          label=""
          :error="$v.form.youtube.$error"
        />
        <Input
          placeholder="placeholder"
          label=""
          value="Youtube"
          :disabled="true"
          class="!max-w-[170px]"
        />
      </div>
      <hr />
      <Input
        v-model="form.about"
        :placeholder="$t('enter_text')"
        :label="$t('about_yourself')"
        textarea
        right-bottom
        maxlength="1000"
        :error="$v.form.about.$error"
        class-input="!pb-[24px] relative"
      >
        <template #right class="absolute !top-0 !right-0">
          <span class="text-[#BCBFCB] text-[16px] font-semibold"
            >{{ form.about?.length }}/1000</span
          >
        </template>
      </Input>
      <button
        type="submit"
        class="btn btn--blue max-w-[50%] f:max-w-[100%] ml-auto mt-[24px]"
        @click="$modal('editOrgProfile')"
      >
        {{ $t('save') }}
      </button>
    </form>
    <Modal
      :id="`editOrgProfile`"
      v-bind="{
        title: this.$t('redactor_event'),
        contentC: 'rounded-[12px] bg-white p-7',
        bodyC: '!p-[0px] rounded-[12px]',
        width: '584',
      }"
    >
      <template>
        <div class="confirm-modal">
          <button
            class="confirm-modal__no"
            @click="$modalHide('editOrgProfile')"
          >
            {{ $t('no') }}
          </button>
          <button class="confirm-modal__yes" @click="confirmChanges">
            {{ $t('yes') }}
          </button>
        </div>
      </template>
    </Modal>
    <Modal
      :id="`rateUs`"
      :overlay-click="overlayCLick"
      v-bind="{
        title: this.$t('doc_warning'),
        contentC: 'rounded-[12px] bg-white py-4 px-5',
        bodyC: '!p-[0px] rounded-[12px] border-solid border-red-500',
        closeSign: true,
        width: '382',
        headC: '',
        titleStyle: '!text-lg',
      }"
    >
      <template>
        <hr class="mt-3" />
        <div class="relative">
          <img class="mx-auto pt-8" src="@/static/img/doc.svg" alt="" />
          <h3 class="text-black pt-6 text-lg font-bold leading-6 text-center">
            {{ $t('doc_congratulations') }}
          </h3>
          <p class="pt-2 text-center text-sm text-black font-normal">
            {{ $t('invite_open') }}
          </p>
          <a
            v-for="item in userProfile.results"
            :key="item?.id"
            :href="item?.file"
            download
            target="_blank"
            @click="modalBtnClick"
          >
            <VButton
              type="submit"
              class="btn btn--blue max-w-[100%] ml-auto mt-[24px]"
              :text="$t('Получить контракт')"
            />
          </a>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { parsePhoneNumber } from 'libphonenumber-js'
import VButton from '@/components/form/VButton.vue'
import InfoProfile from './infoProfile.vue'
import Input from '~/components/form/Input.vue'
import Upload from '~/components/form/Upload.vue'
import Modal from '~/components/volontyor/Modal.vue'

const isPhone = (value) => {
  if (typeof value === 'string') {
    if (value.length === 0) return true
    const phoneNumber = parsePhoneNumber(value, 'UZ')
    return phoneNumber.isValid()
  }
}
export default {
  components: {
    VButton,
    Input,
    Upload,
    InfoProfile,
    Modal,
  },
  async fetch() {
    await this.$store.dispatch('profile/fetchOrganization')
    await this.$store.dispatch('profile/fetchCountries', {
      limit: 8,
      offset: 0,
    })
    // await this.$store.dispatch('profile/fetchRegions')
    // await this.$store.dispatch('profile/fetchDistricts')

    this.form.ava = this.organization?.photo
    this.form.name = this.organization?.organization_name
    this.form.contacts = this.organization?.person_for_contact
    this.form.location = this.organization?.country_data?.id
    if (
      this.allCountries.find(
        (el) => el.id !== this.organization?.country_data?.id
      )
    )
      this.form.location = this.organization?.country_data?.name
    this.form.region = this.organization?.region_data?.id
    this.form.district = this.organization?.district_data?.id
    this.form.phone = this.organization?.phone_number
    this.form.email = this.organization?.email
    this.form.about = this.organization?.about
    this.form.locationTitle = this.organization?.country_data?.name

    if (this.organization) {
      const lat = this.organization.location
        ? +this.organization.location.split(',')[0]
        : ''
      const lng = this.organization.location
        ? +this.organization.location.split(',')[1]
        : ''

      this.form.map_location.position = {
        lat,
        lng,
      }
      this.form.map_location.center = {
        lat,
        lng,
      }
    }

    this.form.facebook = this.organization?.facebook
    this.form.telegram = this.organization?.telegram
    this.form.instagram = this.organization?.instagram
    this.form.youtube = this.organization?.youtube
  },
  data() {
    return {
      edit: false,
      confirmed: false,
      userProfile: [],
      allCountries: [],
      overlayCLick: false,
      modalOpen: false,
      list: [
        { id: 1, name: 'facebook' },
        { id: 2, name: 'telegram' },
        { id: 3, name: 'instagram' },
        { id: 4, name: 'youtube' },
      ],
      form: {
        ava: null,
        name: '',
        contacts: '',
        region: '',
        district: '',
        location: '',
        locationTitle: '',
        phone: '',
        email: '',
        instagram: '',
        facebook: '',
        youtube: '',
        telegram: '',
        about: '',
        map_location: {
          position: {
            lat: 0,
            lng: 0,
          },
          zoom: 16,
          center: { lat: 10, lng: 10 },
        },
      },
    }
  },
  validations: {
    form: {
      ava: { required },
      name: { required, minLength: minLength(1) },
      contacts: { required, minLength: minLength(1) },
      region: { required },
      district: { required },
      location: { required },
      phone: { required, isPhone },
      email: { required, email },
      about: { minLength: minLength(1) },
      instagram: {
        // url,
      },
      telegram: {
        // url,
      },
      facebook: {
        // url,
      },
      youtube: {
        // url,
      },
    },
  },

  computed: {
    ...mapState({
      organization: (state) => state.profile.organization,
      country: (state) => state.profile.country,
      region: (state) => state.profile.region,
      district: (state) => state.profile.district,
    }),
    profileLocation() {
      return {
        lat: +this.organization.location.split(',')[0],
        lng: +this.organization.location.split(',')[1],
      }
    },
    // isSaveButtonDisabled() {
    //   return !this.form?.locationTitle?.length || this.$v.form.$error
    // },
  },
  watch: {
    country() {
      this.allCountries = [...this.allCountries, ...this.country?.results]
    },
    async 'form.location'() {
      if (this.edit) {
        this.form.region = ''
        this.form.district = ''
      }
      await this.$store.dispatch('profile/fetchRegions', {
        limit: 30,
        offset: this.region.length,
        country:
          typeof this.form.location === 'string'
            ? this.organization?.country_data?.id
            : this.form.location,
      })
    },
    async 'form.region'() {
      if (this.edit) {
        this.form.district = ''
      }
      await this.$store.dispatch('profile/fetchDistricts', {
        region: this.form.region || this.organization?.region_data?.id,
      })
    },
  },
  mounted() {
    this.docGetCLick()
  },
  methods: {
    modalBtnClick() {
      this.overlayCLick = true
      this.modalOpen = true
    },
    async docGetCLick() {
      await this.$axios
        .get(`organization-documents/`, {
          headers: {
            'Accept-Language': this.$i18n.locale,
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          this.userProfile = res.data
          if (this.userProfile.results.length > 0) this.modalOpen = true
          if (this.userProfile.results.length > 0 && this.modalOpen) {
            this.$modal('rateUs')
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          console.log('finally')
        })
    },
    async loadCountry($state) {
      if (this.allCountries.length >= this.country?.count) {
        $state.complete()
        return
      }
      try {
        const response = await this.$store.dispatch('profile/fetchCountries', {
          limit: 8,
          offset: this.allCountries.length,
        })
        const newData = response?.results || []
        this.allCountries = [...this.allCountries, ...newData]
        this.hasMoreData = newData.length > 0
        $state.loaded()
      } catch (error) {
        console.error('Error fetching more languages:', error)
        $state.complete()
      }
    },
    setPlace(target) {
      if (target && target.geometry && target.geometry.location) {
        this.form.locationTitle = target.formatted_address
        this.form.map_location.position.lat = +target.geometry.location.lat()
        this.form.map_location.position.lng = +target.geometry.location.lng()
        this.form.map_location.zoom = 100
        this.form.map_location.center.lat = this.form.map_location.position.lat
        this.form.map_location.center.lng = this.form.map_location.position.lng
      } else {
        this.form.locationTitle = ''
        this.form.map_location.position.lat = ''
        this.form.map_location.position.lng = ''
        this.form.map_location.zoom = 16 // Set default zoom level
        this.form.map_location.center = { lat: 10, lng: 10 } // Set default center
        this.$toast.error(this.$t('empty_location'))
      }
    },
    getMapPosition(target) {
      this.form.map_location.position.lat = +target.latLng.lat()
      this.form.map_location.position.lng = +target.latLng.lng()
    },
    confirmChanges() {
      this.confirmed = true
      this.$modal('editOrgProfile')
      this.checkForm()
    },
    async checkForm() {
      this.$v.form.$touch()
      this.$validateForm(this.$v.form)
      if (!this.$v.form.$error && this.confirmed) {
        this.edit = false
        await this.$axios
          .patch(
            `organization_profile/`,
            {
              organization_name: this.form.name,
              person_for_contact: this.form.contacts,
              country: this.form.location.id,
              // region: Array.isArray(this.region)
              //   ? this.region.find(
              //       (item) =>
              //         item?.name === this.form?.region ||
              //         item?.id === this.form?.region
              //     )?.id
              //   : null,
              // district: Array.isArray(this.district)
              //   ? this.district.find(
              //       (item) =>
              //         item?.name === this.form?.district ||
              //         item?.id === this.form?.district
              //     )?.id
              //   : null,
              region: this.form.region,
              district: this.form.district,
              location:
                this.form.map_location.position.lat +
                ',' +
                this.form.map_location.position.lng,
              location_text: this.form.locationTitle,
              phone_number: this.form.phone.replace(/\s|\)|\(|-/g, ''),
              email: this.form.email,
              facebook: this.form.facebook,
              telegram: this.form.telegram,
              instagram: this.form.instagram,
              youtube: this.form.youtube,
              about: this.form.about,
            },
            {
              headers: {
                'Accept-Language': this.$i18n.locale,
              },
            }
          )
          .then(async () => {
            this.$fetch()
            await this.$auth.fetchUser()
            this.$toast.success(this.$t('successfully_edited'))
            this.$modalHide('editOrgProfile')
          })
          .catch(() => {})
        // ! For photo upload
        const formData = new FormData()
        if (this.organization.photo !== this.form.ava) {
          formData.append('photo', this.form.ava)
          await this.$axios
            .patch('photo_update/', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(async () => {
              this.$fetch()
              await this.$auth.fetchUser()
            })
            .catch(() => {})
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
hr {
  border-color: rgba(128, 129, 133, 0.15);
}
button:disabled,
button[disabled] {
  background-color: #e5e5e5;
  color: #bcbfcb;
  cursor: not-allowed;
}

.confirm-modal__no {
  border: 1px solid #da6b3b;
}

.confirm-modal__yes:hover {
  background-color: #b93e09;
  color: #fff;
}
</style>
