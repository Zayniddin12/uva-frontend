<template>
  <BlockPreloader
    :loading="loading"
    :width="'100%'"
    :height="'128px'"
    :preloader-class="'mb-5'"
  >
    <nuxt-link :to="localePath(`/volunteer/${id}`)" class="mb-5 block">
      <div
        class="initiative-volunteer grid grid-cols-12 items-start b:items-stretch p-[20px]"
      >
        <div class="col-span-9 f:col-span-12 flex items-center f:flex-col">
          <div
            class="initiative-volunteer__img-box mr-[12px] f:mb-[15px]"
            :class="imgBorder ? 'initiative-volunteer__img-box--border' : ''"
            :style="{ borderColor: getRandomColor() }"
          >
            <img :src="userImg" alt="" />
          </div>
          <div class="w-full">
            <div class="flex items-center mb-[8px]">
              <h6 class="initiative-volunteer__name">{{ userName }}</h6>
              <p v-if="age > 0" class="initiative-volunteer__age">
                ({{ age }} {{ $t('age') }})
              </p>
            </div>
            <div
              class="flex items-center justify-start mb-[4px] c:flex-col c:items-start"
            >
              <div
                v-if="address && address.length > 2"
                class="inline-flex items-center c:mb-[10px] border-r border-solid border-gray-light pr-[8px]"
              >
                <icon-base name="location-icon" class="icon" />
                <p class="initiative-volunteer__address">
                  {{ address ?? '' }}
                </p>
              </div>
              <div
                v-if="phone"
                class="flex items-center ml-[8px] c:ml-[0px] border-r border-solid border-gray-light pr-[8px]"
              >
                <icon-base name="Calling" class="calling" />
                <a
                  class="initiative-volunteer__address initiative-volunteer__call"
                  :href="`tel:${phone}`"
                >
                  {{ phone | VMask('+998 (##) ###-##-##') }}
                </a>
              </div>
              <div v-if="mail" class="flex items-center ml-[8px] c:ml-[0px]">
                <icon-base name="email" class="icon" />
                <a
                  class="initiative-volunteer__address initiative-volunteer__call"
                  :href="`mailto: ${mail}`"
                >
                  {{ mail }}
                </a>
              </div>
            </div>
            <div class="flex gap-[12px] items-center w-max">
              <div
                v-if="!hideId"
                class="initiative-volunteer__id flex items-center"
              >
                <p v-if="id" class="mr-[6px]">ID:</p>
                <p class="initiative-volunteer__id-num">{{ id }}</p>
              </div>
              <div v-if="!noHours" class="flex gap-[4px] items-center">
                <span class="text-xs text-gray-400">{{ $t('benefits') }}:</span>

                <h5 class="hourlar">
                  {{ getHours(+hours) }}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-span-3 f:col-span-2 flex flex-col f:flex-row f:items-center f:justify-between f:mt-[4px]"
          style="height: 100%"
        >
          <div
            v-if="creator"
            class="flex items-center justify-end f:!justify-start"
          >
            <p v-if="creator" class="initiative-volunteer__role mr-[24px]">
              {{ $t('creator') }}
            </p>
            <clien-only>
              <el-dropdown
                v-if="dots && this.$route.query.events_slug"
                trigger="click"
              >
                <span class="el-dropdown-link">
                  <icon-base v-if="moreBlue" name="More_blue" class="icon" />
                  <icon-base v-else name="More" class="icon" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="p-[8px]">
                    <div @click="$modal(`rateVolunteer${id}`)">
                      {{ $t('rate') }}
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item class="p-[8px]">
                    <div @click="$modal(`deleteVolunteer${id}`)">
                      {{ $t('delete') }}
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </clien-only>
            <div
              v-if="
                youtubeLink.length ||
                telegramLink.length ||
                facebookLink.length ||
                instagramLink.length
              "
              class="socials flex items-center gap-[8px]"
            >
              <a v-if="youtubeLink.length" target="_blank" :href="youtubeLink">
                <icon-base name="youtube" class="icon" />
              </a>
              <a v-if="telegramLink" target="_blank" :href="telegramLink">
                <icon-base name="tg" class="icon" />
              </a>
              <a v-if="facebookLink" target="_blank" :href="facebookLink">
                <icon-base name="fb" class="icon" />
              </a>
              <a v-if="instagramLink" target="_blank" :href="instagramLink">
                <icon-base name="insta" class="icon" />
              </a>
            </div>
          </div>

          <div
            v-if="registered"
            class="flex items-end f:!justify-start initiative-volunteer__registered"
            :class="{ '!items-center': !creator }"
          >
            <icon-base name="registered" class="icon mr-[4px]" />
            <p>{{ $t('registered') }}</p>
          </div>
          <div
            v-else
            class="initiative-volunteer__rating flex items-end justify-end"
          >
            <div class="flex items-center justify-end">
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
                  rating
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- ------------------ modalka - delete ------------------ -->
        <Modal
          :id="`deleteVolunteer` + id"
          v-bind="{
            title: this.$t('are_you_delete'),
            contentC: 'rounded-[12px]',
            bodyC: '!p-[0px] rounded-[12px]',
            width: '584',
          }"
        >
          <button @click="$modalHide(`deleteVolunteer${id}`)">
            <icon-base
              name="Close"
              class="absolute top-[24px] right-[24px] cursor-pointer"
            />
          </button>
          <div
            class="modal__content flex items-center justify-between flex-wrap mt-15"
          >
            <button
              class="btn btn--blue-border !w-[255px]"
              @click="$modalHide(`deleteVolunteer${id}`)"
            >
              {{ $t('no') }}
            </button>
            <button
              class="btn btn--blue !w-[255px]"
              @click="
                $modalHide(`deleteVolunteer${id}`)
                deleteVolunteer()
              "
            >
              {{ $t('yes') }}
            </button>
          </div>
        </Modal>

        <!-- ------------------ modalka - rate ------------------ -->
        <Modal
          :id="`rateVolunteer` + id"
          v-bind="{
            title: this.$t('rate_volunteer'),
            contentC: 'rounded-[12px]',
            bodyC: '!p-[0px] rounded-[12px]',
            width: '584',
          }"
        >
          <button @click="$modalHide(`rateVolunteer${id}`)">
            <icon-base
              name="Close"
              class="absolute top-[24px] right-[24px] cursor-pointer"
            />
          </button>

          <div class="modal__content flex flex-col text-center">
            <img
              class="w-[80px] h-[80px] rounded-full mx-auto mt-[12px]"
              :src="userImg"
              alt=""
            />
            <h6 class="initiative-volunteer__name mt-[12px]">{{ userName }}</h6>
            <div class="rate-volunteer mt-[12px]">
              <el-rate v-model="rateOfVolunteer" class=""></el-rate>
            </div>
            <button
              class="btn btn--blue mt-[50px]"
              @click="
                $modalHide(`rateVolunteer${id}`)
                sendRate()
              "
            >
              {{ $t('rate') }}
            </button>
          </div>
        </Modal>
      </div>
    </nuxt-link>
  </BlockPreloader>
