<template>
  <div>
    <client-only>
      <div class="p-[24px] profile mb-[24px]">
        <infoProfile
          v-if="!edit && profile"
          v-bind="{
            name: profile.first_name,
            secondName: profile.last_name,
            thirdName: profile.middle_name,
            totalHours: profile.total_hours,
            volunteerType: profile.volunteer_type,
            birthday: profile.date_of_birth,
            district: profile.country_data ? profile.country_data.name : '',
            region: profile.region_data ? profile.region_data.name : '',
            location: profile.district_data ? profile.district_data.name : '',
            // mapLocation: profile.location ? profileLocation : '',
            phone: profile.phone_number,
            email: profile.email,
            dataForm: form,
            about: profile.profile ? profile.profile.about_me : '',
            educationLevel: profile.profile
              ? profile.profile.education_level
              : '',
            languages: profile.profile ? profile.profile.languages_data : [],
            specialty: profile.profile ? profile.profile.specialty : '',
            interests: profile.profile ? profile.profile.interests : '',
            interestsList: profile.profile ? profile.profile.goals_data : [],
          }"
          @clickBtn="edit = true"
        />
        <form
          v-else
          class="!flex !flex-col !gap-[16px]"
          @submit.prevent="checkForm"
        >
          <Preloader :fetch-state="$fetchState">
            <Upload v-model="form.ava" class="mb-[16px]" />
            <div
              class="grid grid-cols-2 c:grid-cols-1 gap-y-[16px] gap-x-[12px]"
            >
              <Input
                v-model="form.name"
                :placeholder="$t('enter_user_name')"
                :label="$t('user_name')"
                :error="$v.form.name.$error"
                maxlength="30"
              />
              <Input
                v-model="form.second_name"
                :placeholder="$t('enter_surname')"
                :label="$t('surname')"
                :error="$v.form.second_name.$error"
                maxlength="30"
              />
              <Input
                v-model="form.third_name"
                :placeholder="$t('enter_patronymic')"
                :label="$t('patronymic')"
                :error="$v.form.third_name.$error"
                maxlength="30"
              />
              <div class="form__group">
                <label class="form__label"
                  >{{ $t('birthday') }} <span>*</span></label
                >
                <el-date-picker
                  v-model="form.birthday"
                  class="profile-calendar"
                  format="dd.MM.yyyy"
                  :placeholder="$t('dateFormat')"
                  :class="{ _error: $v.form.birthday.$error }"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
              <Input
                v-model="form.location"
                :placeholder="$t('enter_countrys')"
                :label="$t('country')"
                :list="allCountries"
                select
                :error="$v.form.location.$error"
                @load="loadCountry"
              />
              <Input
                v-model="form.region"
                :placeholder="$t('enter_regions')"
                :label="$t('region')"
                :list="region?.results"
                :disabled="!form.location"
                select
                no-infinite
                :error="$v.form.region.$error"
              />
              <Input
                v-model="form.district"
                :placeholder="$t('enter_region_towns')"
                :label="$t('region_town')"
                :list="district?.results"
                :disabled="!(form.location && form.region)"
                select
                no-infinite
                :error="$v.form.district.$error"
              />
              <Input
                v-model="form.phone"
                v-mask="'+998 (##) ###-##-##'"
                :placeholder="$t('enter_telephone')"
                :label="$t('telephone')"
                :error="$v.form.phone.$error"
              />
              <el-checkbox
                v-model="form.show_number"
                class="!whitespace-normal col-span-2 c:col-span-1"
              >
                <p
                  class="!mb-[0px] font-semibold !text-base !leading-[19px] !text-[#52230F]"
                >
                  {{ $t('show_number') }}
                </p>
              </el-checkbox>
              <hr class="col-span-2 c:col-span-1 mb-[24px]" />
            </div>
            <!--          <div class="google-map relative space-y-[8px]">-->
            <!--            <span class="inline-block form__label">{{ $t('location') }}</span>-->
            <!--            &lt;!&ndash;        <pre>{{ profile.location }}</pre>&ndash;&gt;-->
            <!--            &lt;!&ndash;        <pre>{{ form.map_location.position }}</pre>&ndash;&gt;-->
            <!--            &lt;!&ndash;        <pre>{{ form.map_location.position.center }}center</pre>&ndash;&gt;-->
            <!--            &lt;!&ndash;        <pre>{{ form.map_location.position.position }}position</pre>&ndash;&gt;-->
            <!--            <GmapAutocomplete-->
            <!--              :placeholder="$t('location_text')"-->
            <!--              class="mb-[8px]"-->
            <!--              :value="form.location_text"-->
            <!--              @place_changed="setPlace"-->
            <!--            />-->
            <!--            <GmapMap-->
            <!--              id="map"-->
            <!--              :key="form.map_location.position"-->
            <!--              ref="mapRef"-->
            <!--              :center="form.map_location.center"-->
            <!--              :zoom="form.map_location.zoom"-->
            <!--              map-type-id="terrain"-->
            <!--              class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"-->
            <!--              @click="getMapPosition"-->
            <!--            >-->
            <!--              <GmapMarker-->
            <!--                :position="form.map_location.position"-->
            <!--                :clickable="true"-->
            <!--                :draggable="true"-->
            <!--                url="https://picsum.photos/30/30"-->
            <!--                :icon="'/icons/volunteer-marker.svg'"-->
            <!--              />-->
            <!--            </GmapMap>-->
            <!--          </div>-->
            <hr class="my-[24px]" />
            <Input
              v-model="form.email"
              :placeholder="$t('enter_post')"
              :label="$t('post')"
              :disabled="false"
              :error="$v.form.email.$error"
              class="mb-[16px]"
            />
            <Input
              v-model="form.about"
              :placeholder="$t('enter_text')"
              :label="$t('about_yourself')"
              textarea
              right-bottom
              maxlength="1000"
              :error="$v.form.about.$error"
              class-input="!pb-[28px] profile-edit__textarea"
            >
              <template #right>
                <span
                  v-if="form.about && form.about.length"
                  class="text-[#BCBFCB] text-[16px] font-semibold"
                  >{{ form.about.length }}/1000</span
                >
              </template>
            </Input>
            <hr class="my-[24px]" />
            <div class="grid grid-cols-2 c:grid-cols-1 gap-[12px] mb-[16px]">
              <Input
                v-model="form.education_level"
                :placeholder="$t('enter_level_education')"
                :label="$t('level_education')"
                select
                :list="educationLevel"
                :error="$v.form.education_level.$error"
              />
              <Input
                v-model="form.languages"
                :placeholder="$t('select_language')"
                :label="$t('languages')"
                select
                multy
                :list="allLangs"
                :error="$v.form.languages.$error"
                @load="($event) => loadMore($event, 'langs')"
              >
                <template #extra>
                  <el-tooltip
                    effect="dark"
                    :content="$t('choose_language')"
                    placement="top"
                  >
                    <svg
                      class="cursor-pointer"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.773438 7.99998C0.773438 4.00881 4.00893 0.773315 8.0001 0.773315C11.9913 0.773315 15.2268 4.00881 15.2268 7.99998C15.2268 11.9912 11.9913 15.2267 8.0001 15.2267C4.00893 15.2267 0.773438 11.9912 0.773438 7.99998ZM8.0001 1.89332C4.62749 1.89332 1.89344 4.62736 1.89344 7.99998C1.89344 11.3726 4.62749 14.1067 8.0001 14.1067C11.3727 14.1067 14.1068 11.3726 14.1068 7.99998C14.1068 4.62736 11.3727 1.89332 8.0001 1.89332Z"
                        fill="#2C2D33"
                      />
                      <path
                        d="M8.52247 4.88514C8.52247 5.17355 8.28866 5.40736 8.00025 5.40736C7.71183 5.40736 7.47803 5.17355 7.47803 4.88514C7.47803 4.59672 7.71183 4.36292 8.00025 4.36292C8.28866 4.36292 8.52247 4.59672 8.52247 4.88514Z"
                        fill="#2C2D33"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.00006 6.32886C8.30934 6.32886 8.56006 6.57958 8.56006 6.88886V10.5926C8.56006 10.9018 8.30934 11.1526 8.00006 11.1526C7.69078 11.1526 7.44006 10.9018 7.44006 10.5926V6.88886C7.44006 6.57958 7.69078 6.32886 8.00006 6.32886Z"
                        fill="#2C2D33"
                      />
                    </svg>
                  </el-tooltip>
                </template>
              </Input>
            </div>
            <Input
              v-model="form.specialty"
              :placeholder="$t('your_special')"
              :label="$t('your_special')"
              :error="$v.form.specialty.$error"
              maxlength="64"
            />
            <Input
              v-model="form.interests"
              :placeholder="$t('enter_your_interesting')"
              :label="$t('your_interesting')"
              :error="$v.form.interests.$error"
              maxlength="64"
              class="my-[16px]"
            />
            <Input
              v-model="form.purpose"
              :placeholder="$t('enter_direction')"
              :label="$t('your_aim')"
              select
              :list="goal"
              multy
              :error="$v.form.purpose.$error"
            >
              <template #extra>
                <el-tooltip
                  effect="dark"
                  :content="`Кликабельное перечисление не более 3х целей из ${goal.length}ти направлений`"
                  placement="top"
                >
                  <svg
                    class="cursor-pointer"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.773438 7.99998C0.773438 4.00881 4.00893 0.773315 8.0001 0.773315C11.9913 0.773315 15.2268 4.00881 15.2268 7.99998C15.2268 11.9912 11.9913 15.2267 8.0001 15.2267C4.00893 15.2267 0.773438 11.9912 0.773438 7.99998ZM8.0001 1.89332C4.62749 1.89332 1.89344 4.62736 1.89344 7.99998C1.89344 11.3726 4.62749 14.1067 8.0001 14.1067C11.3727 14.1067 14.1068 11.3726 14.1068 7.99998C14.1068 4.62736 11.3727 1.89332 8.0001 1.89332Z"
                      fill="#2C2D33"
                    />
                    <path
                      d="M8.52247 4.88514C8.52247 5.17355 8.28866 5.40736 8.00025 5.40736C7.71183 5.40736 7.47803 5.17355 7.47803 4.88514C7.47803 4.59672 7.71183 4.36292 8.00025 4.36292C8.28866 4.36292 8.52247 4.59672 8.52247 4.88514Z"
                      fill="#2C2D33"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.00006 6.32886C8.30934 6.32886 8.56006 6.57958 8.56006 6.88886V10.5926C8.56006 10.9018 8.30934 11.1526 8.00006 11.1526C7.69078 11.1526 7.44006 10.9018 7.44006 10.5926V6.88886C7.44006 6.57958 7.69078 6.32886 8.00006 6.32886Z"
                      fill="#2C2D33"
                    />
                  </svg>
                </el-tooltip>
              </template>
            </Input>
            <VButton
              type="submit"
              class="btn btn--blue max-w-[50%] f:max-w-[100%] ml-auto mt-[24px]"
              :loading="loading"
              :text="$t('save')"
            />
          </Preloader>
        </form>
      </div>
    </client-only>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import { parsePhoneNumber } from 'libphonenumber-js'

