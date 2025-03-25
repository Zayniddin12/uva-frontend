<template>
  <div class="container volunteer-slug">
    <BreadCrumbs
      v-bind="{
        links: [
          {
            title: $t('volunteers'),
            url: `volunteer`,
          },
          {
            title: volunteersSingle.user_data
              ? volunteersSingle.user_data.last_name
              : '',
            url:
              `volunteer/` +
              (volunteersSingle.user_data ? volunteersSingle.user_data.id : ''),
          },
        ],
      }"
    />
    <Preloader :fetch-state="$fetchState" :data="volunteersSingle">
      <div
        class="grid grid-cols-12 container b:flex b:flex-col items-start b:items-stretch !pb-[32px]"
      >
        <div class="col-span-9 b:col-span-12 grid mb-[52]">
          <VolunteeritemCard
            v-if="volunteersSingle.user_data"
            no-hours
            v-bind="{
              userImg: volunteersSingle.user_data.photo
                ? volunteersSingle.user_data.photo
                : volunteersSingle.user_data.default_photo,
              dateOfBirth: volunteersSingle.user_data
                ? volunteersSingle.user_data.date_of_birth
                : '',
              userName: volunteersSingle.user_data
                ? volunteersSingle.user_data.first_name +
                  ' ' +
                  volunteersSingle.user_data.last_name
                : '',
              address:
                (volunteersSingle.user_data.region_data.name
                  ? volunteersSingle.user_data.region_data.name
                  : '') +
                ', ' +
                (volunteersSingle.user_data.district_data.name
                  ? volunteersSingle.user_data.district_data.name
                  : ''),

              rating: volunteersSingle.user_data.avg_rating ?? '0.0',
              phone: volunteersSingle.user_data.phone_number
                ? volunteersSingle.user_data.phone_number
                : '',
              mail: volunteersSingle.user_data.email
                ? volunteersSingle.user_data.email
                : '',
              youtubeLink: volunteersSingle.user_data.youtube ?? '',
              telegramLink: volunteersSingle.user_data.telegram ?? '',
              facebookLink: volunteersSingle.user_data.facebook ?? '',
              instagramLink: volunteersSingle.user_data.instagram ?? '',
              status: volunteersSingle.user_data
                ? volunteersSingle.user_data.status
                : '',
              hideId: true,
              dots: false,
              id: volunteersSingle.user_data.id,
            }"
          />
          <div
            class="px-[24px] !w-full py-[16px] e:px-[16px] e:py-[12px] bg-white rounded-lg mb-[20px] flex-between e:flex-col gap-[20px]"
          >
            <div
              class="flex flex-col e:gap-[8px] e:items-center e:flex-row !w-max"
            >
              <span class="text-gray-400 text-base font-semibold"
                >{{ $t('benefits') }}:</span
              >
              <span class="text-black text-[20px] font-bold"
                >{{ volunteersSingle.user_data?.total_hours ?? 0.0 }}
                {{ $t('hours') }}
              </span>
            </div>

            <div class="max-w-[664px] w-full flex-between relative z-10">
              <div
                class="absolute z-[-2] !w-[calc(100%-49px)] h-[6px] bg-[#C0C0C03D] left-1/2 -translate-x-1/2 top-[14px] before:absolute before:rounded-[20px] before:top-0 before:left-0 before:h-[6px] before:bg-[#FEC110] before:content-[''] before:z-[1]"
                :class="`before:w-[calc(100% - ${calculateBeforeWidth()}%)]`"
              />
              <div class="flex-center flex-col gap-[4px] z-1">
                <img
                  class="w-[32px] h-[32px] object-cover"
                  src="/icons/new-bronze.svg"
                  alt="diamond image"
                />
                <span class="text-black text-sm font-semibold">{{
                  $t('platine_name')
                }}</span>
              </div>
              <div class="flex-center flex-col gap-[4px] z-1">
                <img
                  class="w-[32px] h-[32px] object-cover"
                  src="/icons/new-silver.svg"
                  alt="diamond image"
                />
                <span class="text-black text-sm font-semibold">{{
                  $t('silver')
                }}</span>
              </div>

              <div class="flex-center flex-col gap-[4px] z-1">
                <img
                  class="w-[32px] h-[32px] object-cover"
                  src="/icons/new-gold.svg"
                  alt="diamond image"
                />
                <span class="text-black text-sm font-semibold">{{
                  $t('gold')
                }}</span>
              </div>

              <div class="flex-center flex-col gap-[4px] z-1">
                <img
                  class="w-[32px] h-[32px] object-cover"
                  src="/icons/new-diamond.svg"
                  alt="diamond image"
                />
                <span class="text-black text-sm font-semibold">{{
                  $t('platinum')
                }}</span>
              </div>
            </div>
          </div>
          <div
            v-if="
              volunteersSingle.user_data && volunteersSingle.user_data.profile
            "
            class="flex flex-col gap-[20px]"
          >
            <!--          О волонтере-->
            <div
              v-if="volunteersSingle.user_data.profile.about_me"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('about_volunteer') }}</h3>
              <p class="text-base f:text-sm">
                {{ volunteersSingle.user_data.profile.about_me }}
              </p>
            </div>
            <!--          Уровень образования-->
            <div
              v-if="volunteersSingle.user_data.profile.education_level"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('level_education') }}</h3>
              <p class="text-base f:text-sm">
                {{
                  educationLevel.find(
                    (item) =>
                      item.id ===
                      volunteersSingle.user_data.profile.education_level
                  ).name
                }}
              </p>
            </div>
            <!--          Языки-->
            <div
              v-if="volunteersSingle.user_data.profile.languages_data.length"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('languages') }}</h3>
              <div class="flex atems-center flex-wrap gap-[4px]">
                <span
                  v-for="(item, index) in volunteersSingle.user_data.profile
                    .languages_data"
                  :key="index"
                >
                  <img :src="item.logo" alt="" />
                  <p>{{ item.name }}</p>
                </span>
              </div>
            </div>
            <!--          Специальность-->
            <div
              v-if="volunteersSingle.user_data.profile.specialty"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('speciality') }}</h3>
              <p class="text-base f:text-sm">
                {{ volunteersSingle.user_data.profile.specialty }}
              </p>
            </div>
            <!--          Интересы-->
            <div
              v-if="volunteersSingle.user_data.profile.interests"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('interests') }}</h3>
              <p class="text-base f:text-sm">
                {{ volunteersSingle.user_data.profile.interests }}
              </p>
            </div>
            <!--          Цель-->
            <div
              v-if="volunteersSingle.user_data.profile.goals_data.length"
              class="volunteer-slug__about"
            >
              <h3>{{ $t('Target') }}</h3>
              <div class="flex atems-center flex-wrap gap-[4px]">
                <span
                  v-for="(item, index) in volunteersSingle.user_data.profile
                    .goals_data"
                  :key="index"
                >
                  <p class="uppercase">
                    {{ $t('Target') }} {{ index + 1 }} : {{ item.name }}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="
              volunteersSingle.volunteer_events_finished ||
              volunteersSingle.volunteer_events_active
            "
            class="initiative-slug__events mt-[32px]"
          >
            <h3
              v-if="
                volunteersSingle.volunteer_events_active.length ||
                volunteersSingle.volunteer_events_finished.length
              "
            >
              {{ $t('projectss') }}
            </h3>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane
                v-if="volunteersSingle.volunteer_events_active.length"
                :label="
                  this.$t('implemented') +
                  ` (${volunteersSingle.volunteer_events_active.length})`
                "
                name="first"
              >
                <div
                  v-for="item of getDayGroup(
                    volunteersSingle.volunteer_events_active
                  )"
                  :key="item.id"
                >
                  <p class="pb-[20px]">
                    {{ $dayjs(item.date).format('DD.MMMM.YY') }}
                  </p>
                  <Main-event-card
                    v-for="(events, index) in item.items"
                    :key="index"
                    class="mb-[20px]"
                    v-bind="{
                      id: events.id,
                      title: events.title,
                      date:
                        events.starting_date.replace(/-/g, '.') +
                        ' - ' +
                        events.finishing_date.replace(/-/g, '.'),
                      time:
                        events.starting_time +
                        ' ' +
                        '-' +
                        ' ' +
                        events.starting_time,
                      address: events.region
                        ? events.region.name
                        : '' + ', ' + events.district
                        ? events.district.name
                        : '',
                      organizer: events.organization.organization_name,
                      organizerImg: events.organization.photo,
                      tags: events.tag,
                      slug: events.slug,
                      inProgress: events.status,
                      liked: events.liked,
                      subsribed: events.is_subscribed,
                      organizationId: events.organization.id,
                      likedIcon: true,
                      img: events.image,
                    }"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane
                v-if="volunteersSingle.volunteer_events_finished.length"
                :label="
                  this.$t('ended') +
                  ` (${volunteersSingle.volunteer_events_finished.length})`
                "
                name="second"
              >
                <Main-event-card
                  v-for="(
                    item, index
                  ) in volunteersSingle.volunteer_events_finished"
                  :key="index"
                  v-bind="{
                    id: item.id,
                    title: item.title,
                    date:
                      item.starting_date.replace(/-/g, '.') +
                      ' - ' +
                      item.finishing_date.replace(/-/g, '.'),
                    time:
                      item.starting_time + ' ' + '-' + ' ' + item.starting_time,
                    address: item.region
                      ? item.region.name
                      : '' + ', ' + item.district
                      ? item.district.name
                      : '',
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: item.slug,
                    inProgress: item.status,
                    liked: item.liked,
                    subsribed: item.is_subscribed,
                    organizationId: item.organization.id,
                    likedIcon: true,
                    img: item.image,
                  }"
                  class="mb-[20px]"
                />
              </el-tab-pane>
            </el-tabs>
          </div>

          <div
            v-if="allComments.length || commentsInson.length"
            class="mb-[20px]"
          >
            <span class="text-2xl e:text-lg text-black font-bold">{{
              $t('reviews_volan')
            }}</span>
            <div
              class="flex flex-col gap-[20px] e:gap-[12px] mt-[20px] e:mt-[12px]"
            >
              <Reviews
                v-for="(item, i) in commentsInson"
                :key="i"
                inson-comments
                v-bind="{
                  img: '/img/inson-logo.svg',
                  name: item.supervisor?.first_name,
                  text: item.review,
                  rate: item.rating,
                }"
              >
              </Reviews>
              <Reviews
                v-for="(item, i) in allComments"
                :key="i"
                v-bind="{
                  img: item.organization.photo,
                  name: item.organization?.organization_name,
                  text: item.review,
                  rate: item.rating,
                }"
              >
              </Reviews>
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
        </div>
        <div
          class="col-span-3 b:col-span-12 b:mb-[20px] pl-[24px] b:pl-[0px] b:flex justify-between b:flex-col b:items-center"
        >
          <SocialVolunteer
            v-if="volunteersSingle?.user_data?.volunteer_type === 1"
            :title="$t('is_member')"
            :subtitle="$t('protection_agency')"
            class="mb-[24px]"
          />
          <Feedback @open-rate="sendFeedback" />
          <Share
            class="mt-[12px] mb-[20px]"
            @shareOpen="shareOpen(volunteersSingle?.user_data?.photo)"
          />
          <JoinUs />
        </div>
      </div>
    </Preloader>

    <ShareModal
      v-bind="{
        id: 'shareVolunteer',
        title: $t('share'),
        shareImg: volunteersSingle?.user_data?.photo,
      }"
      @click="getImage(volunteersSingle?.user_data?.photo)"
    />
    <Modal
      :id="`rateUs`"
      v-bind="{
        title: this.$t('rate_volunteer'),
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
                  volunteersSingle?.user_data?.photo ??
                  'https://volontyor.uz/static/images/avatars/volunteer.svg'
                "
                alt="rate us logo"
                class="w-[44px] h-[44px] object-cover rounded-[6px] overflow-hidden"
              />
              <div class="flex-col gap-[2px]">
                <span class="text-base font-bold text-black">{{
                  volunteersSingle?.user_data?.first_name +
                  ' ' +
                  volunteersSingle?.user_data?.last_name
                }}</span>
                <div class="flex items-center gap-[4px]">
                  <img src="/icons/phone.svg" alt="phone" />
                  <span class="text-[11px] text-black">{{
                    volunteersSingle?.user_data?.phone_number
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
                volunteersSingle?.user_data?.avg_rating
              }}</span>
            </div>
          </div>
          <!--        stars-->
          <div class="my-[16px]">
            <el-rate v-model="rateOfVolunteer"></el-rate>
          </div>

          <div class="mt-[46px]">
            <FormGroup :label="$t('your_feedback')" for-id="your_feedback">
              <FormTextarea
                id="your_feedback"
                v-model="form.text"
                :error="$v.form.text.$error"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import CButton from '@/components/new/Button/CButton.vue'
