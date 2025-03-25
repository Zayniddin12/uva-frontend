<template>
  <div class="bg-white">
    <div class="auth verification f:w-max !max-w-[584px] mx-[auto]">
      <v-stepper v-model="form.step">
        <v-stepper-items>
          <!--        VERIFICATION CODE STEP-->
          <v-stepper-content class="verification__code-step" step="1">
            <form @submit.prevent="personalCodeBtn">
              <v-card>
                <AuthHeader
                  v-bind="{
                    title: $t('registration'),
                    subtitle: authorPhone
                      ? $t('enter_code_for_verification')
                      : $t('enter_email_verification'),
                    phone: authorPhone,
                    email: authorEmail,
                  }"
                />
                <label for="personal_code">
                  <p>{{ $t('personal_code') }}<span>*</span></p>
                  <input
                    id="personal_code"
                    v-model="form.code"
                    :class="{
                      'error-input': $v.form.code.$error,
                    }"
                    type="number"
                    :placeholder="$t('personal_code_placeholder')"
                  />
                </label>
              </v-card>
              <transition name="slide-down">
                <div class="sub-link">
                  <div class="flex justify-center py-2">
                    <!--                    <Counter v-if="!isShowResend" @finished="stopCounting" />-->
                    <MinuteCounter
                      v-if="!isShowResend"
                      :seconds="120"
                      @finished="stopCounting"
                    />
                    <button
                      v-else
                      :disabled="loadingCode"
                      type="button"
                      class="button"
                      @click.prevent="sendPhone"
                    >
                      {{ $t('resend') }}
                      <icon-base
                        :class="{ animited: loadingCode }"
                        name="restart"
                      />
                    </button>
                  </div>
                </div>
              </transition>
              <div class="verification__btns">
                <v-btn class="back-btn" @click.native="$router.go(-1)">
                  {{ $t('back') }}
                </v-btn>
                <v-btn :disabled="loading" type="submit" class="continue-btn">
                  {{ $t('continue') }}
                  <icon-base v-if="loading" name="rolling" />
                </v-btn>
              </div>
              <div class="auth__not-account">
                <p>{{ $t('have_account') }}</p>
                <nuxt-link :to="localePath('/auth/login')">{{
                  $t('sign_in')
                }}</nuxt-link>
              </div>
            </form>
          </v-stepper-content>

          <!--        VERIFICATION PASSWORD STEP-->
          <v-stepper-content class="verification__password-step" step="2">
            <form @submit.prevent="passwordBtn">
              <v-card>
                <AuthHeader
                  v-bind="{
                    title: $t('registration'),
                    subtitle: $t('create_password_to_keep'),
                  }"
                />
                <label class="label-password">
                  <p>{{ $t('create_password') }} <span>*</span></p>
                  <!--              :class-name="$v.password.$anyError"-->
                  <Password
                    v-model="form.password"
                    :placeholder="$t('enter_password')"
                    :class="{ 'error-input': $v.form.password.$error }"
                  />
                </label>
                <label>
                  <p>{{ $t('repeat_password') }} <span>*</span></p>
                  <Password
                    v-model="form.password2"
                    v-bind="{ indexVal: 2 }"
                    :placeholder="$t('enter_password')"
                    :class="{
                      'error-input': $v.form.password2.$anyError,
                    }"
                  />
                </label>
              </v-card>
              <div class="verification__btns">
                <v-btn class="back-btn" @click="form.step = 1">{{
                  $t('back')
                }}</v-btn>
                <v-btn class="continue-btn" type="submit">{{
                  $t('continue')
                }}</v-btn>
              </div>
              <div class="auth__not-account">
                <p>{{ $t('have_account') }}</p>
                <nuxt-link :to="localePath('/auth/login')">{{
                  $t('sign_in')
                }}</nuxt-link>
              </div>
            </form>
          </v-stepper-content>

          <!--        VERIFICATION PERSONAL DATA STEP-->
          <v-stepper-content step="3" class="verification__personal-data-step">
            <client-only>
              <form @submit.prevent="sendForm">
                <v-card>
                  <AuthHeader
                    v-bind="{
                      title: $t('welcome_to_the_ranks'),
                      subtitle: $t('enter_your_personal_data'),
                    }"
                  />
                  <div>
                    <div class="verification__form">
                      <FormGroup
                        class="custom-size"
                        :label="$t('user_name')"
                        required
                        for-id="user_name"
                      >
                        <FormInput
                          id="user_name"
                          v-model="form.first_name"
                          maxlength="32"
                          :error="$v.form.first_name.$error"
                          :placeholder="$t('enter_user_name')"
                          input-style="!border-none"
                          @input="$v.form.first_name.$touch"
                        />
                        <p
                          v-if="$v.form.first_name.$dirty"
                          class="absolute bottom-[-20px] left-0 text-[10px] whitespace-nowrap text-red"
                        >
                          <span v-if="!$v.form.first_name.maxLength">
                            {{ $t('no_more_than_32') }}
                          </span>
                        </p>
                      </FormGroup>
                      <FormGroup
                        class="custom-size"
                        :label="$t('surname')"
                        required
                        for-id="last_name"
                      >
                        <FormInput
                          id="last_name"
                          v-model="form.last_name"
                          :error="$v.form.last_name.$error"
                          maxlength="32"
                          :placeholder="$t('enter_surname')"
                          input-style="!border-none"
                          @input="$v.form.last_name.$touch"
                        />
                        <p
                          v-if="$v.form.last_name.$dirty"
                          class="absolute bottom-[-20px] left-0 text-[10px] whitespace-nowrap text-red"
                        >
                          <span v-if="!$v.form.last_name.maxLength">
                            {{ $t('no_more_than_32') }}
                          </span>
                        </p>
                      </FormGroup>
                      <FormGroup
                        class="custom-size"
                        :label="$t('patronymic')"
                        required
                        for-id="middle_name"
                      >
                        <FormInput
                          id="middle_name"
                          v-model="form.middle_name"
                          maxlength="32"
                          :error="$v.form.middle_name.$error"
                          :placeholder="$t('enter_middle_name')"
                          input-style="!border-none"
                          @input="$v.form.middle_name.$touch"
                        />
                        <p
                          v-if="$v.form.middle_name.$dirty"
                          class="absolute bottom-[-20px] left-0 text-[10px] whitespace-nowrap text-red"
                        >
                          <span v-if="!$v.form.middle_name.maxLength">
                            {{ $t('no_more_than_32') }}
                          </span>
                        </p>
                      </FormGroup>

                      <label for="dateTime">
                        <p>{{ $t('birthday') }} <span>*</span></p>
                        <el-date-picker
                          id="dateTime"
                          v-model="form.date_of_birth"
                          class="data-picker"
                          :data-inputmask="{ mask: '##.##.##' }"
                          format="dd.MM.yyyy"
                          value-format="yyyy-MM-dd"
                          type="date"
                          :placeholder="$t('dateFormat')"
                          :class="{ _error: $v.form.date_of_birth.$error }"
                          :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                      </label>

                      <label for="Gender">
                        <p>{{ $t('gender') }} <span>*</span></p>
                        <el-select
                          id="country"
                          v-model="form.gender"
                          filterable
                          :class="{ 'error-input': $v.form.country.$error }"
                          :placeholder="$t('enter_gender')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_data_title')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, index) in allGender"
                            :key="index"
                            :label="item?.name"
                            :value="item?.id"
                          >
                          </el-option>
                        </el-select>
                      </label>

                      <label for="country">
                        <p>{{ $t('country') }} <span>*</span></p>
                        <el-select
                          id="country"
                          v-model="form.country"
                          filterable
                          :class="{ 'error-input': $v.form.country.$error }"
                          :placeholder="$t('enter_country')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_data_title')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, index) in allCountries"
                            :key="index"
                            :label="item?.name"
                            :value="item?.id"
                            @click.native="getRegions(item?.id)"
                          >
                          </el-option>
                          <infinite-loading @infinite="infiniteHandler"
                            ><span slot="no-more">
                              {{ $t('no_more_data') }}
                            </span>
                          </infinite-loading>
                        </el-select>
                      </label>
                      <label for="region">
                        <p>{{ $t('region') }} <span>*</span></p>
                        <el-select
                          v-if="regions"
                          id="region"
                          v-model="form.region"
                          filterable
                          :loading="regionLoad"
                          :class="{ 'error-input': $v.form.region.$error }"
                          :disabled="!form.country"
                          :placeholder="$t('enter_region')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_region')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, idx) in regions.results"
                            :key="idx"
                            :label="item?.name"
                            :value="item?.id"
                            @click.native="getDistricts(item?.id)"
                          >
                          </el-option>
                        </el-select>
                      </label>
                      <label for="town">
                        <p>{{ $t('region_town') }} <span>*</span></p>
                        <el-select
                          v-if="districts"
                          id="town"
                          v-model="form.district"
                          filterable
                          :loading="districtLoad"
                          :class="{ 'error-input': $v.form.district.$error }"
                          :disabled="!form.region"
                          :placeholder="$t('enter_region_town')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_data_title')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, i) in districts.results"
                            :key="i"
                            :label="item?.name"
                            :value="item?.id"
                          >
                          </el-option>
                        </el-select>
                      </label>
                      <label for="email">
                        <p>{{ $t('tip_volunteer') }}</p>
                        <el-select
                          v-if="tipVolunteers"
                          id="email"
                          v-model="form.volunteerType"
                          filterable
                          :class="{
                            'error-input': $v.form.volunteerType.$error,
                          }"
                          :placeholder="$t('enter_tip')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_data_title')"
                        >
                          <el-option
                            v-for="(item, i) in tipVolunteers"
                            :key="i"
                            :label="item?.name"
                            :value="item?.id"
                          >
                          </el-option>
                        </el-select>
                      </label>
                    </div>
                    <div class="py-[18.5px]">
                      <el-checkbox v-model="form.show_number">
                        <p
                          class="font-semibold text-sm leading-[19px] text-[#52230F]"
                        >
                          {{ $t('show_number') }}
                        </p>
                      </el-checkbox>
                    </div>
                    <div class="upload-file" @dragover.prevent @drop.prevent>
                      <label for="upload-file">
                        <p>{{ $t('photo') }}</p>
                        <input
                          id="upload-file"
                          type="file"
                          accept="image/*"
                          @change="uploadFile"
                        />
                        <div
                          class="upload-absolute !cursor-pointer"
                          @drop="dragFile"
                        >
                          <div
                            class="upload-file-box flex justify-between align-center"
                          >
                            <div class="text">
                              <p v-if="!form.file.length">
                                {{ $t('drag_image_or') }}
                              </p>
                              <div v-else>
                                <div v-if="form.file.length">
                                  <ul v-for="file in form.file" :key="file">
                                    <li>{{ file?.name }}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="btn max-w-[163px]">
                              {{ $t('select_file') }}
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>

                    <!--                    <div class="google-map relative mb-[24px]">-->
                    <!--                      <label for="map" class="block w-full">-->
                    <!--                        <p>{{ $t('location') }} <span>*</span></p>-->
                    <!--                        <GmapAutocomplete-->
                    <!--                          id="map"-->
                    <!--                          :class="{ 'error-input': $v.form.position.$error }"-->
                    <!--                          :value="form.location_text"-->
                    <!--                          :placeholder="$t('location_text')"-->
                    <!--                          class="mb-[8px]"-->
                    <!--                          @place_changed="setPlace"-->
                    <!--                        />-->
                    <!--                        <GmapMap-->
                    <!--                          :key="form.position"-->
                    <!--                          ref="mapRef"-->
                    <!--                          :center="form.position.center"-->
                    <!--                          :zoom="form.position.zoom"-->
                    <!--                          map-type-id="terrain"-->
                    <!--                          class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"-->
                    <!--                          @click="getMapPosition"-->
                    <!--                        >-->
                    <!--                          <GmapMarker-->
                    <!--                            :position="form.position"-->
                    <!--                            :clickable="true"-->
                    <!--                            :draggable="true"-->
                    <!--                            url="https://picsum.photos/30/30"-->
                    <!--                            :icon="'/icons/volunteer-marker.svg'"-->
                    <!--                          />-->
                    <!--                        </GmapMap>-->
                    <!--                      </label>-->
                    <!--                    </div>-->
                    <el-checkbox-group
                      v-model="form.is_verified"
                      :class="{ _error: $v.form.is_verified.$error }"
                    >
                      <el-checkbox>
                        <p>
                          {{ $t('clicking_letsgo') }}
                          <nuxt-link
                            :to="localePath('/auth/public-offer')"
                            target="_blank"
                          >
                            {{ $t('privacy_policy') }}
                          </nuxt-link>
                          {{ $t('give_consent') }}
                        </p>
                      </el-checkbox>
                    </el-checkbox-group>
                    <div class="verification__btns">
                      <v-btn class="back-btn" text @click="form.step = 2">{{
                        $t('back')
                      }}</v-btn>
                      <v-btn
                        :disabled="loading"
                        class="continue-btn"
                        type="submit"
                        @submit.prevent="sendForm"
                      >
                        {{ $t('continue') }}
                        <icon-base v-if="loading" name="rolling" />
                      </v-btn>
                    </div>
                    <div class="auth__not-account">
                      <p>{{ $t('have_account') }}</p>
                      <nuxt-link :to="localePath('/auth/login')">{{
                        $t('sign_in')
                      }}</nuxt-link>
                    </div>
                  </div>
                </v-card>
              </form>
            </client-only>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <recaptcha />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  required,
  minLength,
  sameAs,
  maxLength,
} from 'vuelidate/lib/validators'
import FormGroup from '@/components/new/Form/CGroup.vue'
import FormInput from '@/components/new/Form/Input.vue'
import MinuteCounter from '@/components/MinuteCounter.vue'
import { debounce } from '@/helpers'
import IconBase from '../../components/volontyor/IconBase.vue'
import Password from '~/components/form/Password.vue'
import AuthHeader from '~/components/auth/AuthHeader'

