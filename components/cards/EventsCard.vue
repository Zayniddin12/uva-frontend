<template>
  <a :href="localePath('/possibilities/' + slug)" class="events-card">
    <div class="events-card__top">
      <img :src="image" alt="" class="events-card__top-img" />
      <span v-if="$auth.user" class="events-card__top-heart">
        <svg
          :class="active_liked ? 'heart' : ''"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click.prevent="like()"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.39098 11.5983C0.999574 7.5 3.49952 4.13839 6.28364 3.28632C8.99952 2.45515 10.9996 3.30167 11.9995 4.5C12.9996 3.30167 14.9995 2.45842 17.7048 3.28632C20.6704 4.1939 22.9995 7.5 21.6069 11.5983C19.849 16.9083 12.9996 20.9983 11.9995 20.9983C10.9994 20.9984 4.20784 16.9703 2.39098 11.5983Z"
            stroke="#90A1B5"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <div>
        <button
          v-if="
            inProgress === 'confirmed' &&
            active_subscribed &&
            $auth.user &&
            $auth.user.user_type === 1
          "
          class="main-event__left-btn past flex items-center justify-center"
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
            inProgress === 'confirmed' &&
            !active_subscribed &&
            $auth.user &&
            $auth.user.user_type === 1
          "
          class="main-event__left-btn active flex items-center justify-center"
          @click.prevent="beVolunteer"
        >
          <icon-base name="volunteer-person" class="mr-[4px]" />
          {{ $t('be_volunteer') }}
        </button>
        <button
          v-if="inProgress === 'finished'"
          class="main-event__left-btn past flex items-center justify-center"
        >
          <icon-base name="tick" class="mr-[4px]" />
          {{ $t('completed') }}
        </button>
        <button
          v-if="inProgress === 'in-progress'"
          class="main-event__left-btn process flex items-center justify-center cursor-pointer"
        >
          <icon-base name="white-clock" class="mr-[4px]" />
          {{ $t('in_progress') }}
        </button>
      </div>
    </div>
    <div class="events-card__bottom">
      <div class="flex flex-col justify-between">
        <div>
          <p class="events-card__bottom-title f:!text-lg text-red">
            {{ title }}
          </p>
          <div class="events-card__bottom-time">
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66667 7.33325H6V8.66658H4.66667V7.33325ZM14 3.99992V13.3333C14 14.0666 13.4 14.6666 12.6667 14.6666H3.33333C2.59333 14.6666 2 14.0666 2 13.3333L2.00667 3.99992C2.00667 3.26659 2.59333 2.66659 3.33333 2.66659H4V1.33325H5.33333V2.66659H10.6667V1.33325H12V2.66659H12.6667C13.4 2.66659 14 3.26659 14 3.99992ZM3.33333 5.33325H12.6667V3.99992H3.33333V5.33325ZM12.6667 13.3333V6.66658H3.33333V13.3333H12.6667ZM10 8.66658H11.3333V7.33325H10V8.66658ZM7.33333 8.66658H8.66667V7.33325H7.33333V8.66658Z"
                  fill="#90A1B5"
                />
              </svg>
              {{ $moment(startingDate, 'DD.MM.YYYY') }}
              <!-- -
              {{ $moment(finishingDate, "DD.MM.YYYY") }} -->
            </span>
            <span>
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
                  d="M8 5.33325V8.66659L10.3333 9.99992"
                  stroke="#90A1B5"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ startingTime }}
              <!-- -
              {{ finishingTime }} -->
            </span>
          </div>
          <span class="events-card__bottom-location">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 7.63325C14 11.8333 9.33333 15.3333 8 15.3333C6.66667 15.3333 2 11.8333 2 7.63325C2 3.43325 4.68629 1.33325 8 1.33325C11.3137 1.33325 14 3.43325 14 7.63325Z"
                stroke="#90A1B5"
                stroke-width="1.4"
              />
              <path
                d="M10.1663 6.83317C10.1663 8.02979 9.19629 8.99984 7.99967 8.99984C6.80306 8.99984 5.83301 8.02979 5.83301 6.83317C5.83301 5.63655 6.80306 4.6665 7.99967 4.6665C9.19629 4.6665 10.1663 5.63655 10.1663 6.83317Z"
                stroke="#90A1B5"
                stroke-width="1.4"
              />
            </svg>
            {{ city }}, {{ district }}
          </span>
        </div>
      </div>

      <div class="events-card__bottom-tags">
        <div
          v-for="(item, index) of tag"
          :key="index"
          style="display: inline-flex"
        >
          <span
            style="
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            "
            >{{ item.word ? item.word : item.title }}</span
          >
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    image: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    startingDate: {
      type: String,
      default: '',
    },
    finishingDate: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    district: {
      type: String,
      default: '',
    },
    tag: {
      type: Array,
      default: () => {},
    },
    startingTime: {
      type: String,
      default: '',
    },
    finishingTime: {
      type: String,
      default: '',
    },
    liked: {
      type: Boolean,
      default: false,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    // confirmed, finished, in_progress
    inProgress: {
      type: String,
      default: 'confirmed',
    },
  },
  data() {
    return {
      active_liked: this.liked,
      active_subscribed: this.subscribed,
      firstName: 'Ijtimoiy volontyorlik (qariyalarga, muhtojlarga yordam',
    }
  },
  methods: {
    async like() {
      this.active_liked = !this.active_liked
      // return
      if (this.active_liked) {
        await this.$postAction(`/like/event/${this.slug}/`)
          .then()
          .catch(() => {})
      } else {
        await this.$postAction(`/dislike/event/${this.slug}/`)
          .then()
          .catch(() => {})
      }
    },
    async beVolunteer() {
      this.active_subscribed = !this.active_subscribed
      if (this.active_subscribed) {
        await this.$postAction(`/subscribe/event/`, {
          data: { event: this.id },
        })
          .then
          // this.$toast.success(this.$t("subscribed"))
          ()
      } else {
        await this.$postAction(`/unsubscribe/event/`, {
          data: { event: this.id },
        })
          .then
          // this.$toast.success(this.$t("unsubscribed"))
          ()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.heart {
  fill: red;
  path {
    stroke: red;
  }
}
</style>