</template>

<script>
import BlockPreloader from '@/components/BlockPreloader.vue'
import Modal from '../volontyor/Modal.vue'
import IconBase from '~/components/volontyor/IconBase.vue'
export default {
  components: {
    BlockPreloader,
    IconBase,
    Modal,
  },
  props: {
    userImg: {
      type: String,
      default: 'https://picsum.photos/100/500',
    },
    userName: {
      type: String,
      default: 'User Name',
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    age: {
      type: [Number, String],
      default: 0,
    },
    address: {
      type: String,
      default: 'address',
    },
    phone: {
      type: String,
      default: '',
    },
    mail: {
      type: String,
      default: '',
    },
    id: {
      type: [Number, String],
      default: 0,
    },
    hideId: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Boolean,
      default: false,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    dots: {
      type: Boolean,
      default: true,
    },
    moreBlue: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: [Number, String],
      default: 0.0,
    },
    slug: {
      type: Number,
      default: 1,
    },
    status: {
      type: Number,
      default: 1,
    },
    imgBorder: {
      type: Boolean,
      default: false,
    },
    youtubeLink: {
      type: String,
      default: '',
    },
    telegramLink: {
      type: String,
      default: '',
    },
    facebookLink: {
      type: String,
      default: '',
    },
    instagramLink: {
      type: String,
      default: '',
    },
    hours: {
      type: Number,
      default: 0,
    },
    noHours: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rateOfVolunteer: 0,
      colors: [
        '#FF0000',
        '#04D500',
        '#EE3497',
        '#FEC110',
        '#DA6B3B',
        '#E5274E',
        '#F35E24',
        '#52230F',
      ],
    }
  },
  computed: {
    checkDateOfBirth() {
      return new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear()
    },
  },
  methods: {
    getHours(hours) {
      if (hours) {
        return (+hours * 10) % 10 === 0 ? hours : hours.toFixed(1)
      } else return '0.0'
    },
    getRandomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    async sendRate() {
      await this.$postAction('/giving_rating/', {
        data: {
          volunteer: this.id,
          rating: this.rateOfVolunteer,
        },
      })
        .then(() => this.$toast.success(this.$t('success_rate')))
        .catch((error) => {
          this.$toast.error(error.response.data.error_message)
        })
    },
    async deleteVolunteer() {
      if (this.$route.query.events_slug) {
        await this.$deleteAction(
          `/organization_events/${this.$route.query.events_slug}/volunteers/${this.id}/`
        )
          .then((res) => {})
          .catch((error) => {
            console.log(error)
            // this.$toast.error(error.response.data.error_message);
          })
      }
    },
  },
}
</script>

<style lang="scss">
.el-dropdown-menu .el-dropdown-menu__item {
  // padding: 8px 20px !important;
  color: #063f62;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
}
.el-dropdown-link {
  cursor: pointer;
  @apply text-blue;
}

.el-rate__icon {
  font-size: 50px;
  @apply text-blue;

  min-width: 50px !important;
}
.initiative-volunteer__call {
  transition: all 0.2s ease-in-out;
}
.initiative-volunteer__call:hover {
  @apply text-blue;
}
.hourlar {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  color: #2c2d33;
}
</style>
