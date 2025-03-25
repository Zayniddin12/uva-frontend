<template>
  <div class="eventss">
    <BreadCrumbs
      v-bind="{
        links: [
          {
            title: $t('events'),
            url: `possibilities`,
          },
          {
            title: $route.params.slug,
            url: `possibilities/${$route.params.slug}`,
          },
        ],
      }"
    />
    <div v-if="$fetchState.error">
      <div class="not-found">
        <icon-base name="error404" class="not-found__img" />
        <h4 class="not-found__title">{{ $t('not_found_title') }}</h4>
        <p class="not-found__subtitle">{{ $t('not_found_subtitle') }}</p>
        <nuxt-link :to="localePath('/')" class="not-found__btn btn btn--blue">{{
          $t('not_found_btn')
        }}</nuxt-link>
      </div>
    </div>
    <div v-else>
      <Preloader :fetch-state="$fetchState" :data="eventsSingle.instance">
        <div
          v-if="eventsSingle.instance"
          class="container events-single grid grid-cols-12 items-start b:items-stretch b:flex b:flex-col-reverse"
        >
          <div class="col-span-9 b:col-span-12 grid">
            <h3
              v-if="eventsSingle.instance"
              class="eventss__title text-2xl mb-[12px]"
            >
              {{ eventsSingle.instance.title }}
            </h3>
            <div class="flex items-center gap-[12px] mb-[12px]">
              <span class="eventss__date flex items-center">
                <icon-base name="date" class="mr-[4px]" />
                <p v-if="eventsSingle.instance">
                  {{
                    $moment(
                      eventsSingle.instance.created_date,
                      'DD.MM.YYYY, HH:mm'
                    )
                  }}
                </p>
              </span>
              <p
                v-if="
                  eventsSingle.instance && eventsSingle.instance.organization
                "
                class="eventss__creator"
              >
                {{ eventsSingle.instance.organization.organization_name }}
              </p>
            </div>
            <img
              v-if="eventsSingle.instance"
              class="eventss__img"
              :src="eventsSingle.instance.image"
            />
            <div
              v-if="
                this.$auth.user &&
                this.$auth.user.user_type === 2 &&
                eventsSingle.instance.organization.id === this.$auth.user.id
              "
              class="flex gap-[24px] mt-[16px]"
            >
              <nuxt-link
                :to="
                  localePath(
                    `/possibilities/form?slug=${this.$route.params.slug}`
                  )
                "
                class="update-btn"
              >
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask id="path-1-inside-1_1715_37768" fill="white">
                    <path
                      d="M11.2508 1.6415C11.8542 0.923441 12.8784 0.716793 13.6782 1.20677C14.165 1.50505 14.6852 1.85011 15.0697 2.17314C15.4462 2.4895 15.8572 2.92311 16.2185 3.33435C16.8334 4.03434 16.8019 5.07112 16.2026 5.78447L8.02498 15.517C7.58188 16.0444 6.97216 16.4052 6.29218 16.5152C5.0641 16.7138 3.15372 16.968 2.82297 16.6901C2.49223 16.4122 2.41336 14.4866 2.39738 13.2426C2.38853 12.5539 2.63882 11.8911 3.08192 11.3638L11.2508 1.6415Z"
                    />
                  </mask>
                  <path
                    d="M2.82297 16.6901L1.92236 17.762L2.82297 16.6901ZM2.39738 13.2426L0.997492 13.2606L2.39738 13.2426ZM15.1307 4.88386L6.95312 14.6164L9.09685 16.4177L17.2744 6.68508L15.1307 4.88386ZM4.15379 12.2644L12.3227 2.54211L10.179 0.740892L2.01006 10.4631L4.15379 12.2644ZM6.06863 15.1331C5.46617 15.2306 4.72548 15.3367 4.10976 15.3858C3.79742 15.4107 3.55802 15.4174 3.40125 15.4097C3.32153 15.4057 3.30135 15.3996 3.32158 15.4041C3.33338 15.4068 3.37547 15.4167 3.43563 15.4414C3.49235 15.4647 3.60237 15.5164 3.72358 15.6182L1.92236 17.762C2.2227 18.0143 2.55331 18.1016 2.71168 18.1369C2.90448 18.1799 3.09742 18.198 3.26249 18.2062C3.59531 18.2227 3.97229 18.2056 4.33239 18.1769C5.06157 18.1187 5.89012 17.9984 6.51573 17.8972L6.06863 15.1331ZM3.72358 15.6182C3.8448 15.7201 3.91462 15.8196 3.94738 15.8714C3.98213 15.9264 3.99913 15.9661 4.00376 15.9773C4.01169 15.9965 4.00222 15.9776 3.98459 15.8998C3.94991 15.7467 3.9153 15.5097 3.88601 15.1978C3.82827 14.5828 3.8051 13.8349 3.79726 13.2247L0.997492 13.2606C1.00563 13.8943 1.02989 14.7312 1.09827 15.4595C1.13204 15.8192 1.18016 16.1935 1.25379 16.5185C1.29031 16.6796 1.34139 16.8666 1.417 17.0491C1.47911 17.199 1.62202 17.5096 1.92236 17.762L3.72358 15.6182ZM12.9468 2.40053C13.4166 2.68839 13.8658 2.99018 14.1691 3.24501L15.9703 1.10128C15.5047 0.71004 14.9134 0.321719 14.4096 0.0130116L12.9468 2.40053ZM14.1691 3.24501C14.4645 3.4932 14.8207 3.86447 15.1667 4.25833L17.2703 2.41038C16.8937 1.98174 16.4279 1.48579 15.9703 1.10128L14.1691 3.24501ZM2.01006 10.4631C1.36332 11.2329 0.984092 12.2176 0.997492 13.2606L3.79726 13.2247C3.79296 12.8902 3.91431 12.5494 4.15379 12.2644L2.01006 10.4631ZM6.95312 14.6164C6.71364 14.9015 6.39888 15.0797 6.06863 15.1331L6.51573 17.8972C7.54543 17.7307 8.45012 17.1874 9.09685 16.4177L6.95312 14.6164ZM17.2744 6.68508C18.2793 5.48909 18.3811 3.67488 17.2703 2.41038L15.1667 4.25833C15.2857 4.3938 15.3245 4.65316 15.1307 4.88386L17.2744 6.68508ZM12.3227 2.54211C12.5165 2.31142 12.7846 2.30119 12.9468 2.40053L14.4096 0.0130116C12.9723 -0.867608 11.1918 -0.464537 10.179 0.740892L12.3227 2.54211Z"
                    fill="#DA6B3B"
                    mask="url(#path-1-inside-1_1715_37768)"
                  />
                  <path
                    d="M11.2517 3.37731C11.0307 3.06006 10.5945 2.98198 10.2772 3.20291C9.95996 3.42385 9.88188 3.86013 10.1028 4.17738L11.2517 3.37731ZM13.7931 7.16856C14.1623 7.28312 14.5545 7.07666 14.6691 6.70742C14.7836 6.33819 14.5771 5.94599 14.2079 5.83144L13.7931 7.16856ZM12.5049 5.73947L12.12 6.32413L12.5049 5.73947ZM10.6772 3.77734C10.1028 4.17738 10.1029 4.17745 10.1029 4.17752C10.1029 4.17755 10.103 4.17763 10.103 4.17769C10.1031 4.17782 10.1032 4.17797 10.1033 4.17814C10.1036 4.17847 10.1039 4.1789 10.1042 4.1794C10.1049 4.18042 10.1059 4.18177 10.1071 4.18345C10.1094 4.18681 10.1127 4.19149 10.1169 4.19741C10.1253 4.20926 10.1373 4.2261 10.1526 4.24739C10.1832 4.28995 10.2272 4.3504 10.2825 4.42429C10.3927 4.57172 10.5491 4.77446 10.734 4.99631C11.0899 5.42336 11.6021 5.98315 12.12 6.32413L12.8898 5.15481C12.556 4.93501 12.1543 4.51373 11.8094 4.09992C11.6438 3.90133 11.503 3.71869 11.4036 3.58584C11.3541 3.5196 11.3152 3.46619 11.2891 3.42992C11.2761 3.41179 11.2663 3.39798 11.2599 3.38903C11.2568 3.38455 11.2545 3.38129 11.2531 3.37931C11.2524 3.37832 11.2519 3.37766 11.2517 3.37732C11.2516 3.37715 11.2515 3.37707 11.2515 3.37706C11.2515 3.37706 11.2515 3.37708 11.2515 3.37712C11.2516 3.37714 11.2516 3.37719 11.2516 3.3772C11.2516 3.37725 11.2517 3.37731 10.6772 3.77734ZM12.12 6.32413C12.5813 6.62789 12.9888 6.8355 13.2855 6.96865C13.4339 7.03528 13.5551 7.08346 13.6419 7.11586C13.6853 7.13206 13.7202 7.14433 13.7456 7.153C13.7584 7.15734 13.7688 7.16077 13.7767 7.16335C13.7807 7.16464 13.784 7.16572 13.7868 7.16658C13.7881 7.16702 13.7893 7.1674 13.7904 7.16773C13.7909 7.16789 13.7914 7.16804 13.7918 7.16818C13.7921 7.16825 13.7923 7.16832 13.7925 7.16838C13.7926 7.16841 13.7927 7.16846 13.7928 7.16848C13.7929 7.16852 13.7931 7.16856 14.0005 6.5C14.2079 5.83144 14.208 5.83148 14.2082 5.83152C14.2082 5.83153 14.2083 5.83157 14.2084 5.8316C14.2086 5.83165 14.2087 5.8317 14.2089 5.83174C14.2092 5.83183 14.2094 5.83191 14.2096 5.83198C14.2101 5.83211 14.2103 5.8322 14.2105 5.83224C14.2107 5.83231 14.2103 5.8322 14.2094 5.83189C14.2075 5.83127 14.2032 5.82986 14.1967 5.82764C14.1836 5.8232 14.1615 5.81548 14.1313 5.8042C14.0708 5.78161 13.9777 5.74481 13.8587 5.69141C13.6205 5.58448 13.2802 5.41183 12.8898 5.15481L12.12 6.32413Z"
                    fill="#DA6B3B"
                  />
                </svg>
                {{ $t('redactor_event') }}
              </nuxt-link>
              <button class="delete-btn" @click="deleteEvent">
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.06092 6.08345C5.38285 6.07107 5.65386 6.322 5.66624 6.64393L5.95963 14.272C6.01643 15.7488 7.22945 16.9164 8.70696 16.9164H12.2924C13.7701 16.9164 14.9836 15.7486 15.0404 14.272L15.3338 6.64393C15.3462 6.322 15.6172 6.07107 15.9391 6.08345C16.261 6.09583 16.512 6.36684 16.4996 6.68877L16.2062 14.3169C16.1253 16.4199 14.397 18.083 12.2924 18.083H8.70696C6.60227 18.083 4.87471 16.4197 4.79383 14.3169L4.50044 6.68877C4.48806 6.36684 4.73899 6.09583 5.06092 6.08345Z"
                    fill="#D34848"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.5836 4.09582C13.5836 4.41799 13.3224 4.67915 13.0002 4.67915L11.6901 4.67915L11.5959 4.21533C11.5958 4.21488 11.5957 4.21431 11.5955 4.21359C11.5945 4.20941 11.5924 4.20076 11.589 4.18831C11.5822 4.16327 11.5704 4.1237 11.5525 4.07454C11.5159 3.97445 11.4574 3.84457 11.3705 3.71852C11.2046 3.47802 10.9499 3.26222 10.5002 3.26222C10.0505 3.26222 9.79583 3.47803 9.62997 3.71852C9.54305 3.84457 9.48454 3.97444 9.44799 4.07453C9.43003 4.12369 9.41825 4.16327 9.41142 4.18831C9.40803 4.20076 9.40592 4.2094 9.40494 4.21359C9.40477 4.2143 9.40464 4.21488 9.40453 4.21532L9.31038 4.67915L8.00023 4.67915C7.67806 4.67915 7.4169 4.41798 7.4169 4.09581C7.4169 3.77365 7.67806 3.51248 8.00023 3.51248L8.41692 3.51248C8.47692 3.37498 8.55897 3.21652 8.66955 3.05618C8.99227 2.58821 9.5709 2.09556 10.5002 2.09555C11.4296 2.09555 12.0082 2.58821 12.3309 3.05618C12.4415 3.21653 12.5235 3.37498 12.5835 3.51249L13.0002 3.51249C13.3224 3.51249 13.5836 3.77365 13.5836 4.09582Z"
                    fill="#D34848"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.1667 11.083C12.4888 11.083 12.75 11.3442 12.75 11.6663V13.333C12.75 13.6552 12.4888 13.9163 12.1667 13.9163C11.8445 13.9163 11.5833 13.6552 11.5833 13.333V11.6663C11.5833 11.3442 11.8445 11.083 12.1667 11.083Z"
                    fill="#D34848"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.83366 11.083C9.15582 11.083 9.41699 11.3442 9.41699 11.6663V13.333C9.41699 13.6552 9.15582 13.9163 8.83366 13.9163C8.51149 13.9163 8.25033 13.6552 8.25033 13.333V11.6663C8.25033 11.3442 8.51149 11.083 8.83366 11.083Z"
                    fill="#D34848"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.7477 4.80049C17.7197 5.12143 17.4367 5.35883 17.1158 5.33075L15.6792 5.20505C12.233 4.9035 8.76696 4.9035 5.32071 5.20505L3.88415 5.33075C3.56321 5.35883 3.28027 5.12143 3.25218 4.80049C3.2241 4.47955 3.46151 4.19661 3.78245 4.16853L5.21901 4.04283C8.73293 3.73535 12.267 3.73535 15.7809 4.04283L17.2175 4.16853C17.5384 4.19661 17.7758 4.47955 17.7477 4.80049Z"
                    fill="#D34848"
                  />
                </svg>
                {{ $t('delete_event') }}
              </button>
            </div>
            <div class="eventss__btns my-[16px]">
              <button
                v-if="
                  eventsSingle.instance.status === 'confirmed' &&
                  active_subscribed &&
                  $auth.user &&
                  $auth.user.user_type === 1
                "
                class="flex items-center justify-center bg-[#90A1B5] gap-[6px] text-[white] text-[13px] font-semibold p-[8px]"
                @click.prevent="beVolunteer"
              >
                <svg
                  class="mr-[4px]"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.084 7.9165L10.0007 9.99984L7.91732 12.0832"
                    stroke="white"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                  <path
                    d="M7.91699 7.9165L10.0003 9.99984L12.0837 12.0832"
                    stroke="white"
                    stroke-width="1.4"
                    stroke-linecap="round"
                  />
                  <rect
                    x="1.66699"
                    y="1.6665"
                    width="16.6667"
                    height="16.6667"
                    rx="8.33333"
                    stroke="white"
                    stroke-width="1.4"
                  />
                </svg>
                {{ $t('refuse') }}
              </button>
              <button
                v-if="
                  eventsSingle.instance.status === 'confirmed' &&
                  !active_subscribed &&
                  $auth.user &&
                  $auth.user.user_type === 1
                "
                class="flex items-center justify-center bg-blue-600 gap-[6px] text-[white] text-[13px] font-semibold p-[8px]"
                @click.prevent="beVolunteer"
              >
                <icon-base name="volunteer-person" class="mr-[4px]" />
                {{ $t('be_volunteer') }}
              </button>
              <button
                v-if="eventsSingle.instance.status === 'finished'"
                class="flex items-center justify-center bg-[#90A1B5] gap-[6px] text-[white] text-[13px] font-semibold p-[8px]"
              >
                <icon-base name="tick" class="mr-[4px]" />
                {{ $t('completed') }}
              </button>
              <button
                v-if="eventsSingle.instance.status === 'unconfirmed'"
                class="flex items-center justify-center bg-[#FEC110] gap-[6px] text-[white] text-[13px] font-semibold p-[8px]"
              >
                <icon-base name="white-clock" class="mr-[4px]" />
                {{ $t('in_progress') }}
              </button>
            </div>
            <div
              class="eventss__info grid grid-cols-2 g:grid-cols-1 gap-[16px] p-[16px] mb-[16px]"
            >
              <span v-if="eventsSingle.instance" class="flex items-center">
                <icon-base name="kalendar" class="mr-[4px]" />
                <p>
                  {{
                    $moment(eventsSingle.instance.starting_date, 'DD.MM.YYYY')
                  }}
                  -
                  {{
                    $moment(eventsSingle.instance.finishing_date, 'DD.MM.YYYY')
                  }}
                </p>
              </span>
              <span v-if="eventsSingle.instance" class="flex items-center">
                <icon-base name="chasi" class="mr-[4px]" />
                <p>
                  {{ eventsSingle.instance.starting_time }}
                  -
                  {{ eventsSingle.instance.finishing_time }}
                </p>
              </span>
              <div
                v-if="eventsSingle.instance"
                class="flex items-center e:items-start"
              >
                <icon-base name="location" class="mr-[4px]" />
                <p>
                  {{ eventsSingle.instance.country }},
                  {{ eventsSingle.instance.district?.name }}
                </p>
              </div>
              <div class="flex items-center">
                <icon-base name="benifits" class="mr-[4px]" />
                <p v-if="eventsSingle.instance">
                  {{ eventsSingle.instance.hours }}
                  {{ $t('benefits') }}
                </p>
              </div>
              <div class="flex items-center">
                <icon-base name="user" class="mr-[4px]" />
                <p v-if="eventsSingle.instance">
                  {{ eventsSingle.instance.active_volunteers }}/{{
                    numberFunction(eventsSingle.instance.volunteers_needed)
                  }}
                  {{ $t('confirmed_volunteers') }}
                </p>
              </div>

              <div class="flex items-center">
                <icon-base name="users" class="mr-[4px]" />
                <p v-if="eventsSingle.instance">
                  {{ eventsSingle.instance.all_volunteers }}
                  {{ $t('responding_volunteers') }}
                </p>
              </div>
            </div>
            <div
              class="eventss__hashtags flex flex-wrap gap-[12px] mb-[24px] p-[16px]"
            >
              <div
                v-if="eventsSingle.instance && eventsSingle.instance.direction"
                class="flex flex-wrap gap-[12px]"
              >
                <span
                  v-for="(item, index) in eventsSingle.instance.direction"
                  :key="index"
                  class="px-[8px] py-[4px]"
                >
                  {{ item.title }}
                </span>
              </div>
            </div>
            <div class="eventss__about p-[20px] mb-[32px]">
              <div class="mb-[20px]">
                <h4 class="mb-[12px] text-2xl f:text-base">
                  {{ $t('about_event') }}
                </h4>
                <div
                  v-if="eventsSingle.instance"
                  class="text-base f:text-sm g:text-xs"
                  v-html="eventsSingle.instance.description2"
                />
              </div>
              <div>
                <h4 class="mb-[12px] text-2xl f:text-base">
                  {{ $t('requirements_volunteers') }}
                </h4>
                <ul v-if="eventsSingle.instance">
                  <li
                    v-for="(item, index) in eventsSingle.instance.requirements"
                    :key="index"
                    class="flex items-center f:!text-sm g:text-xs mb-[5px]"
                  >
                    {{ item.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <aside
            class="col-span-3 b:col-span-12 b:mb-[20px] pl-[24px] b:pl-[0px]"
          >
            <SocialVolunteer
              v-if="eventsSingle.instance.is_badge === true"
              :title="$t('is_member_org')"
              :subtitle="$t('protection_agency')"
              class="mb-[24px]"
            />
            <Feedback v-if="user?.user_type === 1" @open-rate="sendFeedback" />
            <Share
              class="mt-[12px] mb-[20px]"
              @shareOpen="$modal('shareEvent')"
            />

            <Nav-side-bar class="mb-[20px]" />
            <Contacts
              v-bind="{
                phone: eventsSingle?.instance.organization.phone_number,
                mail: eventsSingle.instance.organization.email,
              }"
            />
            <div class="contacts-component p-[12px] mt-5">
              <h6 class="mb-[15px]">{{ $t('contact_person_req') }}</h6>
              <div class="flex flex-col gap-[14px]">
                <div
                  v-if="eventsSingle?.instance.organization.organization_name"
                  class="flex items-center"
                >
                  <p class="contact-organization__name">
                    {{ eventsSingle?.instance.organization.organization_name }}
                  </p>
                </div>
              </div>
            </div>
            <JoinUs class="mt-[20px]" />
          </aside>
        </div>
      </Preloader>
      <div
        v-if="eventsSingle.similar_events && eventsSingle.similar_events.length"
        class="container eventss__similar-projects mb-[82px]"
      >
        <h3 class="f:!text-lg">{{ $t('similar_projects') }}</h3>
        <div class="events__wrapper">
          <Events-card
            v-for="(item, index) in eventsSingle.similar_events"
            :key="index"
            v-bind="{
              id: item.id,
              image: item.image,
              slug: item.slug,
              title: item.title,
              startingDate: item.starting_date,
              finishingDate: item.finishing_date,
              startingTime: item.starting_time,
              finishingTime: item.finishing_time,
              city: item.country,
              district: item.district?.name,
              tag: item.tag,
              inProgress: item.status,
              liked: item.is_liked,
              subscribed: item.is_subscribed,
            }"
          />
        </div>
      </div>
    </div>
    <ShareModal
      v-bind="{
        id: 'shareEvent',
        title: $t('share'),
        shareTitle: eventsSingle.instance?.title,
        shareImg: '/icons/shareEvent.png',
      }"
    />
    <Modal
      :id="`deleteEvent`"
      v-bind="{
        title: this.$t('delete_event'),
        contentC: 'rounded-[12px] bg-white p-7',
        bodyC: '!p-[0px] rounded-[12px]',
        width: '584',
      }"
    >
      <template>
        <div class="confirm-modal">
          <button class="confirm-modal__no" @click="$modalHide('deleteEvent')">
            {{ $t('no') }}
          </button>
          <button class="confirm-modal__yes" @click="confirmDelete">
            {{ $t('yes') }}
          </button>
        </div>
      </template>
    </Modal>

    <Modal
      :id="`rateEvent`"
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
          />
          <div
            class="bg-[#F7F9FA] rounded-lg p-[8px] pr-[12px] flex-between items-end"
          >
            <div class="flex items-center gap-[10px]">
              <img
                :src="
                  eventsSingle.instance?.organization?.photo ||
                  eventsSingle.instance?.organization?.default_photo
                "
                alt="rate us logo"
                class="w-[44px] h-[44px] object-cover rounded-[6px] overflow-hidden"
              />
              <div class="flex-col gap-[2px]">
                <span class="text-base font-bold text-black line-clamp2">{{
                  eventsSingle.instance?.organization?.organization_name
                }}</span>
                <div class="flex items-center gap-[4px]">
                  <img src="/icons/phone.svg" alt="phone" />
                  <span class="text-[11px] text-black">{{
                    eventsSingle.instance?.organization?.phone_number
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
                eventsSingle.instance?.organization?.avg_rating ?? 0.0
              }}</span>
            </div>
          </div>

          <!--        stars-->
          <el-rate v-model="rateOfOrg" class="relative my-[16px]" />

          <div>
            <FormGroup :label="$t('your_feedback')" for-id="your_feedback">
              <FormTextarea
                id="your_feedback"
                v-model="form.text"
                :error="$v.form.text.$error"
                :placeholder="$t('write_feedback')"
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
import SocialVolunteer from '@/components/volontyor/SocialVolunteer.vue'
import Modal from '~/components/volontyor/Modal.vue'
import BreadCrumbs from '~/components/BreadCrumbs'
import NavSideBar from '~/components/sidebar/NavSideBar.vue'
import Contacts from '~/components/sidebar/Contacts.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
import EventsCard from '~/components/cards/EventsCard.vue'
import JoinUs from '~/components/sidebar/JoinUs.vue'
import Share from '~/components/sidebar/Share.vue'
import Feedback from '~/components/sidebar/Feedback.vue'
import ShareModal from '~/components/ShareModal.vue'
import FormTextarea from '~/components/new/Form/Textarea.vue'
import CButton from '~/components/new/Button/CButton.vue'
import FormGroup from '~/components/new/Form/CGroup.vue'