export default {
  layout: 'pages',
  components: {
    MinuteCounter,
    FormInput,
    FormGroup,
    Password,
    AuthHeader,
    IconBase,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  async fetch() {
    await this.$store.dispatch('profile/fetchCountries', {
      limit: 8,
      offset: 0,
    })
    // await this.$getAction('/countries/')
    //   .then((response) => {
    //     if (response) {
    //       this.countries = response.results
    //     }
    //   })
    //   .finally(() => {
    //     this.countryLoad = false
    //   })
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },

      isShowResend: false,
      loading: false,
      loadingCode: false,
      regionLoad: false,
      districtLoad: false,
      File: [],
      step: 1,
      allCountries: [],
      allGender: [
        { id: 1, name: this.$t('male') },
        { id: 2, name: this.$t('female') },
      ],
      regions: [],
      districts: [],
      tipVolunteers: [
        { name: this.$t('eco_volunteer'), id: 1 },
        { name: this.$t('soc_volunteer'), id: 2 },
        { name: this.$t('medic_volunteer'), id: 3 },
      ],
      form: {
        gender: '',
        step: 1,
        code: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        date_of_birth: undefined,
        country: '',
        region: '',
        district: '',
        volunteerType: '',
        file: [],
        is_verified: false,
        show_number: false,
        location_text: '',
        position: {
          lat: '',
          lng: '',
          zoom: 2,
          center: { lat: 10, lng: 10 },
        },
      },
      timer: 1,
      interval: null,
    }
  },
  validations: {
    form: {
      code: { required, minLength: minLength(6) },
      first_name: {
        required,
        maxLength: maxLength(32),
      },
      last_name: {
        required,
        maxLength: maxLength(32),
      },
      middle_name: {
        required,
        maxLength: maxLength(32),
      },
      date_of_birth: {
        required,
      },
      country: { required },
      region: { required },
      district: { required },
      volunteerType: { required },
      is_verified: { required, checked: (value) => value === true },
      password: { required, minLength: minLength(6) },
      password2: { required, sameAsPassword: sameAs('password') },
      // position: {
      //   lat: { required },
      //   lng: { required },
      // },
    },
  },
  computed: {
    ...mapState({
      authorPhone: (state) => state.author.phone,
      authorEmail: (state) => state.author.email,
      globalTab: (state) => state.author.formTab,
      volunteerForm: (state) => state.volunteerForm,
      country: (state) => state.profile.country,
    }),
  },
  watch: {
    country() {
      this.allCountries = [...this.allCountries, ...this.country?.results]
    },
    '$i18n.locale'() {
      this.$store.commit('setVolunteerForm', this.form)
    },
  },
  mounted() {
    if (!this.authorPhone && !this.authorEmail) {
      this.$router.push(`/${this.$i18n.locale}/auth`)
    }
    if (this.volunteerForm) {
      this.form.step = this.volunteerForm.step
      this.form.code = this.volunteerForm.code
      this.form.password = this.volunteerForm.password
      this.form.password2 = this.volunteerForm.password2
      this.form.first_name = this.volunteerForm.first_name
      this.form.last_name = this.volunteerForm.last_name
      this.form.middle_name = this.volunteerForm.middle_name
      this.form.date_of_birth = this.volunteerForm.date_of_birth
      this.form.country = this.volunteerForm.country
      this.form.region = this.volunteerForm.region
      this.form.district = this.volunteerForm.district
      // this.form.email = this.volunteerForm.email
      this.form.file = this.volunteerForm.file
      this.form.is_verified = this.volunteerForm.is_verified
      this.form.show_number = this.volunteerForm.show_phone
    }
  },
  methods: {
    filterCountries(country) {
      debounce(
        'searchRegions',
        () => {
          this.$axios
            .$get(`countries`, {
              params: {
                search: country,
              },
            })
            .then((res) => {
              this.allCountries = res.results
            })
        },
        400
      )
    },
    async infiniteHandler($state) {
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
      if (target) {
        this.form.position.lat = target.geometry.location.lat()
        this.form.position.lng = target.geometry.location.lng()
        this.form.position.zoom = 16
        this.form.position.center.lat = this.form.position.lat
        this.form.position.center.lng = this.form.position.lng
        this.form.location_text = target.formatted_address
      }
    },
    getMapPosition(target) {
      this.form.position.lat = target.latLng.lat()
      this.form.position.lng = target.latLng.lng()
    },
    stopCounting() {
      this.isShowResend = true
    },
    async sendPhone() {
      this.loadingCode = true
      if (this.globalTab === 'phone') {
        await this.$axios
          .$post('user_phone_code/', {
            phone_number: this.authorPhone,
          })
          .then(() => {
            this.$toast.success(this.$t('code_sent'))
            this.isShowResend = false
          })
          .catch((err) => {
            this.$getErrorMessage(err)
          })
          .finally(() => {
            this.loadingCode = false
          })
      } else {
        await this.$axios
          .$post('user_email_code/', {
            email: this.authorEmail,
          })
          .then(() => {
            this.$toast.success(this.$t('code_sent'))
            this.isShowResend = false
          })
          .catch((err) => {
            this.$getErrorMessage(err)
          })
          .finally(() => {
            this.loadingCode = false
          })
      }
    },
    async getRegions(countryId) {
      this.form.region = ''
      this.form.district = ''
      this.regionLoad = true
      await this.$getAction('/regions/', {
        params: {
          country: countryId,
          limit: 30,
        },
      })
        .then((response) => {
          this.regions = response
        })
        .finally(() => {
          this.regionLoad = false
        })
    },
    async getDistricts(regionId) {
      this.form.district = ''
      this.districtLoad = true
      await this.$getAction('/districts/', {
        params: {
          region: regionId,
          limit: 30,
        },
      })
        .then((response) => {
          this.districts = response
        })
        .finally(() => {
          this.districtLoad = false
        })
    },
    uploadFile(e) {
      if (e) {
        this.form.file = e.target.files
      }
    },
    dragFile(e) {
      if (e) {
        this.form.file = e.dataTransfer.files
      }
    },
    async personalCodeBtn() {
      this.$v.form.code.$touch()

      if (this.$v.form.code.$error)
        return this.$validateForm(this.$v.form.code, 'code')
      this.loading = true

      if (this.globalTab === 'phone') {
        await this.$axios
          .$post('/code_verification/', {
            phone_number: this.authorPhone?.replace(/\s|\)|\(|-/g, ''),
            code: this.form.code,
          })
          .then(() => {
            this.form.step = 2
          })
          .catch((err) => {
            this.$getErrorMessage(err)
            this.isShowResend = false
            this.startCountDown()
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        await this.$axios
          .$post('/code_verification_via_email/', {
            email: this.authorEmail,
            code: this.form.code,
          })
          .then(() => {
            this.form.step = 2
          })
          .catch((err) => {
            this.$getErrorMessage(err)
            this.isShowResend = false
            this.startCountDown()
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    passwordBtn() {
      this.$v.form.password.$touch()
      this.$v.form.password2.$touch()

      if (this.$v.form.password.$anyError)
        return this.$validateForm(this.$v.form.password, 'password')
      if (this.$v.form.password2.$anyError)
        return this.$validateForm(this.$v.form.password2, 'password-repeat')

      this.form.step = 3
    },
    async sendForm() {
      this.$v.form.$touch()

      if (this.$v.form.$error) return this.$validateForm(this.$v.form)
      this.loading = true

      const formData = new FormData()
      if (this.globalTab === 'phone') {
        formData.append(
          'phone_number',
          this.authorPhone?.replace(/\s|\)|\(|-/g, '')
        )
      } else {
        formData.append('email', this.authorEmail)
      }
      formData.append('first_name', this.form.first_name)
      formData.append('last_name', this.form.last_name)
      formData.append('middle_name', this.form.middle_name)

      formData.append(
        'volunteer_type',
        this.form.volunteerType === 3 ? 1 : this.form.volunteerType
      ) // this.form.tipVolunteer
      formData.append(
        'date_of_birth',
        this.$moment(this.form.date_of_birth, 'YYYY-MM-DD')
      )
      formData.append('country', this.form.country)
      // formData.append(
      //   'location',
      //   this.form.position.lat + ',' + this.form.position.lng
      // )
      formData.append('region', this.form.region)
      formData.append('district', this.form.district)
      // formData.append(
      //   'phone',
      //   this.form.phone.slice(4).replace(/\s|\)|\(|-/g, '')
      // )this.form.tipVolunteer
      formData.append('password', this.form.password)
      formData.append('password2', this.form.password2)
      formData.append('photo', this.form.file.length ? this.form.file[0] : '')
      formData.append('show_phone', this.form.show_number)
      formData.append('gender', this.form.gender)

      await this.$axios
        .$post('/auth/register_volunteer/', formData)
        .then(async () => {
          if (this.globalTab === 'phone') {
            await this.login(
              this.authorPhone?.replace(/\s|\)|\(|-/g, ''),
              this.form.password
            )
          } else {
            await this.login(this.authorEmail, this.form.password)
          }
        })
        .catch((err) => {
          this.$getErrorMessage(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async login(phone, password) {
      this.loading = true

      if (this.globalTab === 'phone') {
        await this.$auth
          .loginWith('local1', {
            data: { phone_number: phone, password },
          })
          .then(async () => {
            await this.$auth.fetchUser()
            this.$toast.success(this.$t('welcome_to_volunteers_of_uz'))
          })
          .catch((err) => {
            this.$getErrorMessage(err)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        await this.$auth
          .loginWith('local2', {
            data: { email: phone, password },
          })
          .then(async () => {
            await this.$auth.fetchUser()
            this.$toast.success(this.$t('welcome_to_volunteers_of_uz'))
          })
          .catch((err) => {
            this.$getErrorMessage(err)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>
<style lang="scss">
.custom-size {
  display: block;
  width: 48%;
  @media screen and (max-width: 450px) {
    width: 100%;
  }
}
.google-map {
  .gm-svpc,
  .gm-fullscreen-control,
  .gm-style-mtc,
  .gm-style-cc {
    display: none !important;
  }
}

.verification__personal-data-step {
  .el-checkbox {
    p {
      font-weight: 600 !important;
      font-size: 14px !important;
      line-height: 19px !important;
      color: #bcbfcb !important;
    }
  }
}
</style>
