<template>
  <nuxt-link
    :to="status !== 'unconfirmed' ? localePath(`/possibilities/${slug}`) : ''"
    class="main-event f:flex f:flex-col mb-[20px]"
  >
    <div class="main-event__left">
      <img :src="img" alt="" />
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
      <div
        v-if="status && status === 'unconfirmed'"
        class="main-event__left-btn process flex items-center justify-center whitespace-normal"
      >
        {{ $t('in_request') }}
      </div>
    </div>
    <div class="main-event__right">
      <div class="mb-[28px] f:mb-[15px]">
        <p
          v-if="status === 'unconfirmed'"
          class="main-event__title line-clamp2 text-xl d:text-lg f:text-base g:text-sm word-break"
        >
          {{ title }}
        </p>
        <nuxt-link
          v-else
          :to="localePath(`/possibilities/${slug}`)"
          class="main-event__title line-clamp2 text-xl d:text-lg f:text-base g:text-sm word-break"
        >
          {{ title }}
        </nuxt-link>
        <div class="main-event__time mt-[12px] mb-[8px] d:my-[5px]">
          <span>
            <icon-base name="date" />
            {{ date }}
          </span>
          <span>
            <icon-base name="clock" />
            {{ time }}
          </span>
        </div>
        <span class="main-event__location">
          <icon-base name="light-location" />
          {{ address }}
        </span>
      </div>
      <div class="">
        <button
          v-if="organizerImg"
          class="main-event__company px-[4px] py-[4px] pr-[8px] d:py-[4px] g:!text-xs f:mt-[10px]"
          @click.prevent="organisePush(slug)"
        >
          <img :src="organizerImg" alt="" />
          {{ organizer }}
        </button>

        <div class="flex justify-between items-end flexes pt-3">
          <div v-if="tags" class="tags flex items-center flex-wrap gap-[5px]">
            <a v-for="(item, i) in tags.slice(0, 7)" :key="i" @click.prevent="">
              {{ item.word ? item.word : item.title }}
            </a>
          </div>
          <div class="main-event__tags flex justify-between">
            <div class="main-event__tags-item">
              <span v-for="(item, index) in word" :key="index">
                {{ item.word }}
              </span>
            </div>
            <span v-if="likedIcon && $auth.user">
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
            <div
              v-if="stars"
              class="main-event__star flex items-center justify-end"
            >
              <p v-if="rating" class="!mb-[0px]">{{ rating }}</p>
              <icon-base v-if="rating" name="Star 1" class="ml-[5px]" />
            </div>
            <button
              v-if="estimate"
              class="main-event__estimate flex items-center justify-end px-[22px] py-[11px]"
            >
              <icon-base name="Star 1" class="mr-[5px]" />
              <p class="!mb-[0px]">
                {{ $t('estimate') }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import IconBase from '../volontyor/IconBase.vue'
export default {
  components: { IconBase },
  props: {
    organizationId: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    organizer: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    organizerImg: {
      type: String,
      default: '',
    },
    word: {
      type: Array,
      default: () => {},
    },
    // confirmed, finished, in_progress
    inProgress: {
      type: String,
      default: 'confirmed',
    },
    likedIcon: {
      type: Boolean,
      default: false,
    },
    liked: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: String,
      default: '0',
    },
    estimate: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    id: {
      type: Number,
      default: null,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isProfileProjectsRoute: false,
      active_liked: this.liked,
      active_subscribed: this.subscribed,
    }
  },
  computed: {
    getLiked() {
      return this.active_liked
    },
  },
  watch: {
    slug() {
      this.active_liked = this.liked
      this.active_subscribed = this.subscribed
    },
  },
  mounted() {
    this.active_liked = this.liked
  },
  methods: {
    async like() {
      this.active_liked = !this.getLiked
      if (this.active_liked) {
        await this.$postAction(`/like/event/${this.slug}/`).finally(() => {
          this.active_liked = true
        })
        // this.$toast.success(this.$t("liked"))
      } else {
        await this.$postAction(`/dislike/event/${this.slug}/`).finally(() => {
          this.active_liked = false
        })
        // this.$toast.success(this.$t("disliked"))
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
    organisePush(id) {
      this.$router.push(`/possibilities/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.heart {
  fill: #f35e24;
  path {
    stroke: #f35e24;
  }
}
.tags {
  a {
    padding: 4px 8px;
    background: #f2f6f9;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #2c2d33;
  }
}
@media screen and (max-width: 768px) {
  .flexer {
    flex-direction: column;
    align-items: start;
  }
  .flexes {
    margin-top: 12px;
  }
}
</style>
