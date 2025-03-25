<template>
  <div style="background-color: #fff" class="pt-[130px] pb-[120px]">
    <div class="container">
      <div class="grid grid-cols-12 mt-16 gap-[24px]">
        <div class="col-span-7 c:col-span-12 google-map c:h-[300px]">
          <client-only>
            <GmapMap
              :center="{ lat: 10, lng: 10 }"
              :zoom="2"
              map-type-id="terrain"
              class="rounded-[12px] w-[100%] h-[100%] overflow-hidden"
            >
              <GmapMarker
                v-for="(m, index) in tab === 'tab-1'
                  ? volunteerCoords
                  : tab === 'tab-2'
                  ? socVolunteerCords
                  : tab === 'tab-3'
                  ? orgsCoords
                  : eventsCoords"
                :key="index"
                :position="m"
                url="https://picsum.photos/30/30"
                :icon="{
                  url:
                    tab === 'tab-1'
                      ? '/icons/volunteer-marker.svg'
                      : tab === 'tab-2'
                      ? '/icons/social-volunteer.svg'
                      : tab === 'tab-3'
                      ? '/icons/organization-marker.svg'
                      : '/icons/event-marker.svg',
                }"
              />
            </GmapMap>
          </client-only>
        </div>
        <div class="map__tab col-span-5 c:col-span-12">
          <client-only>
            <v-card class="w-fullicon mx-[auto] g:flex-col">
              <v-tabs v-model="tab" icons-and-text>
                <v-tab href="#tab-1"> {{ $t('volunteers') }} </v-tab
                ><v-tab href="#tab-2">
                  {{ $t('soc_volunteer') }}
                </v-tab>
                <v-tab href="#tab-3">
                  {{ $t('organization') }}
                </v-tab>
                <v-tab href="#tab-4">
                  {{ $t('events') }}
                </v-tab>
              </v-tabs>
            </v-card>
            <!--    AUTH TABS CONTENT-->
            <v-tabs-items v-model="tab">
              <v-tab-item value="tab-1">
                <!-- section-list -->
                <div class="map__volunteer-list">
                  <!-- Input -->
                  <div class="map__volunteer-list-head">
                    <div class="form">
                      <Input
                        v-model="searchVolun"
                        :placeholder="`${$t('search')}...`"
                        :position="['left', 'right']"
                        right="true"
                        left="true"
                        class-input="!px-[34px]"
                      >
                        <template #left>
                          <img src="/icons/search-icon.svg" />
                        </template>
                        <template #right>
                          <svg
                            v-if="searchVolun.length"
                            class="group cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            @click="searchVolun = ''"
                          >
                            <circle
                              class="group-hover:stroke-blue"
                              cx="22.0003"
                              cy="22"
                              r="18.3333"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                            />
                            <path
                              class="group-hover:stroke-blue"
                              d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                              stroke-linecap="round"
                            />
                          </svg>
                        </template>
                      </Input>
                    </div>
                  </div>
                  <div class="map__volunteer-list__header">
                    <div
                      class="flex items-center justify-between !w-full g:flex-col g:items-end"
                    >
                      <div class="flex items-center">
                        <h3 class="map__volunteer-list__title">
                          {{ $t('volunteers') }}
                        </h3>
                        <span class="map__volunteer-amount ml-2">
                          {{ numbers.number_all_volunteers }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="map__volunteer-list__body h-[372px] pb-[10px]">
                    <not-found
                      v-if="!volunteers.length"
                      :title="socVolonterTitle"
                      :subtitle="socVolonterSubtitle"
                      class="_mini"
                    />
                    <div v-else class="volunteer-list">
                      <nuxt-link
                        v-for="(item, index) in volunteers"
                        :key="index"
                        :to="localePath(`/volunteer/` + item.id)"
                        class="volunteer-list__item flex items-center justify-between"
                      >
                        <div
                          class="volunteer-list__profile d-flex align-center justify-between"
                        >
                          <img
                            class="volunteer-list__ava"
                            :src="item.photo || item.default_photo"
                            alt="volunteer-ava"
                          />
                          <div class="volunteer-list__inform">
                            <div
                              class="flex items-center g:flex-col g:items-start"
                            >
                              <h5 class="volunteer-list__name">
                                {{
                                  `${item.first_name ? item.first_name : ''} ${
                                    item.last_name ? item.last_name : ''
                                  }`
                                }}
                              </h5>

                              <p
                                v-if="item.age > 0"
                                class="volunteer-list__age ml-[3px] !mb-[0]"
                              >
                                ({{ item.age }} {{ russianAgeCalc(item.age) }})
                              </p>

                              <img
                                v-if="iconSrc !== null"
                                class="!w-[24px] !h-[24px] ml-[8px]"
                                :src="iconSrc"
                                alt="ico"
                              />
                            </div>
                            <h6 class="volunteer-list__id">
                              <span>ID:</span> {{ item.id }}
                            </h6>
                          </div>
                        </div>
                        <div class="volunteer-list__rating">
                          <div>
                            <h5 class="volunteer-list__rating-value">
                              {{ item.avg_rating }}
                            </h5>
                            <span class="volunteer-list__rating-star">
                              <img src="~/static/icons/star_1.svg" alt="icon" />
                            </span>
                          </div>
                          <div>
                            <span class="text-xs text-gray-400"
                              >{{ $t('benefits') }}:</span
                            >

                            <h5 class="volunteer-list__rating-value">
                              {{ item?.total_hours ?? 0.0 }}
                            </h5>
                          </div>
                        </div>
                        <!--                        <div class="flex flex-col gap-[4px]">-->
                        <!--                          right-->

                        <!--                        </div>-->
                      </nuxt-link>
                    </div>
                    <nuxt-link
                      v-if="volunteers.length"
                      :to="localePath('/volunteer/')"
                      type="button"
                      class="map-btn !text-gray-400"
                    >
                      {{ $t('all_volunteer') }}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 3.5L10.25 8L5.75 12.5"
                          stroke="#90A1B5"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </nuxt-link>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <div class="map__volunteer-list">
                  <!-- Input -->
                  <div class="map__volunteer-list-head">
                    <div class="form">
                      <Input
                        v-model="searchSotVolun"
                        :placeholder="`${$t('search')}...`"
                        :position="['left', 'right']"
                        right="true"
                        left="true"
                        class-input="!px-[34px]"
                      >
                        <template #left>
                          <img src="/icons/search-icon.svg" />
                        </template>
                        <template #right>
                          <svg
                            v-if="searchSotVolun.length"
                            class="group cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            @click="searchSotVolun = ''"
                          >
                            <circle
                              class="group-hover:stroke-blue"
                              cx="22.0003"
                              cy="22"
                              r="18.3333"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                            />
                            <path
                              class="group-hover:stroke-blue"
                              d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                              stroke-linecap="round"
                            />
                          </svg>
                        </template>
                      </Input>
                    </div>
                  </div>
                  <div class="map__volunteer-list__header">
                    <div
                      class="flex items-center justify-between !w-full g:flex-col g:items-end"
                    >
                      <div class="flex items-center">
                        <h3 class="map__volunteer-list__title">
                          {{ $t('soc_volunteer') }}
                        </h3>
                        <span class="map__volunteer-amount ml-2">
                          {{ sotVolunteersCount }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!--                  tab2 -->
                  <div class="map__volunteer-list__body h-[372px] pb-[10px]">
                    <not-found
                      v-if="!sotVolontyor.length"
                      :title="socVolonterTitle"
                      :subtitle="socVolonterSubtitle"
                      class="_mini"
                    />
                    <div v-else class="volunteer-list">
                      <nuxt-link
                        v-for="(item, index) in sotVolontyor"
                        :key="index"
                        :to="localePath(`/volunteer/` + item.id)"
                        class="volunteer-list__item flex items-center justify-between"
                      >
                        <div
                          class="volunteer-list__profile d-flex align-center justify-between"
                        >
                          <img
                            class="volunteer-list__ava"
                            :src="item.photo || item.default_photo"
                            alt="volunteer-ava"
                          />
                          <div class="volunteer-list__inform">
                            <div
                              class="flex items-center g:flex-col g:items-start"
                            >
                              <h5 class="volunteer-list__name">
                                {{
                                  `${item.first_name ? item.first_name : ''} ${
                                    item.last_name ? item.last_name : ''
                                  }`
                                }}
                              </h5>

                              <p
                                v-if="item.age > 0"
                                class="volunteer-list__age ml-[3px] !mb-[0]"
                              >
                                ({{ item.age }} {{ russianAgeCalc(item.age) }})
                              </p>

                              <img
                                v-if="iconSrc !== null"
                                class="!w-[24px] !h-[24px] ml-[8px]"
                                :src="iconSrc"
                                alt="ico"
                              />
                            </div>
                            <h6 class="volunteer-list__id">
                              <span>ID:</span> {{ item.id }}
                            </h6>
                          </div>
                        </div>
                        <div class="volunteer-list__rating">
                          <div>
                            <h5 class="volunteer-list__rating-value">
                              {{ item.avg_rating }}
                            </h5>
                            <span class="volunteer-list__rating-star">
                              <img src="~/static/icons/star_1.svg" alt="icon" />
                            </span>
                          </div>
                          <div>
                            <span class="text-xs text-gray-400"
                              >{{ $t('benefits') }}:</span
                            >

                            <h5 class="volunteer-list__rating-value">
                              {{ item?.total_hours ?? 0.0 }}
                            </h5>
                          </div>
                        </div>
                        <!--                        <div class="flex flex-col gap-[4px]">-->
                        <!--                          right-->

                        <!--                        </div>-->
                      </nuxt-link>
                    </div>
                    <nuxt-link
                      v-if="volunteers.length"
                      :to="localePath('/volunteer/')"
                      type="button"
                      class="map-btn"
                    >
                      {{ $t('all_soc_volunteer') }}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 3.5L10.25 8L5.75 12.5"
                          stroke="#90A1B5"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </nuxt-link>
                  </div>
                  <!--                  tab2-->
                </div>
              </v-tab-item>
              <v-tab-item value="tab-3">
                <!-- section-list -->
                <div class="map__volunteer-list">
                  <!-- Input -->
                  <div class="map__volunteer-list-head">
                    <div class="form">
                      <Input
                        v-model="searchOrgan"
                        :placeholder="$t('search_organisation')"
                        :position="['left', 'right']"
                        right="true"
                        left="true"
                        class-input="!px-[34px]"
                      >
                        <template #left>
                          <img src="/icons/search-icon.svg" />
                        </template>
                        <template #right>
                          <svg
                            v-if="searchOrgan.length"
                            class="group cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            @click="searchOrgan = ''"
                          >
                            <circle
                              class="group-hover:stroke-blue"
                              cx="22.0003"
                              cy="22"
                              r="18.3333"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                            />
                            <path
                              class="group-hover:stroke-blue"
                              d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                              stroke-linecap="round"
                            />
                          </svg>
                        </template>
                      </Input>
                    </div>
                  </div>

                  <div class="map__volunteer-list__header">
                    <div
                      class="flex items-center justify-between !w-full g:flex-col g:items-end"
                    >
                      <div class="flex items-center">
                        <h3 class="map__volunteer-list__title">
                          {{ $t('organizations') }}
                        </h3>
                        <span class="map__volunteer-amount ml-2">
                          {{ numbers.number_all_organizations }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="map__organization-list__body h-[372px] pb-[10px]">
                    <not-found
                      v-if="!organizations.length"
                      :title="noOrgzinazation"
                      :subtitle="socVolonterSubtitle"
                      class="_mini"
                    />
                    <div v-else class="organization-list">
                      <NuxtLink
                        v-for="(item, index) in organizations"
                        :key="index"
                        :to="
                          localePath('/possibilities/organization/' + item.id)
                        "
                        class="organization-list__item flex items-center justify-between"
                      >
                        <div
                          class="organization-list__profile !w-full d-flex align-center justify-between"
                        >
                          <img
                            class="organization-list__ava"
                            :src="item.photo || item.default_photo"
                            alt="volunteer-ava"
                          />
                          <div class="organization-list__inform">
                            <div class="flex-between w-full">
                              <div class="font-bold text-sm text-black">
                                {{ item.organization_name }}
                              </div>
                              <div class="flex-center gap-[4px]">
                                <h5 class="text-black font-semibold text-sm">
                                  {{ item.avg_rating }}
                                </h5>
                                <span class="volunteer-list__rating-star">
                                  <img
                                    src="~/static/icons/star_1.svg"
                                    alt="icon"
                                  />
                                </span>
                              </div>
                            </div>
                            <div class="organization-list__contact">
                              <div v-if="item.phone_number" class="flex-center">
                                <img src="/icons/Calling.svg" alt="icon" />
                                <a class="organization-list__number">
                                  {{
                                    item.phone_number
                                      | VMask('+998 (##) ###-##-##')
                                  }}
                                </a>
                              </div>
                              <span v-if="item.phone_number" class="divider">
                                <img src="/icons/dividerrr.svg" alt="icon" />
                              </span>
                              <div class="flex items-center">
                                <img src="/icons/website.svg" />
                                <a class="organization-list__site">{{
                                  item.email
                                }}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                    <nuxt-link
                      v-if="organizations.length"
                      :to="localePath('/possibilities/organization/')"
                      type="button"
                      class="map-btn"
                    >
                      {{ $t('all_organization') }}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 3.5L10.25 8L5.75 12.5"
                          stroke="#90A1B5"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </nuxt-link>
                  </div>
                </div>
              </v-tab-item>
              <v-tab-item value="tab-4">
                <!-- section-list -->
                <div class="map__volunteer-list">
                  <!-- Input -->
                  <div class="map__volunteer-list-head">
                    <div class="form">
                      <Input
                        v-model="searchEvent"
                        :placeholder="`${$t('search')}...`"
                        :position="['left', 'right']"
                        right="true"
                        left="true"
                        class-input="!px-[34px]"
                      >
                        <template #left>
                          <img src="/icons/search-icon.svg" alt="" />
                        </template>
                        <template #right>
                          <svg
                            v-if="searchEvent.length"
                            class="group cursor-pointer"
                            width="24"
                            height="24"
                            viewBox="0 0 44 44"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            @click="searchEvent = ''"
                          >
                            <circle
                              class="group-hover:stroke-blue"
                              cx="22.0003"
                              cy="22"
                              r="18.3333"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                            />
                            <path
                              class="group-hover:stroke-blue"
                              d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                              stroke="#90A1B5"
                              stroke-width="2.4"
                              stroke-linecap="round"
                            />
                          </svg>
                        </template>
                      </Input>
                    </div>
                  </div>
                  <div class="map__volunteer-list__header">
                    <div
                      class="flex items-center justify-between !w-full g:flex-col g:items-end"
                    >
                      <div class="flex items-center">
                        <h3 class="map__volunteer-list__title">
                          {{ $t('events') }}
                        </h3>
                        <span class="map__volunteer-amount ml-2">
                          {{ numbers.number_events }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="map__organization-list__body h-[372px] pb-[10px]">
                    <not-found
                      v-if="!events.length"
                      :title="noEvents"
                      :subtitle="socVolonterSubtitle"
                      class="_mini"
                    />
                    <div
                      v-else
                      class="organization-list flex flex-col gap-[12px]"
                    >
                      <NuxtLink
                        v-for="(item, index) in events"
                        :key="index"
                        :to="localePath('/possibilities/' + item.slug)"
                        class="hover:bg-[#F7FBFE] w-full h-full bg-white transition-all duration-300 p-[12px] rounded-[8px]"
                      >
                        <div class="flex items-center gap-[12px]">
                          <div class="rounded-[6px] p-[6px] bg-[#FFE5A2] w-max">
                            <img
                              src="/icons/date-range-orange.svg"
                              alt="date range icon"
                            />
                          </div>

                          <h5
                            class="text-[#2C2D33] text-[14px] font-bold leading-[19px] mb-[2px] line-clamp-2"
                          >
                            {{ item.title }}
                          </h5>
                        </div>
                        <span
                          class="w-full h-[1px] bg-[#F1F1F2] rounded-lg mt-[12px] mb-[10px] block"
                        ></span>
                        <div class="flex-between w-full">
                          <div class="flex items-center gap-[8px]">
                            <div class="flex items-center gap-[4px] w-full">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M4.66667 7.33301H6V8.66634H4.66667V7.33301ZM14 3.99967V13.333C14 14.0663 13.4 14.6663 12.6667 14.6663H3.33333C2.59333 14.6663 2 14.0663 2 13.333L2.00667 3.99967C2.00667 3.26634 2.59333 2.66634 3.33333 2.66634H4V1.33301H5.33333V2.66634H10.6667V1.33301H12V2.66634H12.6667C13.4 2.66634 14 3.26634 14 3.99967ZM3.33333 5.33301H12.6667V3.99967H3.33333V5.33301ZM12.6667 13.333V6.66634H3.33333V13.333H12.6667ZM10 8.66634H11.3333V7.33301H10V8.66634ZM7.33333 8.66634H8.66667V7.33301H7.33333V8.66634Z"
                                  fill="#90A1B5"
                                />
                              </svg>
                              <span
                                class="text-[#2C2D33] text-[12px] leading-[16px] truncate"
                              >
                                {{
                                  $dayjs(item.starting_date).format(
                                    'DD.MM.YYYY'
                                  )
                                }}
                                -
                                {{
                                  $dayjs(item.finishing_date).format(
                                    'DD.MM.YYYY'
                                  )
                                }}
                              </span>
                            </div>

                            <div class="flex items-center gap-[4px] w-full">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="2"
                                  y="2"
                                  width="12"
                                  height="12"
                                  rx="6"
                                  stroke="#90A1B5"
                                  stroke-width="1.4"
                                />
                                <path
                                  d="M8 5.33301V8.66634L10.3333 9.99967"
                                  stroke="#90A1B5"
                                  stroke-width="1.4"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <span
                                class="text-[#2C2D33] text-[12px] leading-[16px]"
                                >{{ item.starting_time }} -
                                {{ item.finishing_time }}</span
                              >
                            </div>
                          </div>

                          <div class="flex items-center justify-end gap-[4px]">
                            <span class="text-gray-400 text-xs">
                              {{ $t('benefits') }}:
                            </span>
                            <span class="text-black text-xs font-semibold">{{
                              item.hours
                            }}</span>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                    <nuxt-link
                      v-if="events.length"
                      :to="localePath('/possibilities/')"
                      type="button"
                      class="map-btn"
                    >
                      {{ $t('all_events') }}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.75 3.5L10.25 8L5.75 12.5"
                          stroke="#90A1B5"
                          stroke-width="1.4"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </nuxt-link>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/helpers'
import Input from '~/components/form/Input.vue'
import NotFound from '~/components/notFound.vue'

export default {
  components: {
    Input,
    NotFound,
  },
  async fetch() {
    await this.fetchVolunteers()
    await this.fetchOrganizations()
    await this.fetchEvents()
    await this.fetchSotVolontyor()
    // await this.$getAction('/regions/').then((res) => {
    //   this.regions = res
    // })
  },
  data() {
    return {
      center: null,
      tab: 'tab-1',
      volunteerCoords: [],
      socVolunteerCords: [],
      orgsCoords: [],
      eventsCoords: [],
      typingTimeout: null,
      socVolonterTitle: this.$t('no_eventer'),
      noOrgzinazation: this.$t('no_orgzinazation'),
      noEvents: this.$t('no_event'),
      socVolonterSubtitle: this.$t(''),
      markers: [
        {
          position: {
            lat: 40.73061,
            lng: -73.935242,
          },
        },
      ],
      searchVolun: '',
      searchSotVolun: '',
      searchOrgan: '',
      searchEvent: '',
      selectedRegionIdVolunteers: undefined,
      selectedRegionIdOrganization: undefined,
      selectedRegionIdEvents: undefined,
      selectedSotVolontyor: undefined,
      volunteersCount: 0,
      sotVolunteersCount: 0,
      organizationsCount: 0,
      eventsCount: 0,
      volunteers: [],
      organizations: [],
      events: [],
      sotVolontyor: [],
    }
  },
  computed: {
    ...mapState({
      regionId: (state) => state.home.regionId,
      numbers: (state) => state.home.numbers,
    }),
    iconSrc() {
      if (this.sotVolontyor.avg_rating === 1) {
        return require('@/static/icons/new-silver.svg')
      } else if (this.sotVolontyor.avg_rating === 2) {
        return require('@/static/icons/new-gold.svg')
      } else if (this.sotVolontyor.avg_rating === 3) {
        return require('@/static/icons/new-diamond.svg')
      }
      return null
    },
  },
  watch: {
    searchVolun() {
      if (this.typingTimeout !== false) clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => this.fetchVolunteers(), 500)
    },
    searchSotVolun() {
      if (this.typingTimeout !== false) clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => this.fetchSotVolontyor(), 500)
    },
    searchOrgan() {
      if (this.typingTimeout !== false) clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => this.fetchOrganizations(), 500)
    },
    searchEvent() {
      debounce('search', () => this.fetchEvents())
    },
    selectedRegionIdVolunteers(value) {
      this.$store.commit('home/setRegionId', value)
      this.fetchVolunteers()
    },
    selectedRegionIdOrganization(value) {
      this.$store.commit('home/setRegionId', value)
      this.fetchOrganizations()
    },
    selectedRegionIdEvents(value) {
      this.$store.commit('home/setRegionId', value)
      this.fetchEvents()
    },
    selectedSotVolontyor(value) {
      this.$store.commit('home/setRegionId', value)
      this.fetchEvents()
    },
  },
  mounted() {
    this.selectedRegionIdVolunteers = this.regionId
  },
  methods: {
    async fetchVolunteers() {
      await this.$getAction('/main_page_volunteers/', {
        params: {
          district__region: this.selectedRegionIdVolunteers || undefined,
          search: this.searchVolun || undefined,
          limit: 30,
        },
      }).then((res) => {
        this.getCoords(res.volunteers, 'volunteerCoords')
        this.volunteersCount = res.number_volunteers_uzb
        this.volunteers = res.volunteers
      })
    },
    russianAgeCalc(age, ex) {
      // get last letter of age
      if (
        this.$root.$i18n.locale &&
        this.$root.$i18n.locale &&
        this.$root.$i18n.locale === 'ru'
      ) {
        const lastLetter = age.toString().slice(-1)
        if (lastLetter === '0') {
          return this.$t('yearss')
          // return age + ' лет';
        } else if (lastLetter === '1') {
          return this.$t('year')
          // return age + ' год';
        } else if (
          lastLetter === '2' ||
          lastLetter === '3' ||
          lastLetter === '4'
        ) {
          return this.$t('yearsss')
          // return age + ' года';
        } else {
          return this.$t('yearss')
          // return age + ' лет';
        }
      }

      return this.$t('yearsss')
    },
    async fetchOrganizations() {
      await this.$getAction('/main_page_organizations/', {
        params: {
          district__region: this.selectedRegionIdOrganization || undefined,
          search: this.searchOrgan || undefined,
          limit: 30,
        },
      }).then((res) => {
        this.getCoords(res.organizations, 'orgsCoords')
        this.organizationsCount = res.number_organizations
        this.organizations = res.organizations
      })
    },
    async fetchSotVolontyor() {
      await this.$getAction('/main_page_social_volunteers/', {
        params: {
          district__region: this.selectedSotVolontyor || undefined,
          search: this.searchSotVolun || undefined,
          limit: 30,
        },
      }).then((response) => {
        this.getCoords(response.volunteers, 'socVolunteerCords')
        this.sotVolontyor = response.volunteers
        this.sotVolunteersCount = response.number_volunteers_uzb
      })
    },
    async fetchEvents() {
      await this.$getAction('/event/', {
        params: {
          region: this.selectedRegionIdEvents || undefined,
          search: this.searchEvent || undefined,
          limit: 30,
        },
      }).then((response) => {
        this.getCoords(response.results, 'eventsCoords')
        this.events = response.results
        this.eventsCount = response.total
      })
    },
    selectRegion(selectedId) {
      this.selectedRegionId = selectedId
    },
    getCoords(array, coords, _merge) {
      this[coords] = []
      array.forEach((el) => {
        const coord = el.location.split(',')
        this[coords].push({ lat: +coord[0], lng: +coord[1] })
        this[coords].push({ lat: +coord[0], lng: +coord[1] })
      })
    },
  },
}
</script>

<style lang="scss">
.v-slide-group {
  &__prev,
  &__next {
    display: none !important;
  }
}
.v-ripple__container {
  display: none !important;
}
.region-active {
  fill: #da6b3b !important;
}

.region-active:hover {
  fill: #da6b3b !important;
}

.map-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 13px;
  line-height: calc(18 / 13 * 100%);
  color: #90a1b5 !important;
  padding: 8px 8px 8px 12px !important;
  margin: 4px auto 0;
  width: max-content;
  border: 1px solid #90a1b5;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  @apply text-gray-400;

  &:hover {
    background-color: rgba(144, 161, 181, 0.1);
  }
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  @apply bg-blue-500/10;
}
.el-select-dropdown__item {
  font-weight: 600;
  font-size: 12px;
  line-height: 130%;
  color: #52230f;
  height: auto;
  padding: 10px 16px;
}
.el-select-dropdown__item.selected {
  font-weight: 600;
  font-size: 12px;
  line-height: 130%;
}
.volunteer-list__rating-star {
  font-size: 14px;
}
.volunteer-list__rating-star > img {
  width: 14px;
  height: 14px;
}
.google-map {
  .gm-svpc,
  .gm-fullscreen-control,
  .gm-style-mtc,
  .gm-style-cc {
    display: none !important;
  }
}
</style>
