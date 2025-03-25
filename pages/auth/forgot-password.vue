<template>
  <div class="bg-white h-full">
    <div
      class="flex items-center justify-start flex-col auth auth-login verification f:w-max !max-w-[584px] h-full !m-0"
    >
      <v-card class="!max-w-[483px] w-full mx-[auto] g:flex-col">
        <v-tabs v-model="tab" icons-and-text>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#tab-1">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.99281 8.66523C0.833304 5.24996 2.91659 2.44861 5.2367 1.73856C7.49993 1.04592 9.16662 1.75135 9.99992 2.74996C10.8333 1.75135 12.4999 1.04864 14.7543 1.73856C17.2257 2.49488 19.1666 5.24996 18.0061 8.66523C16.5412 13.0902 10.8333 16.4985 9.99989 16.4986C9.16648 16.4986 3.50686 13.1419 1.99281 8.66523Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t('volunteers') }}
          </v-tab>
          <v-tab href="#tab-2">
            <svg
              width="22"
              height="19"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.77215 14.1899C4.80843 13.682 4.82656 13.4281 4.86619 13.2491C5.11712 12.1151 5.97957 11.3733 7.13837 11.2949C7.32136 11.2825 7.60682 11.3051 8.17775 11.3502C9.02326 11.4171 9.94331 11.4667 10.8122 11.4667C11.7806 11.4667 12.8621 11.4051 13.8467 11.3266C14.4049 11.2822 14.684 11.2599 14.8752 11.274C16.0091 11.3577 16.8755 12.1025 17.1286 13.2109C17.1713 13.3978 17.1895 13.6529 17.2259 14.1629V14.1629C17.267 14.7377 17.2875 15.025 17.2665 15.2635C17.1458 16.6323 16.1105 17.7441 14.7538 17.962C14.5175 18 14.2293 18 13.6531 18H10.8122H8.31986C7.76857 18 7.49293 18 7.26658 17.9652C5.89315 17.7543 4.8443 16.6279 4.73178 15.2429C4.71324 15.0147 4.73288 14.7397 4.77215 14.1899V14.1899Z"
                stroke="#2C2D33"
                stroke-width="1.5"
              />
              <path
                d="M7.5 4.5C7.5 2.567 9.067 1 11 1V1C12.933 1 14.5 2.567 14.5 4.5V5C14.5 6.65685 13.1569 8 11.5 8V8H10.5V8C8.84315 8 7.5 6.65685 7.5 5V4.5Z"
                stroke="#2C2D33"
                stroke-width="1.5"
              />
              <path
                d="M19.5 11C19.5 11 21 11.6176 21 13.5C21 15.3824 19.5 16 19.5 16"
                stroke="#2C2D33"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 11C2.5 11 1 11.5 1 13.5C1 15.5 2.5 16 2.5 16"
                stroke="#2C2D33"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 1.5C17 1.5 19 1.91455 19 4C19 6.08545 17 6.5 17 6.5"
                stroke="#2C2D33"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 1.5C5 1.5 3 1.83423 3 4C3 6.16576 5 6.5 5 6.5"
                stroke="#2C2D33"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ $t('organizations') }}
          </v-tab>
        </v-tabs>
      </v-card>
      <v-stepper v-model="step" class="overflow-visible">
        <v-stepper-items class="overflow-visible">
          <!--        VERIFICATION CODE STEP-->
          <v-stepper-content step="1">
            <form @submit.prevent="sendPhone">
              <h3 class="auth__title">{{ $t('cant_login') }}</h3>
              <p class="auth__subtitle w-full">
                {{ $t('enter_phone_get_code') }}
              </p>
              <TelInput :form="form" :error="$v.form.phone.$error" />
              <button
                :disabled="loadingCode"
                type="submit"
                class="auth__continue-link"
              >
                {{ $t('get_code') }}
                <icon-base v-if="loadingCode" name="rolling" />
              </button>
              <div class="auth__not-account">
                <p>{{ $t('are_not_registred') }}</p>
                <nuxt-link :to="localePath('/auth')">{{
                  $t('register')
                }}</nuxt-link>
              </div>
            </form>
          </v-stepper-content>
          <!--        VERIFICATION CODE STEP-->
          <v-stepper-content class="verification__code-step" step="2">
            <form @submit.prevent="sendCode">
              <v-card class="!bg-transparent">
                <h3 class="auth__title">{{ $t('cant_login') }}</h3>
                <p class="auth__subtitle">
                  {{ $t('enter_code_with_phone') }}
                  <span>{{ form.phone }}</span>
                </p>
                <label for="personal_code">
                  <p>{{ $t('personal_number_code') }}<span>*</span></p>
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
                <transition name="slide-down">
                  <div class="sub-link">
                    <div class="flex justify-center py-2">
                      <Counter v-if="!isShowResend" @finished="stopCounting" />
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
              </v-card>
              <div class="verification__btns">
                <v-btn class="back-btn" @click.native="step--">
                  {{ $t('back') }}
                </v-btn>
                <v-btn :disabled="loading" type="submit" class="continue-btn">
                  {{ $t('continue') }}
                  <icon-base v-if="loading" name="rolling" />
                </v-btn>
              </div>
              <div class="auth__not-account">
                <p>{{ $t('are_not_registred') }}</p>
                <nuxt-link :to="localePath('/auth')">{{
                  $t('register')
                }}</nuxt-link>
              </div>
            </form>
          </v-stepper-content>

          <!--        VERIFICATION PASSWORD STEP-->
          <v-stepper-content class="verification__password-step" step="3">
            <form @submit.prevent="resetPassword">
              <v-card>
                <h3 class="auth__title">{{ $t('cant_login') }}</h3>
                <p class="auth__subtitle">{{ $t('crate_new_password') }}</p>
                <label class="label-password">
                  <p>{{ $t('create_password') }} <span>*</span></p>
                  <Password
                    v-model="form.password"
                    :placeholder="$t('enter_password')"
                    :class="{ 'error-input': $v.form.password.$error }"
                  />
                </label>
                <label>
                  <p>{{ $t('repeat_password') }} <span>*</span></p>
                  <Password
                    v-model="form.repeatPassword"
                    v-bind="{ indexVal: 2 }"
                    :placeholder="$t('enter_password')"
                    :class="{ 'error-input': $v.form.repeatPassword.$anyError }"
                  />
                </label>
              </v-card>

              <div class="verification__btns">
                <v-btn class="back-btn" @click="step--">{{ $t('back') }}</v-btn>
                <v-btn :disabled="loading" type="submit" class="continue-btn">
                  {{ $t('continue') }}
                  <icon-base v-if="loading" name="rolling" />
                </v-btn>
              </div>
              <div class="auth__not-account">
                <p>{{ $t('are_not_registred') }}</p>
                <nuxt-link :to="localePath('/auth')">{{
                  $t('register')
                }}</nuxt-link>
              </div>
            </form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import TelInput from '../../components/new/Form/TelInput.vue'
