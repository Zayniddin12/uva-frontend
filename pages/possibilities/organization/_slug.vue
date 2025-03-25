<template>
  <div class="main-bg">
    <Preloader :fetch-state="$fetchState" :data="organizationSingle.data">
      <bread-crumbs :links="links" />
      <main
        class="grid grid-cols-12 container b:flex b:flex-col-reverse items-start b:items-stretch !pb-[32px]"
      >
        <section
          v-if="organizationSingle.data"
          class="col-span-9 b:col-span-12 grid mb-[52px]"
        >
          <div class="initiative-card p-[20px] mb-[24px]">
            <div class="top mb-[8px]">
              <div
                class="left-side w-full c:mb-[15px] flex items-center g:flex-col g:items-start"
              >
                <div
                  class="shrink-0 mr-[12px] g:mb-[12px] e:w-[48px] e:h-[48px] w-[64px] h-[64px] rounded-lg overflow-hidden border border-[#C0C0C0]"
                >
                  <img
                    v-if="organizationSingle.data"
                    class="w-full h-full object-cover"
                    :src="
                      organizationSingle.data.photo ||
                      organizationSingle.data.default_photo
                    "
                    :alt="title"
                  />
                </div>
                <div class="flex flex-col gap-[8px] w-full">
                  <div class="flex-between">
                    <h5
                      v-if="organizationSingle.data"
                      class="title title--black"
                    >
                      {{ organizationSingle.data.organization_name }}
                    </h5>

                    <div class="right-side socials">
                      <a
                        v-if="organizationSingle.data.youtube"
                        target="_blank"
                        :href="organizationSingle.data.youtube"
                      >
                        <icon-base name="youtube" class="icon" />
                      </a>
                      <a
                        v-if="organizationSingle.data.telegram"
                        target="_blank"
                        :href="organizationSingle.data.telegram"
                      >
                        <icon-base name="tg" class="icon" />
                      </a>
                      <a
                        v-if="organizationSingle.data.facebook"
                        target="_blank"
                        :href="organizationSingle.data.facebook"
                      >
                        <icon-base name="fb" class="icon" />
                      </a>
                      <a
                        v-if="organizationSingle.data.instagram"
                        target="_blank"
                        :href="organizationSingle.data.instagram"
                      >
                        <icon-base name="insta" class="icon" />
                      </a>
                    </div>
                  </div>

                  <div class="flex-between">
                    <div class="flex address items-center">
                      <div
                        v-if="
                          organizationSingle.data &&
                          organizationSingle.data.district
                        "
                        class="flex items-center"
                      >
                        <icon-base class="icon mr-[6px]" name="location-icon" />
                        <p>
                          {{ organizationSingle.data.region?.name }},
                          {{ organizationSingle.data.district?.name }}
                        </p>
                      </div>
                      <el-divider
                        v-if="
                          organizationSingle.data.phone_number &&
                          organizationSingle.data &&
                          organizationSingle.data.district
                        "
                        class="vertical-divider"
                        direction="vertical"
                      ></el-divider>

                      <span
                        v-if="organizationSingle.data.phone_number"
                        class="flex items-center address__phone_number"
                      >
                        <icon-base class="icon mr-[6px]" name="Calling" />
                        <a
                          :href="`tel:${organizationSingle.data.phone_number}`"
                        >
                          <p>
                            {{
                              organizationSingle.data.phone_number
                                | VMask('+### (##) ###-##-##')
                            }}
                          </p>
                        </a>
                      </span>
                      <el-divider
                        v-if="organizationSingle.data.email"
                        class="vertical-divider"
                        direction="vertical"
                      ></el-divider>
                      <span
                        v-if="organizationSingle.data.email"
                        class="flex items-center"
                      >
                        <icon-base class="icon mr-[6px]" name="Calling" />
                        <a :href="`mailto:${organizationSingle.data.email}`">
                          <p>
                            {{ organizationSingle.data.email }}
                          </p>
                        </a>
                      </span>
                    </div>
                    <div class="flex items-center gap-[6px] justify-end">
                      <div class="rounded-[2px] p-[2px] bg-[#27B34A]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.0002 9.375L3.77511 10.5449C3.49851 10.6903 3.36022 10.763 3.25796 10.744C3.16899 10.7275 3.09222 10.6718 3.04903 10.5922C2.9994 10.5009 3.02581 10.3469 3.07865 10.0389L3.5037 7.561L1.70157 5.80681C1.4774 5.5886 1.36531 5.47949 1.3517 5.37633C1.33986 5.28658 1.36918 5.19628 1.4315 5.13061C1.50312 5.05512 1.65792 5.03269 1.96753 4.98782L4.4537 4.6275L5.56627 2.37317C5.70456 2.09295 5.77371 1.95285 5.86758 1.90808C5.94926 1.86914 6.04415 1.86914 6.12582 1.90808C6.2197 1.95285 6.28884 2.09295 6.42713 2.37317L7.5397 4.6275L10.0259 4.98782C10.3355 5.03269 10.4903 5.05512 10.5619 5.13061C10.6242 5.19628 10.6535 5.28658 10.6417 5.37633C10.6281 5.47949 10.516 5.5886 10.2918 5.80681L8.4897 7.561L8.91456 10.0377C8.96745 10.346 8.99389 10.5002 8.94421 10.5916C8.90098 10.6712 8.82415 10.7269 8.73513 10.7434C8.63281 10.7623 8.49444 10.6894 8.2177 10.5435L6.0002 9.375Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <span class="text-sm text-black font-semibold">{{
                        organizationSingle.data.avg_rating
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="
              organizationSingle.data.about &&
              organizationSingle.data.about.length
            "
            class="initiative-slug__about"
          >
            <h3>{{ $t('about_organization') }}</h3>
            <p class="text-base f:text-sm">
              {{ organizationSingle.data.about }}
            </p>
          </div>
          <div
            v-if="
              organizationSingle.organization_events_finished.length ||
              organizationSingle.organization_events_active.length
            "
            class="initiative-slug__events mt-[32px]"
          >
            <h3>{{ $t('events') }}</h3>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-if="organizationSingle.organization_events_active.length"
                name="first"
                :label="`${$t('implemented')} (${
                  organizationSingle.organization_events_active.length
                })`"
              >
                <Main-event-card
                  v-for="(
                    item, index
                  ) in organizationSingle.organization_events_active"
                  :key="index"
                  class="mb-[20px]"
                  v-bind="{
                    id: item.id,
                    organizationId: String(item.organization.id),
                    title: item.title,
                    date:
                      $moment(item.starting_date, 'DD.MM.YYYY') +
                      ' - ' +
                      $moment(item.finishing_date, 'DD.MM.YYYY'),
                    time: item.starting_time + ' - ' + item.finishing_time,
                    address: item.country + ', ' + item.region?.name,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: item.slug,
                    inProgress: item.status,
                    liked: item.is_liked,
                    subscribed: item.is_subscribed,
                    likedIcon: true,
                    img: item.image,
                  }"
                />
              </el-tab-pane>
              <el-tab-pane
                v-if="organizationSingle.organization_events_finished.length"
                name="second"
                :label="`${$t('ended')} (${
                  organizationSingle.organization_events_finished.length
                })`"
              >
                <Main-event-card
                  v-for="(
                    item, index
                  ) in organizationSingle.organization_events_finished"
                  :key="index"
                  class="mb-[20px]"
                  v-bind="{
                    id: item.id,
                    organizationId: String(item.organization.id),
                    title: item.title,
                    date:
                      $moment(item.starting_date, 'DD.MM.YYYY') +
                      ' - ' +
                      $moment(item.finishing_date, 'DD.MM.YYYY'),
                    time:
                      item.starting_time +
                      ' ' +
                      '-' +
                      ' ' +
                      item.finishing_time,
                    address: item.country + ', ' + item.region?.name,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: item.slug,
                    inProgress: item.status,
                    liked: item.is_liked,
                    subscribed: item.is_subscribed,
                    likedIcon: true,
                    img: item.image,
                  }"
                />
              </el-tab-pane>
            </el-tabs>
          </div>

          <div
            v-if="allComments.length"
            class="mt-[32px] e:mt-[20px] mb-[20px]"
          >
            <span class="text-2xl e:text-lg text-black font-bold">{{
              $t('reviews_organ')
            }}</span>
            <div
              class="flex flex-col gap-[20px] e:gap-[12px] mt-[20px] e:mt-[12px]"
            >
              <Reviews
                v-for="(item, i) in allComments"
                :key="i"
                v-bind="{
                  img: item.volunteer.photo,
                  name: item.volunteer.first_name,
                  text: item.review,
                  rate: item.rating,
                  id: item.id,
                }"
              />
            </div>
          </div>
          <div v-if="count < total" class="flex-center !w-max mx-auto">
            <CButton
              class="flex-center group"
              variant="light-blue"
              size="medium"
              :loading="loading"
              @click="fetchMore"
              ><span
                class="font-semibold text-blue text-base duration-200 group-hover:text-white"
                >Загрузить еще</span
              ></CButton
            >
          </div>
        </section>
        <aside
          class="col-span-3 b:col-span-12 b:mb-[20px] pl-[24px] b:pl-[0px]"
        >
          <Nav-side-bar class="mb-[20px]" />
          <Feedback @open-rate="sendFeedback" />
          <Share
            class="mt-[12px] mb-[20px]"
            @shareOpen="$modal('shareOrganization')"
          />
          <JoinUs />
        </aside>
      </main>

      <ShareModal
        v-bind="{
          id: 'shareOrganization',
          title: $t('share'),
          shareTitle: organizationSingle?.data?.organization_name,
          shareImg: organizationSingle?.data?.photo,
        }"
      />
      <Modal
        :id="`rateOrganization`"
        v-bind="{
          title: this.$t('rate_org'),
          contentC: 'rounded-[12px] bg-white py-4 px-5',
          bodyC: '!p-[0px] rounded-[12px] border-solid border-red-500',
          closeSign: true,
          width: '382',
          headC: '',
        }"
      >
        <template>
          <form @submit.prevent="submitForm">
            <div
              class="w-full mt-[16px] mb-[20px] h-[1px] bg-gray-200 opacity-20"
            ></div>
            <div
              class="bg-[#F7F9FA] rounded-lg p-[8px] pr-[12px] flex-between items-end"
            >
              <div class="flex items-center gap-[10px]">
                <img
                  :src="
                    organizationSingle?.data?.photo ||
                    organizationSingle?.data?.default_photo
                  "
                  alt="rate us logo"
                  class="min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] object-cover rounded-[6px] overflow-hidden"
                />
                <div class="flex-col gap-[2px]">
                  <span
                    class="text-base font-bold text-black line-clamp1 mb-[2px]"
                    >{{ organizationSingle?.data?.organization_name }}</span
                  >
                  <div class="flex items-center gap-[4px]">
                    <img src="/icons/phone.svg" alt="phone" />
                    <span class="text-[11px] text-black">{{
                      organizationSingle?.data?.phone_number
                        | VMask('+### (##) ###-##-##')
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="inline-flex items-center justify-end gap-[6px]">
                <div
                  class="rounded-[2px] bg-[#27B34A] p-[2px] flex-center w-[16px] h-[16px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.99996 8.87503L3.77487 10.0449C3.49827 10.1903 3.35997 10.263 3.25771 10.2441C3.16874 10.2276 3.09197 10.1718 3.04879 10.0923C2.99915 10.0009 3.02557 9.84689 3.0784 9.53889L3.50346 7.06103L1.70133 5.30684C1.47715 5.08863 1.36506 4.97952 1.35146 4.87636C1.33962 4.78661 1.36894 4.69631 1.43125 4.63064C1.50287 4.55515 1.65768 4.53272 1.96729 4.48785L4.45346 4.12753L5.56602 1.8732C5.70432 1.59298 5.77346 1.45288 5.86734 1.40811C5.94901 1.36917 6.0439 1.36917 6.12558 1.40811C6.21945 1.45288 6.2886 1.59298 6.42689 1.8732L7.53946 4.12753L10.0256 4.48785C10.3352 4.53272 10.49 4.55515 10.5617 4.63064C10.624 4.69631 10.6533 4.78661 10.6415 4.87636C10.6279 4.97952 10.5158 5.08863 10.2916 5.30684L8.48946 7.06103L8.91432 9.53776C8.9672 9.84607 8.99365 10.0002 8.94396 10.0916C8.90074 10.1712 8.82391 10.227 8.73489 10.2434C8.63257 10.2623 8.4942 10.1894 8.21745 10.0436L5.99996 8.87503Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span class="text-sm text-black font-semibold">{{
                  organizationSingle?.data?.avg_rating
                }}</span>
              </div>
            </div>

            <!--        stars-->
            <el-rate v-model="rateOfOrg" class="relative my-[16px]"></el-rate>

            <div>
              <FormGroup :label="$t('your_feedback')" for-id="your_feedback">
                <FormTextarea
                  id="your_feedback"
                  v-model="form.text"
                  :error="$v.form.text.$error"
                  maxlength="250"
                  :placeholder="$t('write_your_text')"
                />
              </FormGroup>
            </div>

            <div class="mt-[20px] w-full">
              <CButton
                class="flex-center group w-full"
                size="medium"
                :loading="loading"
                @click="submitForm"
                ><span
                  class="font-semibold text-white text-base duration-200 group-hover:text-white"
                  >{{ $t('rate') }}</span
                ></CButton
              >
            </div>
          </form>
        </template>
      </Modal>
    </Preloader>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import Feedback from '@/components/sidebar/Feedback.vue'
import Share from '@/components/sidebar/Share.vue'
import JoinUs from '@/components/sidebar/JoinUs.vue'
import Reviews from '@/components/cards/Reviews.vue'
import CButton from '@/components/new/Button/CButton.vue'
import Modal from '@/components/volontyor/Modal.vue'
import FormGroup from '@/components/new/Form/CGroup.vue'
import FormTextarea from '@/components/new/Form/Textarea.vue'
import ShareModal from '@/components/ShareModal.vue'
import MainEventCard from '~/components/cards/MainEventCard.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
import NavSideBar from '~/components/sidebar/NavSideBar.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'

export default {
  layout: 'pages',
  components: {
    ShareModal,
    FormTextarea,
    FormGroup,
    Modal,
    CButton,
    Reviews,
    JoinUs,
    Feedback,
    Share,
    BreadCrumbs,
    NavSideBar,
    IconBase,
    MainEventCard,
  },
  async fetch() {
    await this.$store
      .dispatch('organization/fetchOrganizationSingle', this.$route.params.slug)
      .then((res) => {
        if (!res.data.organization_events_active.length)
          this.activeName = 'second'
      })
    await this.$store.dispatch('organization/fetchOrganizationComments', {
      id: this.$route.params.slug,
      limit: 5,
      offset: this.count - 5,
    })
  },
  data() {
    return {
      joinGroup: false,
      title: 'user-image',
      imgLink: 'https://picsum.photos/200/500',
      address: 'Андижанская область, г.Асака',
      youtubeLink: 'nimadur',
      telegramLink: 'nimadur',
      facebookLink: 'nimadur',
      instagramLink: 'nimadur',
      phoneNumber: '+998 (71) 211-40-44',
      activeName: 'first',
      count: 5,
      loading: false,
      rateOfOrg: 1,
      form: {
        text: '',
      },
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('organizations'),
          url: `possibilities/organization`,
        },
      ]
    },
    ...mapState({
      organizationSingle: (state) => state.organization.organizationSingle,
      user: (state) => state.auth.user,
      total: (state) => state.organization.commentTotal,
      comments: (state) => state.organization.organizationComments,
    }),
    allComments() {
      return [...this.comments]
    },
  },
  methods: {
    sendFeedback() {
      if (this.user) {
        this.$modal('rateOrganization')
      } else {
        this.$toast.error(this.$t('not_registered'))
        setTimeout(() => {
          if (this.$i18n.locale === 'uz') {
            this.$router.push(`/auth`)
            return
          }
          this.$router.push(`/${this.$i18n.locale}/auth`)
        }, 400)
      }
    },
    handleClick(tab, event) {},
    fetchMore() {
      this.loading = true
      this.count += 5
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true
        this.$postAction(`/giving_rating_to_organization/`, {
          data: {
            organization: this.organizationSingle?.data?.id,
            rating: this.rateOfOrg,
            review: this.form.text,
          },
        })
          .then(() => {
            this.success = true
            this.$toast.success(this.$t('success_rate'))

            this.$store
              .dispatch(
                'organization/fetchOrganizationSingle',
                this.$route.params.slug
              )
              .then((res) => {
                if (!res.data.organization_events_active.length)
                  this.activeName = 'second'
              })

            this.$store.dispatch('organization/fetchOrganizationComments', {
              id: this.$route.params.slug,
              limit: 5,
              offset: this.count - 5,
            })
          })
          .catch((err) => {
            this.$toast.error(err?.response?.data.error_message)
          })
          .finally(() => {
            this.loading = false
            this.$modalHide('rateOrganization')
            this.$v.form.text.$reset()
            this.rateOfOrg = 1
            this.form.text = ''
          })
      }
    },
  },
  validations: {
    form: {
      text: {
        required,
      },
    },
  },
  head() {
    return {
      title: this.organizationSingle.data
        ? this.organizationSingle.data.organization_name
        : 'Volontyor.uz',
    }
  },
}
</script>

<style scoped>
.address p {
  transition: all 0.1s linear;
}
.address p:nth-child(2):hover {
  color: #2c2d33 !important;
}
.address p:nth-child(1):hover {
  @apply text-blue;
}
</style>

<style>
.el-rate__icon {
  font-size: 40px !important;
}
.el-icon-star-off::before {
  content: url('@/static/icons/star.svg');
}
.el-rate {
  height: max-content !important;
}
.el-rate__item {
  font-size: 40px !important;
  width: 40px !important;
  height: 40px !important;
}
</style>