import InfoProfile from './infoProfile.vue'
import VButton from './VButton'
import Input from '~/components/form/Input.vue'
import Upload from '~/components/form/Upload.vue'
import Preloader from '~/components/Preloader.vue'

const isPhone = (value) => {
  if (typeof value === 'string') {
    if (value?.length === 0) return true
    const phoneNumber = parsePhoneNumber(value, 'UZ')
    return phoneNumber.isValid()
  } else return true
}
export default {
  components: {
    Preloader,
    VButton,
    Input,
    Upload,
    InfoProfile,
  },
  async fetch() {
    await this.$store.dispatch('profile/fetchProfile')
    await this.$store.dispatch('profile/fetchCountries', {
      limit: 8,
      offset: 0,
    })
    // await this.$store.dispatch('profile/fetchRegions')
    // await this.$store.dispatch('profile/fetchDistricts')
    await this.$store.dispatch('profile/fetchGoals')
    await this.$store.dispatch('profile/fetchLanguages', {
      limit: 8,
      offset: 0,
    })

    this.form.ava = this.profile?.photo
    this.form.name = this.profile?.first_name
    this.form.second_name = this.profile?.last_name
    this.form.third_name = this.profile?.middle_name
    this.form.birthday = this.profile?.date_of_birth
    this.form.region = this.profile?.region_data?.id
    this.form.location = this.profile?.country_data?.id
    if (
      this.allCountries.find((el) => el.id !== this.profile?.country_data?.id)
    )
      this.form.location = this.profile?.country_data?.name
    // this.form.location_text = this.profile?.country_data?.name
    // this.form.map_location.position = {
    //   lat: +this.profile.location.split(',')[0],
    //   lng: +this.profile.location.split(',')[1],
    // }
    // this.form.map_location.center = {
    //   lat: +this.profile.location.split(',')[0],
    //   lng: +this.profile.location.split(',')[1],
    // }
    this.form.district = this.profile?.district_data?.id
    this.form.phone = this.profile?.phone_number
    this.form.email = this.profile?.email
    this.form.show_number = this.profile?.show_phone
    this.form.about = this.profile?.profile
      ? this.profile?.profile?.about_me
      : ''
    this.form.education_level = this.profile?.profile
      ? this.profile?.profile?.education_level
      : ''
    this.form.languages = this.profile?.profile
      ? this.profile?.profile?.languages_data?.map((item) => item.id)
      : ''
    this.form.specialty = this.profile?.profile
      ? this.profile?.profile?.specialty
      : ''
    this.form.interests = this.profile?.profile
      ? this.profile?.profile?.interests
      : ''
    this.form.purpose = this.profile?.profile
      ? this.profile?.profile?.goals_data?.map((item) => item.id)
      : ''
  },
  data() {
    return {
      isContractStatic: localStorage.getItem('is_contract') || false,
      hasMoreData: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      edit: false,
      allLangs: [],
      allCountries: [],
      userProfile: [],
      form: {
        ava: null,
        name: '',
        second_name: '',
        third_name: '',
        birthday: '',
        region: '',
        district: '',
        location: '',
        location_text: 'Toshkent,Uzbekistan',
        phone: '',
        show_number: false,
        email: '',
        about: '',
        education_level: '',
        languages: [],
        specialty: '',
        interests: '',
        purpose: [],
        map_location: {
          position: {
            lat: '',
            lng: '',
          },
          zoom: 16,
          center: { lat: 10, lng: 10 },
          location_name: 'Toshkent,Uzbekistan',
        },
        datePickerLocale: {
          name: 'uz',
          weekdays: [
            this.$t('calendar.weeks.yak'),
            this.$t('calendar.weeks.dush'),
            this.$t('calendar.weeks.sesh'),
            this.$t('calendar.weeks.chor'),
            this.$t('calendar.weeks.pay'),
            this.$t('calendar.weeks.jum'),
            this.$t('calendar.weeks.sham'),
          ],
          months: [
            this.$t('calendar.months.yan'),
            this.$t('calendar.months.fev'),
            this.$t('calendar.months.mart'),
            this.$t('calendar.months.aprel'),
            this.$t('calendar.months.may'),
            this.$t('calendar.months.iyun'),
            this.$t('calendar.months.iyul'),
            this.$t('calendar.months.avg'),
            this.$t('calendar.months.sent'),
            this.$t('calendar.months.okt'),
            this.$t('calendar.months.noy'),
            this.$t('calendar.months.dek'),
          ],
          weekStart: 1,
          weekdaysShort: [
            this.$t('calendar.week_short.yak'),
            this.$t('calendar.week_short.dush'),
            this.$t('calendar.week_short.sesh'),
            this.$t('calendar.week_short.chor'),
            this.$t('calendar.week_short.pay'),
            this.$t('calendar.week_short.jum'),
            this.$t('calendar.week_short.sham'),
          ],
          monthsShort: [
            this.$t('calendar.month_short.yan'),
            this.$t('calendar.month_short.fev'),
            this.$t('calendar.month_short.mart'),
            this.$t('calendar.month_short.aprel'),
            this.$t('calendar.month_short.may'),
            this.$t('calendar.month_short.iyun'),
            this.$t('calendar.month_short.iyul'),
            this.$t('calendar.month_short.avg'),
            this.$t('calendar.month_short.sent'),
            this.$t('calendar.month_short.okt'),
            this.$t('calendar.month_short.noy'),
            this.$t('calendar.month_short.dek'),
          ],
          formats: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'DD/MM/YYYY',
            LL: 'D MMMM YYYY',
            LLL: 'D MMMM YYYY HH:mm',
            LLLL: 'dddd D MMMM YYYY HH:mm',
          },
          ordinal: (n) => `${n}º`,
          buttonCancel: 'Annulla',
          buttonValidate: 'Ok',
          rangeHeaderText: 'Dalle %d Alle 13',
        },
      },
      educationLevel: [
        { name: this.$t('education_medium'), id: 1 },
        { name: this.$t('education_medium_specific'), id: 2 },
        { name: this.$t('bachelor'), id: 3 },
        { name: this.$t('master'), id: 4 },
      ],
      loading: false,
    }
  },
  validations: {
    form: {
      ava: { required },
      name: { required, minLength: minLength(1) },
      second_name: { required, minLength: minLength(1) },
      third_name: { required, minLength: minLength(1) },
      birthday: { required },
      region: { required },
      district: { required },
      location: { required },
      phone: { required, isPhone },
      show_number: {},
      email: { email },
      about: { minLength: minLength(1) },
      education_level: {},
      languages: {},
      specialty: { minLength: minLength(1) },
      interests: { minLength: minLength(1) },
      purpose: {},
    },
  },

  computed: {
    ...mapState({
      profile: (state) => state.profile.profile,
      country: (state) => state.profile.country,
      region: (state) => state.profile.region,
      district: (state) => state.profile.district,
      goal: (state) => state.profile.goal,
      langs: (state) => state.profile.langs,
    }),
    // profileLocation() {
    //   return {
    //     lat: +this.profile.location.split(',')[0],
    //     lng: +this.profile.location.split(',')[1],
    //   }
    // },
  },
  watch: {
    langs() {
      this.allLangs = [...this.allLangs, ...this.langs?.results]
    },
    country() {
      this.allCountries = [...this.allCountries, ...this.country?.results]
    },
    async 'form.location'() {
      if (this.edit) {
        this.form.region = ''
        this.form.district = ''
      }
      await this.$store.dispatch('profile/fetchRegions', {
        country:
          typeof this.form.location === 'string'
            ? this.profile?.country_data?.id
            : this.form.location,
      })
    },
    async 'form.region'() {
      if (this.edit) {
        this.form.district = ''
      }
      await this.$store.dispatch('profile/fetchDistricts', {
        region: this.profile?.region_data?.id,
      })
    },
  },
  methods: {
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
    async loadMore($state) {
      if (this.allLangs.length >= this.langs?.count) {
        $state.complete()
        return
      }
      try {
        const response = await this.$store.dispatch('profile/fetchLanguages', {
          limit: 8,
          offset: this.allLangs.length,
        })
        const newData = response?.results || []
        this.allLangs = [...this.allLangs, ...newData]
        this.hasMoreData = newData.length > 0
        $state.loaded()
      } catch (error) {
        console.error('Error fetching more languages:', error)
        $state.complete()
      }
    },

    async checkForm() {
      this.$v.form.$touch()
      this.$validateForm(this.$v.form)

      if (!this.$v.form.$error) {
        this.loading = true

        const formData = new FormData()
        // ! For photo upload
        if (this.profile.photo !== this.form.ava) {
          formData.append('photo', this.form.ava)
          await this.$axios
            .patch('photo_update/', formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(async (res) => {
              this.$fetch()
              await this.$auth.fetchUser()
            })
            .catch((err) => {
              console.log(err)
            })
        }
        await this.$axios
          .patch(
            `volunteer_profile/`,
            {
              first_name: this.form.name,
              last_name: this.form.second_name,
              middle_name: this.form.third_name,
              email: this.form.email,
              // eslint-disable-next-line
              phone_number: this.form.phone.replace(/\s|\)|\(|\-/g, ''),
              date_of_birth: this.$moment(this.form.birthday, 'YYYY-MM-DD'),
              country: this.form.location,
              // location_text: this.form.location_text,
              // location:
              //   this.form.map_location.position.lat +
              //   ',' +
              //   this.form.map_location.position.lng,
              region: this.form.region,
              district: this.form.district,
              // region: this.region.find(
              //   (item) =>
              //     item.name === this.form.region || item.id === this.form.region
              // ).id,
              // district: this.district.find(
              //   (item) =>
              //     item.name === this.form.district ||
              //     item.id === this.form.district
              // ).id,
              profile: {
                about_me: this.form.about,
                education_level: this.form.education_level,
                specialty: this.form.specialty,
                languages: this.form.languages,
                interests: this.form.interests,
                goals: this.form.purpose,
              },
              show_phone: this.form.show_number,
            },
            {
              headers: {
                'Accept-Language': this.$i18n.locale,
              },
            }
          )
          .then(async () => {
            this.$toast.success(this.$t('successfully_edited'))
            this.$fetch()
            await this.$auth.fetchUser()
            setTimeout(async () => {
              this.edit = false
              await this.scrollToTop()
            }, 400)
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 400)
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
hr {
  border-color: rgba(128, 129, 133, 0.15);
}
</style>

<style lang="scss">
//.infinite-loading-container {
//  display: none !important;
//}
@media screen and (max-width: 500px) {
  .el-tooltip__popper {
    max-width: 80%;
  }
}
.el-tag {
  background: #fff !important;
  border-radius: 4px;
  // padding: 4px 8px;
  color: #52230f !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  white-space: normal;
  height: auto;
  border-color: #ff753c !important;

  .el-icon-close {
    background: transparent !important;
    color: #fff !important;
    transform: scale(1) !important;
  }
}

.profile-edit__textarea {
  overflow-y: scroll;
}

.profile-edit__textarea::-webkit-scrollbar-track {
  background: transparent;
}
</style>