import Password from '~/components/form/Password.vue'
import IconBase from '~/components/volontyor/IconBase'
import Counter from '~/components/Counter.vue'
export default {
  layout: 'pages',
  components: {
    TelInput,
    Password,
    IconBase,
    Counter,
  },
  data() {
    return {
      form: {
        phone: '',
        code: '',
        password: '',
        repeatPassword: '',
      },
      tab: null,
      isShowResend: false,
      loading: false,
      loadingCode: false,
      step: 1,
      interval: null,
      timer: 0,
    }
  },
  validations: {
    form: {
      phone: { required, minLength: minLength(5) },
      code: { required, minLength: minLength(6) },
      password: { required, minLength: minLength(6) },
      repeatPassword: { required, sameAsPassword: sameAs('password') },
    },
  },
  watch: {
    step(newValue) {
      if (newValue === 2 && this.form.code.length) {
        this.form.code = ''
      }
    },
  },
  methods: {
    stopCounting() {
      this.isShowResend = true
    },
    async sendPhone(toast) {
      this.$v.form.phone.$touch()
      if (this.$v.form.phone.$anyError)
        return this.$validateForm(this.$v.form.phone, 'phone')

      this.loadingCode = true
      await this.$axios
        .$post('/send_phone_code/', {
          phone_number: this.form.phone.replace(/\s|\)|\(|-/g, ''),
        })
        .then(() => {
          this.step = 2
          if (toast) this.$toast.success(this.$t('code_sent'))
          this.isShowResend = false
        })
        .catch((err) => {
          this.$getErrorMessage(err)
        })
        .finally(() => {
          this.loadingCode = false
        })
    },
    async sendCode() {
      this.$v.form.code.$touch()
      if (this.$v.form.code.$anyError)
        return this.$validateForm(this.$v.form.code, 'code')

      this.loading = true
      await this.$axios
        .$post('/code_verification/', {
          phone_number: this.form.phone.replace(/\s|\)|\(|-/g, ''),
          code: this.form.code,
        })
        .then(() => {
          this.step = 3
        })
        .catch((err) => {
          this.$getErrorMessage(err)
          this.isShowResend = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    async resetPassword() {
      this.$v.form.password.$touch()
      this.$v.form.repeatPassword.$touch()
      if (this.$v.form.password.$anyError)
        return this.$validateForm(this.$v.form.password, 'password')
      if (this.$v.form.repeatPassword.$anyError)
        return this.$validateForm(this.$v.form.repeatPassword, 'repeatPassword')

      this.loading = true
      await this.$axios
        .$post('/forget_password_reset/', {
          phone_number: this.form.phone.replace(/\s|\)|\(|-/g, ''),
          password: this.form.password,
          code: this.form.code,
        })
        .then(() => {
          this.step = 3
          this.$toast.success(this.$t('password_updated'))
          this.isShowResend = false
          const pathWithoutLocale =
            this.$i18n.locale === 'uz'
              ? '/auth/login'
              : `/${this.$i18n.locale}/auth/login`

          this.$router.push(pathWithoutLocale)
        })
        .catch((err) => {
          this.$getErrorMessage(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
