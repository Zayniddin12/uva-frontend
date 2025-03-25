<template>
  <div class="bg-white h-full">
    <div class="container auth auth-login f:w-max !max-w-[558px] mx-[auto]">
      <form @submit.prevent="handleLogin">
        <div>
          <h3 class="auth__title">{{ $t('entrance') }}</h3>
          <v-card class="!max-w-[483px] mx-[auto] g:flex-col">
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

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <p class="auth__subtitle">{{ $t('glad_to_see') }}</p>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <p class="auth__subtitle">{{ $t('glad_to_see_organization') }}</p>
            </v-tab-item>
          </v-tabs-items>
          <div class="form-tab">
            <v-card class="!max-w-[381px] mx-[auto]">
              <v-tabs v-model="formTab" icons-and-text>
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#phone"> {{ $t('via_phone') }} </v-tab>
                <v-tab href="#email"> {{ $t('via_email') }} </v-tab>
              </v-tabs>
            </v-card>
          </div>
          <!--          <p class="auth__subtitle">{{ $t('glad_to_see') }}</p>-->
          <v-tabs-items v-model="formTab">
            <v-tab-item value="phone" class="auth__form grid gap-y-5">
              <FormGroup
                id="nameInput"
                :label="$t('phone_number')"
                for-id="name"
                required
              >
                <FormInput
                  id="nameInput"
                  v-model="formPhone.phone"
                  mask="+998 (##) ###-##-##"
                  :error="$v.formPhone.phone.$error"
                  maxlength="19"
                  :placeholder="`+998 (__) ___-__-__`"
                  @input="$v.formPhone.phone.$touch()"
                />
              </FormGroup>
              <label>
                <p>{{ $t('enter_password') }} <span>*</span></p>
                <Password
                  :key="formTab"
                  v-model="formPhone.password"
                  :placeholder="$t('enter_password')"
                  :error="$v.formPhone.password.$error"
                  @input="$v.formPhone.password.$touch()"
                />
              </label>
              <div style="text-align: right">
                <nuxt-link :to="localePath('/auth/forgot-password')">{{
                  $t('forgot_password')
                }}</nuxt-link>
              </div>
            </v-tab-item>
            <v-tab-item value="email" class="auth__form grid gap-y-5">
              <FormGroup id="email" :label="$t('email')" for-id="name" required>
                <FormInput
                  id="email"
                  v-model="formEmail.email"
                  :error="$v.formEmail.email.$error"
                  :placeholder="$t('enter_email')"
                  @input="$v.formEmail.email.$touch()"
                /> </FormGroup
              ><label>
                <p>{{ $t('enter_password') }} <span>*</span></p>
                <Password
                  v-model="formEmail.password"
                  :placeholder="$t('enter_password')"
                  :error="$v.formPhone.password.$error"
                  @input="$v.formPhone.password.$touch()"
                />
              </label>
              <div style="text-align: right">
                <nuxt-link :to="localePath('/auth/forgot-mail')">{{
                  $t('forgot_password')
                }}</nuxt-link>
              </div></v-tab-item
            >
          </v-tabs-items>
          <button
            :disabled="loading || disabled"
            type="submit"
            class="auth__btn-enter"
            :class="{
              'duration-200 !bg-gray-200 hover:!bg-gray-300': disabled,
            }"
          >
            {{ $t('sign_in') }}
            <icon-base v-if="loading" name="rolling" />
          </button>
          <div class="auth__not-account">
            <p>{{ $t('are_not_registred') }}</p>
            <nuxt-link :to="localePath('/auth')">{{
              $t('register')
            }}</nuxt-link>
          </div>
        </div>
      </form>
    </div>
    <recaptcha />
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import IconBase from '../../components/volontyor/IconBase.vue'
// import TelInput from '../../components/new/Form/TelInput.vue'
import Password from '~/components/form/Password.vue'
import FormInput from '~/components/form/Input.vue'
import FormGroup from '~/components/new/Form/CGroup.vue'
export default {
  layout: 'pages',
  components: {
    FormGroup,
    FormInput,
    // TelInput,
    Password,
    IconBase,
  },
  data() {
    return {
      loading: false,
      tab: this.$store.state.author.author || null,
      disabled: true,
      formPhone: {
        phone: '',
        password: '',
      },
      formEmail: {
        email: '',
        password: '',
      },
      formTab: 'phone',
    }
  },
  validations: {
    formPhone: {
      phone: { required, minLength: minLength(19) },
      password: { required, minLength: minLength(6), maxLength: maxLength(32) },
    },
    formEmail: {
      email: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(32) },
    },
  },
  watch: {
    tab(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.formPhone.phone = ''
      }
      this.formPhone.password = ''
      this.$v.formPhone.phone.$reset()
      this.$v.formPhone.password.$reset()
      this.$store.commit('author/setAuthor', newValue)
    },

    formPhone: {
      deep: true,
      handler() {
        this.disabled =
          this.$v.formPhone.phone.$invalid ||
          this.$v.formPhone.password.$invalid
      },
    },
    formEmail: {
      deep: true,
      handler() {
        this.disabled =
          this.$v.formEmail.email.$invalid ||
          this.$v.formEmail.password.$invalid
      },
    },
    formTab() {
      this.formPhone.phone = ''
      this.formPhone.password = ''
      this.formEmail.email = ''
      this.formEmail.password = ''
      this.$v.formPhone.phone.$reset()
      this.$v.formEmail.email.$reset()
    },
  },
  methods: {
    async handleLogin() {
      this.loading = true

      if (this.formTab === 'phone') {
        this.$validateForm(this.$v.formPhone)
        await this.$auth
          .loginWith('local1', {
            data: {
              phone_number: this.formPhone.phone.replace(/\s|\)|\(|-/g, ''),
              password: this.formPhone.password,
            },
            headers: { 'Accept-Language': this.$i18n.locale },
          })
          .then(async (res) => {
            await this.$auth.fetchUser()
            console.log(res)
            localStorage.setItem('token', res.data.token)
            this.$toast.success(this.$t('success_login'))
          })
          .catch((err) => {
            this.$getErrorMessage(err)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$validateForm(this.$v.formEmail)
        await this.$auth
          .loginWith('local2', {
            data: {
              email: this.formEmail.email,
              password: this.formEmail.password,
            },
            headers: { 'Accept-Language': this.$i18n.locale },
          })
          .then(async () => {
            await this.$auth.fetchUser()
            this.$toast.success(this.$t('success_login'))
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
