<template>
  <div style="background-color: #fff">
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
                    v-mask="'######'"
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
                  <!--              :class-name="$v.password.$anyError"-->
                  <Password
                    v-model="form.repeatPassword"
                    v-bind="{ indexVal: 2 }"
                    :placeholder="$t('enter_password')"
                    :class="{ 'error-input': $v.form.repeatPassword.$anyError }"
                  />
                </label>
              </v-card>
              <div class="verification__btns">
                <v-btn class="back-btn" @click="form.step = 1">{{
                  $t('back')
                }}</v-btn>
                <v-btn type="submit" class="continue-btn">{{
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

          <!--        VERIFICATION CHECKBOX STEP-->
          <v-stepper-content class="verification__checkbox-step" step="3">
            <form @submit.prevent="nexStep(3)">
              <v-card>
                <AuthHeader
                  v-bind="{
                    title: $t('welcome_to_the_ranks'),
                    subtitle: $t('select_form_activity'),
                  }"
                />

                <v-radio-group
                  v-if="organizations"
                  v-model="form.organizationType"
                >
                  <v-radio
                    v-for="(item, id) in organizations"
                    :key="id"
                    :label="item.name"
                    :value="item.id"
                  ></v-radio>
                </v-radio-group>
              </v-card>
              <div class="verification__btns">
                <v-btn class="back-btn" text @click="form.step = 2">{{
                  $t('back')
                }}</v-btn>
                <v-btn class="continue-btn" type="submit">{{
                  $t('continue')
                }}</v-btn>
              </div>
            </form>
          </v-stepper-content>

          <!--        VERIFICATION PERSONAL DATA STEP-->
          <v-stepper-content step="4" class="verification__personal-data-step">
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
                        class="!w-full"
                        :label="$t('name')"
                        required
                        for-id="name"
                      >
                        <FormInput
                          id="name"
                          v-model="form.organizationName"
                          maxlength="56"
                          :error="$v.form.organizationName.$error"
                          :placeholder="$t('enter_name')"
                          input-style="!border-none"
                          @input="$v.form.organizationName.$touch"
                        />
                        <p
                          v-if="$v.form.organizationName.$dirty"
                          class="absolute bottom-[-20px] left-0 text-[10px] whitespace-nowrap text-red"
                        >
                          <span v-if="!$v.form.organizationName.maxLength">
                            {{ $t('no_more_than_56') }}
                          </span>
                        </p>
                      </FormGroup>
                      <FormGroup
                        class="custom-size"
                        :label="$t('contact_person')"
                        required
                        for-id="contact_person"
                      >
                        <FormInput
                          id="contact_person"
                          v-model="form.personName"
                          :error="$v.form.personName.$error"
                          :placeholder="$t('enter_contact_person')"
                          input-style="!border-none"
                          maxlength="56"
                          @input="$v.form.personName.$touch"
                        />
                        <p
                          v-if="$v.form.personName.$dirty"
                          class="absolute bottom-[-20px] left-0 text-[10px] whitespace-nowrap text-red"
                        >
                          <span v-if="!$v.form.personName.maxLength">
                            {{ $t('no_more_than_56') }}
                          </span>
                        </p>
                      </FormGroup>
                      <label for="country">
                        <p>{{ $t('country') }} <span>*</span></p>
                        <el-select
                          id="country"
                          v-model="form.country"
                          filterable
                          :filter-method="filterCountries"
                          :class="{ 'error-input': $v.form.country.$error }"
                          :placeholder="$t('enter_country')"
                          :no-match-text="$t('no_data_title')"
                          :no-data-text="$t('no_data_title')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, index) in allCountries"
                            :key="index"
                            :label="item.name ? item.name : ''"
                            :value="item.id"
                            @click.native="getRegions(item.id)"
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
                          :no-data-text="$t('no_data_title')"
                          :loading-text="$t('loading')"
                        >
                          <el-option
                            v-for="(item, idx) in regions.results"
                            :key="idx"
                            :label="item.name"
                            :value="item.id"
                            @click.native="getDistricts(item.id)"
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
                            :label="item.name"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </label>
                    </div>
                    <label for="about_textarea">
                      <div class="flex justify-between">
                        <p>{{ $t('about_organization_text') }}</p>
                        <span> {{ form.about.length }}/1000 </span>
                      </div>
                      <textarea
                        id="about_textarea"
                        v-model="form.about"
                        :class="{ 'error-input': $v.form.about.$error }"
                        :placeholder="$t('about_organization')"
                        maxlength="1000"
                      />
                    </label>
                    <div class="upload-file" @dragover.prevent @drop.prevent>
                      <label for="upload-file">
                        <p>{{ $t('logo') }}</p>
                        <input
                          id="upload-file"
                          accept="image/*"
                          type="file"
                          @change="uploadFile"
                        />
                        <div class="upload-absolute" @drop="dragFile">
                          <div
                            class="upload-file-box flex justify-between align-center"
                          >
                            <div class="text line-clamp-2">
                              <p v-if="!form.file.length">
                                {{ $t('drag_image_or') }}
                              </p>
                              <div v-else>
                                <div v-if="form.file.length">
                                  <ul v-for="file in form.file" :key="file">
                                    <li>{{ file.name }}</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div
                              class="btn max-w-[163px] g:!px-[11px] cursor-pointer hover:!bg-blue-400 duration-200 ease-in-out"
                            >
                              {{ $t('select_file') }}
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div class="google-map relative mb-[24px]">
                      <label for="map" class="block w-full">
                        <p>{{ $t('location') }} <span>*</span></p>
                        <GmapAutocomplete
                          id="map"
                          :placeholder="$t('location_text')"
                          class="mb-[8px]"
                          :class="{ 'error-input': $v.form.position.$error }"
                          @place_changed="setPlace"
                        />
                        <GmapMap
                          :key="form.position"
                          ref="mapRef"
                          :center="form.position.center"
                          :zoom="form.position.zoom"
                          map-type-id="terrain"
                          class="rounded-[12px] w-[100%] h-[308px] overflow-hidden"
                          @click="getMapPosition"
                        >
                          <GmapMarker
                            :position="form.position"
                            :clickable="true"
                            :draggable="true"
                            url="https://picsum.photos/30/30"
                            :icon="'/icons/volunteer-marker.svg'"
                          />
                        </GmapMap>
                      </label>
                    </div>
                    <el-checkbox-group
                      v-model="form.checked"
                      :class="{ _error: $v.form.checked.$error }"
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
                      <v-btn class="back-btn" text @click="form.step = 3">{{
                        $t('back')
                      }}</v-btn>
                      <v-btn
                        :disabled="loading"
                        type="submit"
                        class="continue-btn"
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
import IconBase from '../../components/volontyor/IconBase.vue'
import { debounce } from '../../helpers'
import Password from '~/components/form/Password.vue'
import AuthHeader from '~/components/auth/AuthHeader'
// import Counter from '~/components/Counter.vue'

export default {
  layout: 'pages',
  components: {
    MinuteCounter,
    Password,
    AuthHeader,
    // Counter,
    IconBase,
    FormInput,
    FormGroup,
  },
  async fetch() {
    await this.$store.dispatch('profile/fetchCountries', {
      limit: 8,
      offset: 0,
    })
    await this.$getAction('/organization_type_list/').then((response) => {
      this.organizations = response.results
    })
  },
  data() {
    return {
      isShowResend: false,
      loading: false,
      loadingCode: false,
      countryLoad: true,
      regionLoad: false,
      districtLoad: false,
      organizations: [],
      allCountries: [],
      regions: [],
      districts: [],
      form: {
        step: 1,
        code: '',
        password: '',
        repeatPassword: '',
        organizationType: undefined,
        organizationName: '',
        personName: '',
        country: '',
        region: '',
        district: '',
        about: '',
        file: [],
        checked: false,
        position: {
          lat: '',
          lng: '',
          zoom: 2,
          center: { lat: 10, lng: 10 },
        },
      },
      interval: null,
      timer: 0,
      resend: false,
    }
  },
  validations: {
    form: {
      code: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('password') },
      organizationType: { required },
      organizationName: {
        required,
        maxLength: maxLength(56),
      },
      personName: {
        required,
        maxLength: maxLength(56),
      },
      country: { required },
      region: { required },
      district: { required },
      about: { minLength: minLength(15) },
      checked: { required, checked: (value) => value === true },
      position: {
        lat: { required },
        lng: { required },
      },
    },
  },
  computed: {
    ...mapState({
      authorPhone: (state) => state.author.phone,
      authorEmail: (state) => state.author.email,
      globalTab: (state) => state.author.formTab,
      organizationForm: (state) => state.organizationForm,
      country: (state) => state.profile.country,
    }),
  },
  watch: {
    country() {
      this.allCountries = [...this.allCountries, ...this.country?.results]
    },
    '$i18n.locale'() {
      this.$store.commit('setOrganizationForm', this.form)
    },
  },
  mounted() {
    if (!this.authorPhone && !this.authorEmail) {
      this.$router.push(`/${this.$i18n.locale}/auth`)
    }
    if (this.organizationForm) {
      this.form.step = this.organizationForm.step
      this.form.code = this.organizationForm.code
      this.form.password = this.organizationForm.password
      this.form.repeat_password = this.organizationForm.repeat_password
      this.form.organizationType = this.organizationForm.organizationType
      this.form.organizationName = this.organizationForm.organizationName
      this.form.personName = this.organizationForm.personName
      this.form.country = this.organizationForm.country
      this.form.region = this.organizationForm.region
      this.form.district = this.organizationForm.district
      this.form.file = this.organizationForm.file
      this.form.about = this.organizationForm.about
      this.form.checked = this.organizationForm.checked
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
      }
    },
    getMapPosition(target) {
      this.form.position.lat = target.latLng.lat()
      this.form.position.lng = target.latLng.lng()
    },
    stopCounting() {
      this.isShowResend = true
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
      this.form.file = e.target.files
    },
    dragFile(e) {
      this.form.file = e.dataTransfer.files
    },
    nexStep(step) {
      this.$v.form.organizationType.$touch()

      if (this.$v.form.organizationType.$anyError)
        return this.$validateForm(
          this.$v.form.organizationType,
          'organization_type'
        )

      this.form.step = 4
    },
    async personalCodeBtn() {
      this.$v.form.code.$touch()
      if (this.$v.form.code.$error)
        return this.$validateForm(this.$v.form.code, 'code')

      this.loading = true

      if (this.globalTab === 'phone') {
        await this.$axios
          .$post('/code_verification/', {
            phone_number: this.authorPhone.replace(/\s|\)|\(|-/g, ''),
            code: this.form.code,
          })
          .then(() => {
            this.form.step = 2
          })
          .catch((err) => {
            this.$getErrorMessage(err)
            this.isShowResend = false
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        await this.$axios
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
      this.$v.form.repeatPassword.$touch()

      if (this.$v.form.password.$anyError)
        return this.$validateForm(this.$v.form.password, 'password')
      if (this.$v.form.repeatPassword.$anyError)
        return this.$validateForm(
          this.$v.form.repeatPassword,
          'password-repeat'
        )

      this.form.step = 3
    },
    async sendForm() {
      this.$v.form.$touch()

      if (this.$v.form.$anyError)
        return this.$toast.error(this.$t('fill_above'))
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
      formData.append('organization_type', this.form.organizationType)
      formData.append('organization_name', this.form.organizationName)
      formData.append('person_for_contact', this.form.personName)
      formData.append('country', this.form.country)
      formData.append('region', this.form.region)
      formData.append('district', this.form.district)
      formData.append(
        'location',
        this.form.position.lat + ',' + this.form.position.lng
      )
      formData.append('about', this.form.about)
      formData.append('password', this.form.password)
      formData.append('password2', this.form.repeatPassword)
      formData.append('photo', this.form.file.length ? this.form.file[0] : '')

      await this.$axios
        .$post('/auth/register_organization/', formData)
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
    async sendPhone() {
      this.loadingCode = true

      if (this.globalTab === 'phone') {
        await this.$axios
          .$post('/user_phone_code/', {
            phone_number: this.authorPhone.replace(/\s|\)|\(|-/g, ''),
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

.v-input--selection-controls__ripple::before {
  transition: all 0.2s ease-in-out;
}
.v-input--selection-controls__input:hover {
  .v-input--selection-controls__ripple::before {
    transform: scale(0);
  }
}
</style>
