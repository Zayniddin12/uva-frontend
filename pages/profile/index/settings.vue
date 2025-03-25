<template>
  <div class="p-[24px] profile mb-[24px]">
    <form class="flex flex-col gap-[24px]" @submit.prevent="checkForm">
      <Input
        v-model="form.oldpassword"
        :placeholder="$t('enter_password')"
        :label="$t('old_password')"
        right
        password
        :error="$v.form.oldpassword.$error"
      />
      <Input
        v-model="form.newpassword"
        :placeholder="$t('enter_new_password')"
        :label="$t('new_password')"
        right
        password
        :error="$v.form.newpassword.$error"
      />
      <Input
        v-model="form.renewpassword"
        :placeholder="$t('enter_repeat_password')"
        :label="$t('repeat_new_password')"
        right
        password
        :error="$v.form.renewpassword.$error"
      />
      <VButton
        type="submit"
        :loading="loading"
        :text="$t('save')"
        class="btn btn--blue !w-[50%] ml-auto mt-[24px]"
      />
    </form>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import Input from '~/components/form/Input.vue'
import VButton from '~/components/form/VButton'
export default {
  components: {
    VButton,
    Input,
  },
  data() {
    return {
      form: {
        oldpassword: '',
        newpassword: '',
        renewpassword: '',
      },
      loading: false,
    }
  },
  validations: {
    form: {
      oldpassword: { required, minLength: minLength(6) },
      newpassword: { required, minLength: minLength(6) },
      renewpassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs('newpassword'),
      },
    },
  },

  methods: {
    async checkForm() {
      this.$v.form.$touch()
      // this.$validateForm(this.$v.form)

      if (this.$v.form.newpassword.$anyError)
        return this.$validateForm(this.$v.form.newpassword, 'password')
      if (this.$v.form.renewpassword.$anyError)
        return this.$validateForm(this.$v.form.renewpassword, 'password-repeat')

      if (!this.$v.form.$error) {
        this.loading = true
        await this.$axios
          .put(
            `password_reset/`,
            {
              old_password: this.form.oldpassword,
              new_password: this.form.newpassword,
              new_password2: this.form.renewpassword,
            },
            {
              headers: {
                'Accept-Language': this.$i18n.locale,
              },
            }
          )
          .then(async () => {
            this.$toast.success(this.$t('password_changed'))
            await this.$auth.fetchUser()
            this.form.oldpassword = null
            this.form.newpassword = ''
            this.form.renewpassword = ''
            const localePrefix =
              this.$i18n.locale === 'uz' ? '' : `/${this.$i18n.locale}`
            await this.$router.push(`${localePrefix}/profile`)
          })
          .catch((err) => {
            this.$toast.warning(err?.response?.data.error_message)
          })
          .finally(() => {
            this.$v.$reset()
            setTimeout(() => {
              this.loading = false
            }, 400)
          })
      }
    },
  },
}
</script>
