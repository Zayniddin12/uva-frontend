<template>
  <div>
    <BreadCrumbs :links="links" />
    <div
      v-if="expert"
      class="container flex items-start gap-[24px] !pb-[64px] e:flex-col"
    >
      <div
        class="w-1/3 image-wrapper relative flex items-end p-[8px] g:w-full g:h-[400px] e:w-1/2"
        style="aspect-ratio: 381 / 465"
      >
        <img
          v-if="expert.image"
          class="absolute inset-[0] w-full h-full object-cover z-0"
          :src="expert.image"
          alt=""
        />
        <div
          v-if="
            expert.facebook ||
            expert.twitter ||
            expert.telegram ||
            expert.instagram
          "
          class="relative flex items-center justify-center gap-[24px] p-[16px] border border-white/5 bg-white/[0.08] rounded-[12px] w-full"
          style="backdrop-filter: blur(12px)"
        >
          <el-tooltip effect="dark" :content="$t('facebook')" placement="top">
            <a
              v-if="expert.facebook"
              :href="expert.facebook"
              target="_blank"
              class="transition-all duration-300 !text-white/50 hover:!text-[#3b5998] text-[32px] leading-[32px] icon-facebook-fill"
            />
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('twitter')" placement="top">
            <a
              v-if="expert.twitter"
              :href="expert.twitter"
              target="_blank"
              class="transition-all duration-300 !text-white/50 hover:!text-[#00acee] text-[32px] leading-[32px] icon-twitter-fill"
            />
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('telegram')" placement="top">
            <a
              v-if="expert.telegram"
              :href="expert.telegram"
              target="_blank"
              class="transition-all duration-300 !text-white/50 hover:!text-[#0088cc] text-[32px] leading-[32px] icon-telegram-fill"
            />
          </el-tooltip>
          <el-tooltip effect="dark" :content="$t('instagram')" placement="top">
            <a
              v-if="expert.instagram"
              :href="expert.instagram"
              target="_blank"
              class="transition-all duration-300 !text-white/50 hover:!text-[#ff0069] bg-transparent text-[32px] leading-[32px] icon-instagram-fill instagram"
            />
          </el-tooltip>
        </div>
      </div>
      <div class="e:w-full w-2/3">
        <h1 class="text-3xl font-bold leading-[44px] text-[#2C2D33] mb-[8px]">
          {{ expert.full_name }}
        </h1>
        <p class="font-semibold text-[20px] leading-[27px] text-[#90A1B5]">
          {{ expert.profession }}
        </p>
        <div class="flex items-stretch gap-[16px] my-[20px]">
          <button
            class="rounded-[12px] px-[32px] py-[12px] font-semibold leading-[27px] transition-all duration-300"
            :class="
              !isForm
                ? 'text-[#F35E24] bg-[rgba(243,94,36,0.1)] pointer-events-none'
                : 'bg-white text-[#2C2D33] hover:text-blue hover:bg-[#DA6B3B] hover:bg-opacity-30'
            "
            @click="isForm = false"
          >
            {{ $t('about_expert') }}
          </button>

          <button
            class="bg-white rounded-[12px] px-[32px] py-[12px] font-semibold leading-[27px] transition-all duration-300"
            :class="
              isForm
                ? 'text-[#F35E24] bg-[rgba(243,94,36,0.1)] pointer-events-none'
                : 'bg-white text-[#2C2D33] hover:text-blue hover:bg-[#DA6B3B] hover:bg-opacity-30'
            "
            @click="isForm = true"
          >
            {{ $t('message') }}
          </button>
        </div>
        <transition name="fade" mode="out-in">
          <div
            v-if="isForm"
            class="bg-white p-[24px] rounded-[8px] relative"
            style="box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)"
          >
            <h2
              class="font-bold text-[24px] leading-[33px] text-[#2C2D33] mb-[20px] relative z-[1]"
            >
              {{ $t('message') }}
            </h2>
            <form
              class="grid grid-cols-2 gap-x-[12px] gap-y-[20px] relative z-[1]"
              @submit.prevent="submitForm"
            >
              <FormGroup
                id="nameInput"
                :label="$t('user_name')"
                for-id="name"
                class="d:col-span-2 a:col-span-1"
                required
              >
                <FormInput
                  id="name"
                  v-model="form.name"
                  :error="$v.form.name.$error"
                  maxlength="50"
                  :placeholder="$t('enter_user_name')"
                />
              </FormGroup>
              <TelInput
                class="d:col-span-2 a:col-span-1"
                :form="form"
                :error="$v.form.phone.$error"
              />
              <FormGroup
                :label="$t('appeal')"
                class="col-span-2"
                for-id="appeal"
              >
                <FormTextarea
                  id="appeal"
                  v-model="form.text"
                  :error="$v.form.text.$error"
                  maxlength="250"
                  :placeholder="$t('write_your_text')"
                />
              </FormGroup>

              <!--              <FormGroup :label="$t('phone_number')" for-id="name" required>-->
              <!--                <FormInput-->
              <!--                  id="name"-->
              <!--                  v-model="form.name"-->
              <!--                  :placeholder="$t('enter_user_name')"-->
              <!--                />-->
              <!--              </FormGroup>-->
              <recaptcha />
              <CButton
                :loading="loading"
                type="submit"
                class="col-span-2 ml-auto"
              >
                <span class="font-semibold leading-[22px] text-white text-base">
                  {{ $t('send') }}
                </span>
              </CButton>
            </form>
            <div
              :class="success ? 'opacity-100' : 'opacity-0 pointer-events-none'"
              class="absolute inset-[0] w-full h-full flex flex-col items-center justify-center bg-white z-[2] transition-all duration-300"
            >
              <img class="mb-[16px]" src="/icons/success_send.svg" alt="" />
              <h4 class="font-bold leading-[22px] text-[16px] text-[#2C2D33]">
                {{ $t('success_send') }}
              </h4>
              <p
                class="text-[#90A1B5] max-w-[383px] text-[14px] leading-[20px] text-center mt-[4px]"
              >
                {{ $t('success_send_text') }}
              </p>
            </div>
          </div>
          <div
            v-else
            class="eventss__about p-[20px] mb-[32px]"
            style="word-break: break-word"
            v-html="expert.about_me"
          ></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import FormGroup from '@/components/new/Form/CGroup.vue'