import JoinUs from '@/components/sidebar/JoinUs.vue'
import Feedback from '@/components/sidebar/Feedback.vue'
import SocialVolunteer from '@/components/volontyor/SocialVolunteer.vue'
import Share from '@/components/sidebar/Share.vue'
import Modal from '@/components/volontyor/Modal.vue'
import FormGroup from '@/components/new/Form/CGroup.vue'
import FormTextarea from '@/components/new/Form/Textarea.vue'
import VolunteeritemCard from '../../components/cards/VolunteerItemCard.vue'
import Reviews from '~/components/cards/Reviews.vue'
import MainEventCard from '~/components/cards/MainEventCard.vue'
import BreadCrumbs from '~/components/BreadCrumbs.vue'
import ShareModal from '~/components/ShareModal.vue'

export default {
  layout: 'pages',
  components: {
    ShareModal,
    FormTextarea,
    FormGroup,
    Modal,
    Share,
    SocialVolunteer,
    Feedback,
    JoinUs,
    Reviews,
    CButton,
    VolunteeritemCard,
    BreadCrumbs,
    MainEventCard,
  },
  async fetch() {
    await this.$store.dispatch(
      'volunteers/fetchVolunteersSingle',
      this.$route.params.slug
    )
    await this.$store.dispatch('volunteers/fetchVolunteerComments', {
      id: this.$route.params.slug,
      limit: 5,
      offset: this.count - 5,
    })
    await this.$store.dispatch('volunteers/fetchVolunteerCommentsInson', {
      id: this.$route.params.slug,
      limit: 5,
      offset: this.count - 5,
    })
  },
  data() {
    return {
      activeName: 'first',
      form: {
        text: '',
      },
      count: 5,
      rateOfVolunteer: 1,
      loading: false,
      educationLevel: [
        { name: this.$t('education_medium'), id: 1 },
        { name: this.$t('education_medium_specific'), id: 2 },
        { name: this.$t('bachelor'), id: 3 },
        { name: this.$t('master'), id: 4 },
      ],
    }
  },
  computed: {
    ...mapState({
      volunteersSingle: (state) => state.volunteers.volunteersSingle,
      user: (state) => state.auth.user,
      total: (state) => state.volunteers.commentTotal,
      comments: (state) => state.volunteers.volunteerComments,
      commentsInson: (state) => state.volunteers.volunteerCommentsInson,
    }),

    allComments() {
      return [...this.comments]
    },
  },
  methods: {
    calculateBeforeWidth() {
      const totalHours = this.volunteersSingle.user_data?.total_hours || 0

      if (totalHours === 0) {
        return 200
      } else if (totalHours === 50) {
        return 30
      } else {
        return 60
      }
    },

    shareOpen(image) {
      // setTimeout(() => {
      // }, 1000)
      this.$modal('shareVolunteer')
      this.$store.commit('setImage', image)
    },
    sendFeedback() {
      if (this.user) {
        this.$modal('rateUs')
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
    getDayGroup(array) {
      if (array) {
        const groups = array?.reduce((groups, item) => {
          const date = item.starting_date.split('T')[0]
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(item)
          return groups
        }, {})

        const groupArrays = Object.keys(groups).map((date) => {
          const items = groups[date]
          return {
            date,
            items,
          }
        })
        return groupArrays
      }
    },
    submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true
        this.$postAction(`/giving_rating/`, {
          data: {
            volunteer: this.volunteersSingle?.user_data?.id,
            rating: this.rateOfVolunteer,
            review: this.form.text,
          },
        })
          .then(() => {
            this.success = true
            this.$toast.success(this.$t('success_rate'))
            this.$store.dispatch(
              'volunteers/fetchVolunteersSingle',
              this.$route.params.slug
            )

            this.$store.dispatch('volunteers/fetchVolunteerComments', {
              id: this.$route.params.slug,
              limit: 5,
              offset: this.count - 5,
            })
          })
          .catch((err) => {
            this.$toast.error(err?.response?.data.error_message)
            // this.$router.push('/')
          })
          .finally(() => {
            this.loading = false
            this.$modalHide('rateUs')
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
}
</script>

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
