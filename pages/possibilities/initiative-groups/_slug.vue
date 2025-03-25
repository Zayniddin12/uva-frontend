<template>
  <div>
    <BreadCrumbs :links="links" />
    <Preloader :fetch-state="$fetchState" :data="groupSingle.data">
      <div
        class="container initiative-slug grid grid-cols-12 items-start b:items-stretch b:flex b:flex-col-reverse"
      >
        <div
          v-if="groupSingle.data"
          class="col-span-9 b:col-span-12 grid mb-[52px]"
        >
          <!--                {{groupSingle.data }}-->
          <div class="initiative-card p-[20px] mb-[24px]">
            <div class="top grid grid-cols-4 mb-[8px]">
              <div
                v-if="groupSingle.data"
                class="left-side col-span-3 c:col-span-4 c:mb-[15px] flex items-center g:flex-col g:items-start"
              >
                <div class="image-box shrink-0 mr-[12px] g:mb-[12px]">
                  <img :src="groupSingle.data.default_photo" :alt="title" />
                </div>
                <div class="top__texts">
                  <h5 class="title">
                    <nuxt-link
                      :to="
                        localePath(
                          '/possibilities/initiative-groups/' +
                            groupSingle.data.id
                        )
                      "
                    >
                      {{ groupSingle.data.organization_name }}
                    </nuxt-link>
                  </h5>
                  <div class="flex address">
                    <span class="flex items-center">
                      <icon-base class="icon mr-[6px]" name="location-icon" />
                      <p
                        v-if="
                          groupSingle.data &&
                          groupSingle.data.region &&
                          groupSingle.data &&
                          groupSingle.data.district
                        "
                      >
                        {{
                          groupSingle.data.region.name +
                          ', ' +
                          groupSingle.data.district.name
                        }}
                      </p>
                    </span>
                    <el-divider
                      class="vertical-divider"
                      direction="vertical"
                    ></el-divider>
                    <span class="flex items-center">
                      <icon-base class="icon mr-[6px]" name="Calling" />
                      <a :href="`tel:${groupSingle.data.phone_number}`">
                        <p>
                          {{
                            groupSingle.data.phone_number
                              | VMask('+998 (##) ###-##-##')
                          }}
                        </p>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div class="right-side socials">
                <a
                  v-if="groupSingle.data.youtube"
                  target="_blank"
                  :href="groupSingle.data.youtube"
                  class="tooltip cursor-pointer"
                  rel="noopener noreferrer"
                  title="Youtube"
                >
                  <icon-base name="youtube" class="icon" />
                </a>
                <a
                  v-if="groupSingle.data.telegram"
                  target="_blank"
                  :href="groupSingle.data.telegram"
                  class="tooltip cursor-pointer"
                  rel="noopener noreferrer"
                  title="Telegram"
                >
                  <icon-base name="tg" class="icon" />
                </a>
                <a
                  v-if="groupSingle.data.facebook"
                  target="_blank"
                  :href="groupSingle.data.facebook"
                  class="tooltip cursor-pointer"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <icon-base name="fb" class="icon" />
                </a>
                <a
                  v-if="groupSingle.data.instagram"
                  target="_blank"
                  :href="groupSingle.data.instagram"
                  class="tooltip cursor-pointer"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <icon-base name="insta" class="icon" />
                </a>
              </div>
            </div>
            <div v-if="$auth.user && $auth.user.user_type === 1" class="bottom">
              <div
                class="flex items-center grid-cols-2 justify-between f:flex-col f:items-start"
              >
                <div class="flex items-center f:mb-[15px]">
                  <p class="quantity mr-[5px] !mb-[0px]">
                    {{ $t('number_volunteers') }}:
                  </p>
                  <p class="count !mb-[0px]">
                    {{ groupSingle.data.number_volunteers }}
                  </p>
                </div>
                <div class="f:col-span-2">
                  <button
                    v-if="!joinGroup"
                    class="join-btn flex items-center justify-center"
                    @click="join()"
                  >
                    <icon-base name="Add" class="icon mr-[4px]" />
                    {{ $t('join') }}
                  </button>
                  <button
                    v-else
                    class="leave-btn flex items-center justify-center"
                    @click="join()"
                  >
                    <icon-base name="leave" class="icon mr-[4px]" />
                    {{ $t('leave_group') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="groupSingle.data.about.length"
            class="initiative-slug__about"
          >
            <h3>{{ $t('about_group') }}</h3>
            <p class="text-base f:text-sm">
              {{ groupSingle.data.about }}
            </p>
          </div>
          <div
            v-if="groupVolunteer.results && groupVolunteer.results.length"
            class="initiative-slug__volunteers mt-[32px]"
          >
            <h3>{{ $t('volunteers') }}</h3>
            <div class="initiative-slug__list">
              <VolunteeritemCard
                v-for="(item, index) in groupVolunteer.results"
                :key="index"
                v-bind="{
                  userImg: item ? item.default_photo : '',
                  userName: item.first_name + ' ' + item.last_name,
                  address: item.region.name + ', ' + item.district.name,
                  id: item.id,
                  rating: item.avg_rating,
                  dots: false,
                }"
              />
              <!--            <button class="initiative-slug__btn-more flex items-center justify-center">-->
              <!--              <p class="mr-[9px]">{{ $t("more") }}</p>-->
              <!--              <icon-base name="icon-more" class="icon more-icon" />-->
              <!--            </button>-->
              <v-pagination
                v-if="groupVolunteer.total_pages > 1"
                v-model="page"
                class="mb-[64px]"
                :length="groupVolunteer.total_pages"
              ></v-pagination>
            </div>
          </div>
          <div class="initiative-slug__events mt-[32px]">
            <h3
              v-if="
                groupSingle.finished_events.length ||
                groupSingle.active_events.length
              "
            >
              {{ $t('events') }}
            </h3>
            <el-tabs v-model="activeName">
              <el-tab-pane
                v-if="groupSingle.active_events.length"
                :label="`${$t('implemented')} (${
                  groupSingle.active_events.length
                })`"
                name="first"
              >
                <Main-event-card
                  v-for="(item, index) in groupSingle.active_events"
                  :key="index"
                  v-bind="{
                    title: item.title,
                    date:
                      $moment(item.starting_date, 'DD.MM.YYYY') +
                      ' - ' +
                      $moment(item.finishing_date, 'DD.MM.YYYY'),
                    time: item.starting_time + ' - ' + item.finishing_time,
                    address: item.district.region + ', ' + item.district.name,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: item.slug,
                    inProgress: 'beVolunteer',
                    liked: false,
                    likedIcon: true,
                    img: item.image,
                  }"
                  class="mb-[20px]"
                />
              </el-tab-pane>
              <el-tab-pane
                v-if="groupSingle.finished_events.length"
                :label="`${$t('ended')} (${
                  groupSingle.finished_events.length
                })`"
                name="second"
              >
                <Main-event-card
                  v-for="(item, index) in groupSingle.finished_events"
                  :key="index"
                  v-bind="{
                    title: item.title,
                    date:
                      $moment(item.starting_date, 'DD.MM.YYYY') +
                      ' - ' +
                      $moment(item.finishing_date, 'DD.MM.YYYY'),
                    time: item.starting_time + ' - ' + item.finishing_time,
                    address: item.district.region + ', ' + item.district.name,
                    organizer: item.organization.organization_name,
                    organizerImg: item.organization.photo,
                    tags: item.tag,
                    slug: item.slug,
                    inProgress: 'beVolunteer',
                    liked: false,
                    likedIcon: true,
                    img: item.image,
                  }"
                  class="mb-[20px]"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <aside
          class="col-span-3 b:col-span-12 b:mb-[20px] pl-[24px] b:pl-[0px]"
        >
          <Nav-side-bar />
        </aside>
      </div>
    </Preloader>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VolunteeritemCard from '../../../components/cards/VolunteerItemCard.vue'
import BreadCrumbs from '~/components/BreadCrumbs'
import IconBase from '~/components/volontyor/IconBase.vue'
import NavSideBar from '~/components/sidebar/NavSideBar.vue'
import MainEventCard from '~/components/cards/MainEventCard.vue'

export default {
  layout: 'pages',
  components: {
    BreadCrumbs,
    IconBase,
    VolunteeritemCard,
    NavSideBar,
    MainEventCard,
  },
  props: {
    title: {
      type: String,
      default: 'title',
    },
    imgLink: {
      type: String,
      default: 'https://picsum.photos/200/500',
    },
    slug: {
      type: String,
      default: '/',
    },
    address: {
      type: String,
      default: 'address',
    },
    phoneNumber: {
      type: String,
      default: 'phone number',
    },
    volunteerCount: {
      type: Number,
      default: 0,
    },
    youtubeLink: {
      type: String,
      default: '/',
    },
    telegramLink: {
      type: String,
      default: '/',
    },
    facebookLink: {
      type: String,
      default: '/',
    },
    instagramLink: {
      type: String,
      default: '/',
    },
    description: {
      type: String,
      default: '',
    },
  },
  async fetch() {
    await this.$store
      .dispatch('initiative_groups/fetchGroupSingle', this.$route.params.slug)
      .then((res) => {
        this.joinGroup = res?.data?.is_joined
        if (!res.data.active_events.length) this.activeName = 'second'
      })
      .catch(() => {})
    await this.$store.dispatch('initiative_groups/fetchGroupVolunteer', {
      id: this.$route.params.slug,
      page: this.page,
    })
  },
  data() {
    return {
      joinGroup: false,
      activeName: 'first',
      page: Number(this.$route.query.page) || 1,
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('initiative_groups'),
          url: `possibilities/initiative-groups`,
        },
        {
          title: this.groupSingle?.data?.organization_name || '',
        },
      ]
    },
    ...mapState({
      groupSingle: (state) => state.initiative_groups.groupSingle,
      groupVolunteer: (state) => state.initiative_groups.groupVolunteer,
    }),
  },
  watch: {
    async page(item, item1) {
      await this.$router.push({
        path: this.$route.path,
        query: {
          page: this.page,
        },
      })
      await this.$store.dispatch('initiative_groups/fetchGroupVolunteer', {
        id: this.$route.params.slug,
        page: item,
      })
    },
  },
  methods: {
    async join() {
      this.joinGroup = !this.joinGroup
      if (this.joinGroup) {
        await this.$postAction(`join_initiative_group/`, {
          data: {
            volunteer: this.$auth.user.id,
            initiative_group: this.$route.params.slug,
          },
        })
          .then(this.$toast.success(this.$t('you_in_group')))
          .catch(() => {
            this.$toast.error('error')
          })
      } else {
        await this.$postAction(`/leave_initiative_group/`, {
          data: {
            volunteer: this.$auth.user.id,
            initiative_group: this.$route.params.slug,
          },
        })
          .then(this.$toast.success(this.$t('you_left_group')))
          .catch(() => {
            this.$toast.error('error')
          })
      }
    },
  },
  head() {
    return {
      title: this.groupSingle.data
        ? this.groupSingle.data.organization_name
        : 'Volontyor.uz',
    }
  },
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  cursor: pointer;
}

.tooltip::before,
.tooltip::after {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
}

.tooltip:hover::before,
.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}

.tooltip::before {
  content: attr(title);
  z-index: 2;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 5px;
  bottom: 35px;
  left: -29px;
}

.tooltip::after {
  content: '';
  width: 0;
  height: 0;
}

.tooltip--top::before,
.tooltip--top::after {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 15px;
}

.tooltip--top::after {
  margin-bottom: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid rgba(0, 0, 0, 0.7);
}

.tooltip--bottom::before,
.tooltip--bottom::after {
  top: 100%;
  left: 50%;
  transform: translate(-50%);
  margin-top: 15px;
}
</style>