import FormInput from '@/components/new/Form/Input.vue'
import TelInput from '@/components/new/Form/TelInput.vue'
import FormTextarea from '@/components/new/Form/Textarea.vue'
import CButton from '@/components/new/Button/CButton.vue'
import BreadCrumbs from '~/components/volontyor/BreadCrumbs.vue'

export default {
  layout: 'pages',
  name: 'ExpertsSingle',
  components: {
    CButton,
    FormTextarea,
    TelInput,
    FormInput,
    FormGroup,
    BreadCrumbs,
  },
  async fetch() {
    await this.$getAction(`/experts/${this.$route.params.id}`).then(
      (response) => {
        this.expert = response
      }
    )
  },
  data() {
    return {
      loading: false,
      expert: null,
      isForm: false,
      success: false,
      form: {
        name: '',
        phone: '',
        text: '',
      },
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('goodwill_ambassadors_experts'),
          url: `experts`,
        },
        {
          title: this.expert?.full_name,
        },
      ]
    },
  },
  methods: {
    submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true
        this.$postAction(`/message_for_expert/`, {
          data: {
            expert: this.$route.params.id,
            name: this.form.name,
            phone: this.form.phone,
            message: this.form.text,
          },
        })
          .then(() => {
            this.success = true
          })
          .catch((err) => {
            if (err.response.data.name) {
              const nameInput = document.getElementById('nameInput')
              nameInput.classList.add('border-red-500')
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
      },
      text: {
        required,
      },
    },
  },
}
</script>

<style>
.image-wrapper {
  border: 2px solid rgba(15, 40, 82, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
}

.vti__dropdown-list.below {
  z-index: 9999 !important;
}
</style>
