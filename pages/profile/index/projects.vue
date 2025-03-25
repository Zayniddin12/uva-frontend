<template>
  <div>
    <div class="initiative-slug__events mb-[52]">
      <h3 class="flex items-center justify-between g:flex-col g:items-start">
        {{ $t('events') }}
        <nuxt-link
          v-if="user.user_type === 2 && profile.is_verified === true"
          class="btn btn--blue max-w-[260px] g:mt-[15px] g:w-full"
          :to="localePath('/possibilities/form')"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.364 9.00019H2.63604"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 2.63623V15.3642"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ $t('add_event') }}
        </nuxt-link>
      </h3>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="`${$t('implemented')} (${activ.length})`" name="1">
          <!-- <p>{{ $moment(new Date(), "LL") }}</p> -->
          <Preloader :fetch-state="$fetchState" :data="activ">
            <div>
              <div class="grid gap-[20px]">
                <Main-event-card
                  v-for="(item, index) in activ"
                  :key="index"
                  v-bind="{
                    title: item.title,
                    date: `${$moment(
                      item.starting_date,
                      'DD.MM.YYYY'
                    )} - ${$moment(item.finishing_date, 'DD.MM.YYYY')}`,
                    time: `${item.starting_time} - ${item.finishing_time}`,
                    address: `${item.district ? item.district.name : ''},  ${
                      item.region ? item.region.name : ''
                    }`,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: `${item.slug}`,
                    inProgress: item.status,
                    status: item.status,
                    liked: item.liked,
                    subscribed: item.is_subscribed,
                    likedIcon: false,
                    img: item.image,
                    id: item.id,
                  }"
                />
              </div>
              <NotFound v-if="!activ.length" />
            </div>
          </Preloader>
        </el-tab-pane>
        <el-tab-pane :label="`${$t('ended')} (${finish.length})`" name="2">
          <div>
            <p v-if="user.user_type === 1" class="flex items-center">
              <span
                ><svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.4831 14.7039C9.8009 14.5121 10.1988 14.5121 10.5166 14.7039L13.1208 16.2757C13.8782 16.7328 14.8124 16.0538 14.6114 15.1924L13.9203 12.2298C13.836 11.8683 13.9588 11.4898 14.2394 11.2468L16.5418 9.25221C17.2104 8.67301 16.853 7.57474 15.9715 7.49996L12.9424 7.24297C12.5728 7.21161 12.2509 6.97828 12.1062 6.63678L10.9206 3.83936C10.576 3.02633 9.42371 3.02633 9.07912 3.83936L7.89349 6.63678C7.74875 6.97828 7.42689 7.21161 7.05731 7.24297L4.02813 7.49996C3.14671 7.57474 2.7893 8.673 3.4579 9.25221L5.7603 11.2468C6.04086 11.4898 6.16371 11.8683 6.07938 12.2298L5.38825 15.1924C5.18729 16.0538 6.12152 16.7328 6.87884 16.2757L9.4831 14.7039Z"
                    fill="#FEC110"
                  />
                </svg>
              </span>
              <span>- {{ $t('organizer_score_for_you') }}</span>
            </p>
          </div>
          <Preloader :fetch-state="$fetchState" :data="finish">
            <div>
              <div class="grid gap-[20px]">
                <div v-for="(item, index) in finish" :key="index">
                  <Main-event-card
                    v-bind="{
                      title: item.title,
                      date: `${item.starting_date} - ${item.finishing_date}`,
                      time: `${item.starting_time} -  ${item.finishing_time}`,
                      address: `${item.district ? item.district.name : ''},  ${
                        item.region ? item.region.name : ''
                      }`,
                      organizer: item.organization.organization_name,
                      organizerImg: item.organization.photo,
                      tags: item.tag,
                      slug: item.slug,
                      inProgress: item.status,
                      liked: item.liked,
                      subscribed: item.is_subscribed,
                      likedIcon: false,
                      stars: true,
                      img: item.image,
                      rating: item.rating,
                      id: item.id,
                    }"
                  />
                  <nuxt-link
                    class="btn btn--blue max-w-[218px] mt-[10px] ml-auto"
                    :to="localePath(`/volunteer?events_slug=${item.slug}`)"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4833 17.5819C11.8011 17.3901 12.1989 17.3901 12.5167 17.5819L16.151 19.7754C16.9083 20.2325 17.8426 19.5535 17.6416 18.692L16.6771 14.5578C16.5928 14.1963 16.7156 13.8178 16.9962 13.5748L20.2086 10.7919C20.8772 10.2127 20.5198 9.11442 19.6384 9.03964L15.4109 8.68098C15.0413 8.64962 14.7194 8.41629 14.5747 8.07479L12.9207 4.17237C12.5761 3.35934 11.4239 3.35934 11.0793 4.17237L9.42532 8.07479C9.28058 8.41629 8.95871 8.64962 8.58914 8.68098L4.36163 9.03964C3.4802 9.11442 3.1228 10.2127 3.79139 10.7919L7.0038 13.5748C7.28436 13.8178 7.40721 14.1963 7.32288 14.5578L6.35841 18.692C6.15745 19.5535 7.09168 20.2325 7.849 19.7754L11.4833 17.5819Z"
                        fill="#FEC110"
                      />
                    </svg>
                    {{ $t('rate_volunteers') }}
                  </nuxt-link>
                </div>
              </div>
              <NotFound v-if="!finish.length" />
            </div>
          </Preloader>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainEventCard from '../../../components/cards/MainEventCard.vue'
import NotFound from '~/components/notFound.vue'

export default {
  components: { MainEventCard, NotFound },
  async fetch() {
    await this.$store.dispatch('profile/fetchOrganization')
    if (this.user.user_type === 1) {
      await this.$store.dispatch('activity/fetchActivity')
      this.activ = this.activity.volunteer_events_active
      this.finish = this.activity.volunteer_events_finished
    } else {
      await this.$store.dispatch('activity/fetchOrgan')
      this.activ = this.organ.organization_events_active
      this.finish = this.organ.organization_events_finished
    }
  },
  data() {
    return {
      activeName: '1',
      activ: [],
      finish: [],
      status: ['', 'inProgress', 'completed', 'beVolunteer'],
    }
  },
  computed: {
    ...mapState({
      activity: (state) => state.activity.activity,
      organ: (state) => state.activity.organ,
      user: (state) => state.auth.user,
      profile: (state) => state.profile.organization,
    }),
  },
  mounted() {},
}
</script>