export default {
  layout: 'pages',
  components: {
    SocialVolunteer,
    FormGroup,
    CButton,
    FormTextarea,
    ShareModal,
    Feedback,
    Share,
    JoinUs,
    BreadCrumbs,
    NavSideBar,
    IconBase,
    Contacts,
    EventsCard,
    Modal,
  },
  async fetch() {
    await this.$store
      .dispatch('events/fetchEventsSingle', this.$route.params.slug)
      .then((response) => {
        this.active_subscribed = response.data.instance.is_subscribed
      })
  },
  data() {
    return {
      btns: 'beVolunteer',
      active_subscribed: null,
      confirmed: false,
      isModalOpen: false,
      rateOfOrg: 1,
      loading: false,
      form: {
        text: '',
      },
    }
  },
  computed: {
    links() {
      return [
        {
          title: this.$t('events'),
          url: '/events',
        },
      ]
    },
    ...mapState({
      eventsSingle: (state) => state.events.eventsSingle,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    sendFeedback() {
      if (this.user) {
        this.$modal('rateEvent')
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
    async fetch() {
      await this.$store
        .dispatch('events/fetchEventsSingle', this.$route.params.slug)
        .then((response) => {
          this.active_subscribed = response.data.instance.is_subscribed
        })
    },
    numberFunction(number) {
      return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    async beVolunteer() {
      this.active_subscribed = !this.active_subscribed
      if (this.active_subscribed) {
        await this.$postAction(`/subscribe/event/`, {
          data: { event: this.eventsSingle.instance.id },
        })
          .then(() => {
            this.fetch()
          })
          .catch((err) => {
            console.log('err: ', err?.response)
            console.log(err?.response?.data?.message)
            this.$toast.error(err?.response?.data?.message)
          })
      } else {
        await this.$postAction(`/unsubscribe/event/`, {
          data: { event: this.eventsSingle.instance.id },
        })
          .then(() => {
            this.fetch()
          })
          .catch((err) => {
            this.$toast.error(err?.response?.data?.message)
          })
      }
    },
    async deleteEvent() {
      if (this.confirmed) {
        await this.$deleteAction(`/event/${this.$route.params.slug}`).then(
          () => {
            this.$toast.success(this.$t('event_is_deleted'))
            this.$router.push(`/${this.$i18n.locale}/profile/projects`)
            this.$modalHide('deleteEvent')
          }
        )
      } else {
        this.$modal('deleteEvent')
      }
    },
    async confirmDelete() {
      this.confirmed = true
      await this.deleteEvent()
    },
    submitForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.loading = true
        this.$postAction(`/giving_rating_to_organization/`, {
          data: {
            organization: this.eventsSingle.instance?.organization?.id,
            rating: this.rateOfOrg,
            review: this.form.text,
          },
        })
          .then(() => {
            this.success = true
            this.$toast.success(this.$t('success_rate'))
          })
          .catch((err) => {
            this.$toast.error(err?.response?.data.error_message)
          })
          .finally(() => {
            this.loading = false
            this.$modalHide('rateEvent')
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
      title: this.eventsSingle.instance
        ? this.eventsSingle.instance.title
        : 'Volontyor.uz',
    }
  },
}
</script>

<style lang="scss" scoped>
.event-delete__no {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: calc(22 / 16 * 100%);
  padding: 10px;
  border-radius: 4px;
  @apply text-blue border border-blue;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: calc(22 / 16 * 100%);
  color: #d34848;
  padding: 10px;
  border: 1px solid #d84343;
  border-radius: 4px;
}

.update-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: calc(22 / 16 * 100%);
  padding: 10px;
  border-radius: 4px;
  @apply border border-blue text-blue;
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
.contact-organization__name {
  color: #4c677d;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
