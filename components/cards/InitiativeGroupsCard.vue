<template>
  <nuxt-link
    :to="localePath(`/possibilities/initiative-groups/${slug}`)"
    class="initiative-card p-[20px]"
  >
    <div class="top grid grid-cols-4 mb-[8px]">
      <div
        class="left-side col-span-3 c:col-span-4 c:mb-[15px] flex items-center g:flex-col g:items-start"
      >
        <div class="image-box shrink-0 mr-[12px] g:mb-[12px]">
          <img :src="imgLink" :alt="title" />
        </div>
        <div class="top__texts">
          <h5 class="title">
            <nuxt-link
              :to="localePath(`/possibilities/initiative-groups/${slug}`)"
            >
              {{ title }}
            </nuxt-link>
          </h5>
          <div class="flex address">
            <span v-if="address" class="flex items-center">
              <icon-base class="icon mr-[6px]" name="location-icon" />
              <p>{{ address }}</p>
            </span>
            <el-divider
              class="vertical-divider"
              direction="vertical"
            ></el-divider>
            <span class="flex items-center">
              <icon-base class="icon mr-[6px]" name="Calling" />
              <a :href="`tel:+998${phoneNumber}`">
                <p>
                  {{ ('+998' + phoneNumber) | VMask('+998 (##) ###-##-##') }}
                </p>
              </a>
            </span>
          </div>
        </div>
      </div>
      <div class="right-side socials">
        <a
          v-if="youtubeLink"
          target="_blank"
          :href="youtubeLink"
          class="tooltip cursor-pointer"
          rel="noopener noreferrer"
          title="Youtube"
          @click.prevent=""
        >
          <icon-base name="youtube" class="icon" />
        </a>
        <a
          v-if="telegramLink"
          target="_blank"
          :href="telegramLink"
          class="tooltip cursor-pointer"
          rel="noopener noreferrer"
          title="Telegram"
        >
          <icon-base name="tg" class="icon" />
        </a>
        <a
          v-if="facebookLink"
          target="_blank"
          :href="facebookLink"
          class="tooltip cursor-pointer"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <icon-base name="fb" class="icon" />
        </a>
        <a
          v-if="instagramLink"
          target="_blank"
          :href="instagramLink"
          class="tooltip cursor-pointer"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <icon-base name="insta" class="icon" />
        </a>
      </div>
    </div>
    <div class="bottom">
      <div class="flex items-center">
        <p class="quantity mr-[5px]">{{ $t('number_volunteers') }}:</p>
        <p class="count">{{ volunteerCount }}</p>
      </div>
      <div
        :class="{
          'grid grid-cols-1': !description,
          'grid e:grid-cols-2 grid-cols-12': description,
        }"
        class="items-center justify-end"
      >
        <p v-if="description" class="desc mr-[32px] col-span-9">
          {{ description }}
        </p>
        <div
          v-if="$auth.user && $auth.user.user_type !== 2"
          class="flex justify-end col-span-3"
          :class="{
            ' ml-auto e:w-full w-[212px]': !description,
            'col-span-3': description,
          }"
        >
          <button
            v-if="!joinGroup"
            class="join-btn flex items-center justify-center"
            @click.prevent="join()"
          >
            <icon-base name="Add" class="icon mr-[4px]" />
            {{ $t('join') }}
          </button>
          <button
            v-else
            class="leave-btn flex items-center justify-center"
            @click.prevent="join()"
          >
            <icon-base name="leave" class="icon mr-[4px]" />
            {{ $t('leave_group') }}
          </button>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    IconBase,
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
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
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
    isJoined: {
      type: Boolean,
    },
  },
  data() {
    return {
      joinGroup: this.isJoined,
      volunteer: 1,
      // userType: this.$auth.user.user_type ? this.$auth.user.user_type : 1,
    }
  },
  methods: {
    async join() {
      this.joinGroup = !this.joinGroup
      if (this.joinGroup) {
        await this.$postAction(`join_initiative_group/`, {
          data: { volunteer: this.$auth.user.id, initiative_group: this.slug },
        })
          .then(this.$toast.success(this.$t('you_in_group')))
          .catch(() => {
            this.$toast.error('error')
          })
      } else {
        await this.$postAction(`/leave_initiative_group/`, {
          data: { volunteer: this.$auth.user.id, initiative_group: this.slug },
        })
          .then(this.$toast.success(this.$t('you_left_group')))
          .catch(() => {
            this.$toast.error('error')
          })
      }
    },
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
